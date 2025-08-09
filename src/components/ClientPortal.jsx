import { useState, useEffect } from 'react'
import LazyImage from './LazyImage'
import { useToast } from '../utils/toastUtils'
import { catalogoService, pedidoService } from '../services/supabaseService'
import { ClientPortalSkeleton } from './SkeletonLoader'
import SearchFilter from './SearchFilter'
import { useSearchAndFilter } from '../utils/searchUtils'

export default function ClientPortal({ clientId }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const toast = useToast()

  // Hook de búsqueda y filtros
  const {
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    filteredData: filteredProducts,
    hasActiveFilters
  } = useSearchAndFilter(
    products,
    ['nombre', 'sku'], // Campos de búsqueda
    {
      priceRange: (item, range) => {
        if (range === 'low') return item.precio < 5
        if (range === 'medium') return item.precio >= 5 && item.precio < 15
        if (range === 'high') return item.precio >= 15
        return true
      }
    }
  )

  useEffect(() => {
    loadClientCatalog()
  }, [clientId]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadClientCatalog = async () => {
    try {
      setLoading(true)
      
      // Intentar cargar catálogo personalizado desde Supabase
      try {
        const catalogProducts = await catalogoService.getByCliente(clientId)
        if (catalogProducts.length > 0) {
          setProducts(catalogProducts)
          toast.success(`Catálogo cargado: ${catalogProducts.length} productos disponibles`)
          return
        }
      } catch (supabaseError) {
        console.warn('No se pudo cargar desde Supabase, usando fallback:', supabaseError)
      }
      
      // Fallback: cargar productos desde JSON local
      const response = await fetch('/productos.json')
      const allProducts = await response.json()
      setProducts(allProducts)
      
      toast.info('Mostrando catálogo de demostración')
      
    } catch (error) {
      console.error('Error cargando catálogo:', error)
      toast.error('Error al cargar el catálogo de productos')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = (sku, quantity) => {
    if (quantity === 0) {
      const newCart = { ...cart }
      delete newCart[sku]
      setCart(newCart)
    } else {
      setCart({ ...cart, [sku]: quantity })
    }
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [sku, qty]) => {
      const product = products.find(p => p.sku === sku)
      return total + (product ? product.precio * qty : 0)
    }, 0)
  }

  const submitOrder = async () => {
    setSubmitting(true)
    try {
      const orderData = {
        cliente_id: clientId,
        total: getTotalPrice(),
        items: Object.entries(cart).map(([sku, quantity]) => {
          const product = products.find(p => p.sku === sku || p.id === sku)
          return {
            producto_id: product.id || product.sku,
            cantidad: quantity,
            precio_unitario: product.precio
          }
        })
      }
      
      // Intentar enviar a Supabase primero
      try {
        await pedidoService.create(orderData)
        toast.success('¡Pedido enviado exitosamente!')
      } catch (supabaseError) {
        console.warn('No se pudo enviar a Supabase:', supabaseError)
        // Simular envío exitoso como demostración
        await new Promise(resolve => setTimeout(resolve, 1500))
        toast.success('¡Pedido enviado! (Modo demostración)')
      }
      
      setCart({})
      setOrderSuccess(true)
      
    } catch (error) {
      console.error('Error enviando pedido:', error)
      toast.error('Error al enviar el pedido. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <ClientPortalSkeleton />
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Enviado!</h2>
          <p className="text-gray-600 mb-6">
            Tu pedido ha sido enviado correctamente. Te contactaremos pronto para confirmar los detalles.
          </p>
          <button
            onClick={() => setOrderSuccess(false)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Realizar Nuevo Pedido
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-semibold border shadow-sm transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Dashboard</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Portal de Pedidos</h1>
                  <p className="text-sm text-gray-500">BARPLAS - Productos Plásticos</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {getTotalItems() > 0 ? (
                <div className="flex items-center space-x-3 bg-primary-50 border border-primary-200 rounded-xl px-4 py-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{getTotalItems()}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary-800">
                      {getTotalItems()} producto{getTotalItems() !== 1 ? 's' : ''}
                    </div>
                    <div className="text-lg font-bold text-primary-600">
                      €{getTotalPrice().toFixed(2)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-right">
                  <div className="text-sm text-gray-500">Carrito vacío</div>
                  <div className="text-xs text-gray-400">Agrega productos para empezar</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Barra de búsqueda y filtros */}
          {products.length > 0 && (
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFilterChange={handleFilterChange}
              filterOptions={{
                priceRange: {
                  label: 'Rango de Precio',
                  type: 'select',
                  options: [
                    { value: 'low', label: 'Menos de €5' },
                    { value: 'medium', label: '€5 - €15' },
                    { value: 'high', label: 'Más de €15' }
                  ]
                }
              }}
              placeholder="Buscar productos por nombre o SKU..."
            />
          )}

          {/* Resultados de búsqueda */}
          {hasActiveFilters && (
            <div className="mb-4 flex items-center text-sm text-gray-600">
              <span>
                Mostrando {filteredProducts.length} de {products.length} productos
                {searchTerm && ` para "${searchTerm}"`}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-8">
            {filteredProducts.length === 0 && products.length > 0 ? (
              <div className="col-span-full text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron productos</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Intenta con otros términos de búsqueda o ajusta los filtros.
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
              <div key={product.sku || product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative">
                  <LazyImage
                    src={product.url_imagen}
                    alt={product.nombre}
                    className="w-full h-36 sm:h-40 object-cover"
                  />
                  {cart[product.sku] > 0 && (
                    <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cart[product.sku]}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
                      {product.nombre}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">SKU: {product.sku}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xl font-bold text-primary-600">
                      €{product.precio.toFixed(2)}
                    </p>
                    <div className="text-xs text-gray-400">
                      /unidad
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(product.sku, Math.max(0, (cart[product.sku] || 0) - 1))}
                        className="w-8 h-8 rounded-md bg-white hover:bg-gray-100 flex items-center justify-center text-gray-600 font-bold shadow-sm transition-colors"
                        disabled={!cart[product.sku]}
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-800">
                        {cart[product.sku] || 0}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.sku, (cart[product.sku] || 0) + 1)}
                        className="w-8 h-8 rounded-md bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center font-bold shadow-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(product.sku, (cart[product.sku] || 0) + 1)}
                      className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-md transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>

          {getTotalItems() > 0 && (
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Resumen del Pedido</h3>
                      <p className="text-primary-100 text-sm">{getTotalItems()} producto{getTotalItems() !== 1 ? 's' : ''} seleccionado{getTotalItems() !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCart({})}
                    className="text-primary-100 hover:text-white text-sm font-medium bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded-lg transition-all"
                  >
                    Limpiar carrito
                  </button>
                </div>
              </div>
              
              <div className="p-6">
              
                <div className="space-y-3 mb-6">
                  {Object.entries(cart).map(([sku, quantity]) => {
                    const product = products.find(p => p.sku === sku)
                    if (!product) return null
                    return (
                      <div key={sku} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{product.nombre}</div>
                          <div className="text-xs text-gray-500">SKU: {product.sku} • €{product.precio.toFixed(2)}/unidad</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">x{quantity}</div>
                          <div className="text-sm font-bold text-primary-600">€{(product.precio * quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">Total del Pedido</div>
                      <div className="text-sm text-gray-600">{getTotalItems()} producto{getTotalItems() !== 1 ? 's' : ''} • IVA incluido</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        €{getTotalPrice().toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={submitOrder}
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Enviando Pedido...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Enviar Pedido</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}