import { supabase } from '../lib/supabase'
import { errorHandler, withErrorHandling, retryOperation } from '../utils/errorHandler'

// Servicios de Comerciales
export const comercialService = {
  // Obtener comercial por ID
  async getById(id) {
    const { data, error } = await supabase
      .from('comerciales')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw errorHandler.supabase(error)
    return data
  },

  // Crear comercial
  async create(comercial) {
    const { data, error } = await supabase
      .from('comerciales')
      .insert(comercial)
      .select()
      .single()
    
    if (error) throw errorHandler.supabase(error)
    return data
  }
}

// Servicios de Clientes
export const clienteService = {
  // Obtener clientes de un comercial
  async getByComercial(comercialId) {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('comercial_id', comercialId)
      .eq('activo', true)
      .order('nombre')
    
    if (error) throw errorHandler.supabase(error)
    return data || []
  },

  // Crear cliente
  async create(cliente) {
    const { data, error } = await supabase
      .from('clientes')
      .insert(cliente)
      .select()
      .single()
    
    if (error) throw errorHandler.supabase(error)
    return data
  }
}

// Servicios de Productos
export const productoService = {
  // Obtener todos los productos activos
  async getAll() {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('activo', true)
      .order('nombre')
    
    if (error) throw errorHandler.supabase(error)
    return data || []
  },

  // Crear producto
  async create(producto) {
    const { data, error } = await supabase
      .from('productos')
      .insert(producto)
      .select()
      .single()
    
    if (error) throw errorHandler.supabase(error)
    return data
  },

  // Poblar productos desde JSON (función de utilidad)
  async seedFromJson() {
    try {
      const response = await fetch('/productos.json')
      const productos = await response.json()
      
      const productosToInsert = productos.map(p => ({
        sku: p.sku,
        nombre: p.nombre,
        precio: p.precio,
        url_imagen: p.url_imagen
      }))

      const { data, error } = await supabase
        .from('productos')
        .upsert(productosToInsert, { onConflict: 'sku' })
        .select()

      if (error) throw errorHandler.supabase(error)
      return data
    } catch (error) {
      throw errorHandler.network(error)
    }
  }
}

// Servicios de Catálogos
export const catalogoService = {
  // Obtener catálogo de un cliente
  async getByCliente(clienteId) {
    const { data, error } = await supabase
      .from('catalogos_clientes')
      .select(`
        *,
        productos (
          id,
          sku,
          nombre,
          precio,
          url_imagen
        )
      `)
      .eq('cliente_id', clienteId)
      .eq('activo', true)
    
    if (error) throw errorHandler.supabase(error)
    return data?.map(item => item.productos) || []
  },

  // Actualizar catálogo de un cliente
  async updateForCliente(clienteId, productIds) {
    // Primero desactivar todos los productos del catálogo actual
    const { error: deactivateError } = await supabase
      .from('catalogos_clientes')
      .update({ activo: false })
      .eq('cliente_id', clienteId)
    
    if (deactivateError) throw errorHandler.supabase(deactivateError)

    // Luego insertar/activar los productos seleccionados
    if (productIds.length > 0) {
      const catalogItems = productIds.map(productId => ({
        cliente_id: clienteId,
        producto_id: productId,
        activo: true
      }))

      const { data, error } = await supabase
        .from('catalogos_clientes')
        .upsert(catalogItems, { onConflict: 'cliente_id,producto_id' })
        .select()

      if (error) throw errorHandler.supabase(error)
      return data
    }

    return []
  },

  // Obtener productos disponibles para un cliente
  async getAvailableForCliente() {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        catalogos_clientes!left (
          activo
        )
      `)
      .eq('activo', true)
      .order('nombre')
    
    if (error) throw errorHandler.supabase(error)
    
    return data?.map(producto => ({
      ...producto,
      enCatalogo: producto.catalogos_clientes?.some(c => c.activo) || false
    })) || []
  }
}

// Servicios de Pedidos
export const pedidoService = {
  // Crear pedido
  async create(pedidoData) {
    const { items, ...pedido } = pedidoData
    
    // Iniciar transacción
    const { data: newPedido, error: pedidoError } = await supabase
      .from('pedidos')
      .insert(pedido)
      .select()
      .single()
    
    if (pedidoError) throw errorHandler.supabase(pedidoError)

    // Insertar items del pedido
    const pedidoItems = items.map(item => ({
      pedido_id: newPedido.id,
      producto_id: item.producto_id,
      cantidad: item.cantidad,
      precio_unitario: item.precio_unitario,
      subtotal: item.cantidad * item.precio_unitario
    }))

    const { data: items_data, error: itemsError } = await supabase
      .from('pedido_items')
      .insert(pedidoItems)
      .select()

    if (itemsError) {
      // Rollback: eliminar el pedido si falló la inserción de items
      await supabase.from('pedidos').delete().eq('id', newPedido.id)
      throw errorHandler.supabase(itemsError)
    }

    return { ...newPedido, items: items_data }
  },

  // Obtener pedidos de un comercial
  async getByComercial(comercialId) {
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        clientes (
          nombre,
          email
        ),
        pedido_items (
          *,
          productos (
            nombre,
            sku
          )
        )
      `)
      .eq('clientes.comercial_id', comercialId)
      .order('fecha_pedido', { ascending: false })
    
    if (error) throw errorHandler.supabase(error)
    return data || []
  },

  // Obtener pedidos de un cliente
  async getByCliente(clientId) {
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        pedido_items (
          *,
          productos (
            nombre,
            sku
          )
        )
      `)
      .eq('cliente_id', clientId)
      .order('fecha_pedido', { ascending: false })
    
    if (error) throw errorHandler.supabase(error)
    return data || []
  },

  // Actualizar estado de pedido
  async updateEstado(pedidoId, estado) {
    const { data, error } = await supabase
      .from('pedidos')
      .update({ estado })
      .eq('id', pedidoId)
      .select()
      .single()
    
    if (error) throw errorHandler.supabase(error)
    return data
  }
}

// Aplicar manejo de errores con retry a las operaciones críticas
export const safeServices = {
  productos: {
    getAll: withErrorHandling(
      () => retryOperation(() => productoService.getAll()),
      errorHandler.supabase
    ),
    seedFromJson: withErrorHandling(productoService.seedFromJson, errorHandler.network)
  },
  
  catalogo: {
    getByCliente: withErrorHandling(catalogoService.getByCliente, errorHandler.supabase),
    updateForCliente: withErrorHandling(catalogoService.updateForCliente, errorHandler.supabase)
  },
  
  pedidos: {
    create: withErrorHandling(pedidoService.create, errorHandler.supabase)
  }
}