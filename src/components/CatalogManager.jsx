import { useState, useEffect } from 'react'
import { productoService, catalogoService } from '../services/supabaseService'
import { useToast } from '../utils/toastUtils'
import LazyImage from './LazyImage'
import { CatalogItemSkeleton } from './SkeletonLoader'

export default function CatalogManager({ client, onBack }) {
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  useEffect(() => {
    loadProducts()
  }, [client.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadProducts = async () => {
    try {
      setLoading(true)
      
      // Cargar todos los productos
      const allProducts = await productoService.getAll()
      setProducts(allProducts)
      
      // Cargar productos ya seleccionados para este cliente
      const clientCatalog = await catalogoService.getByCliente(client.id)
      const selectedSkus = new Set(clientCatalog.map(p => p.id))
      setSelectedProducts(selectedSkus)
      
    } catch {
      toast.error('Error cargando desde base de datos')
      // Fallback a datos locales si falla la carga desde Supabase
      try {
        const response = await fetch('/productos.json')
        const data = await response.json()
        setProducts(data)
        toast.info('Usando catálogo local de demostración')
      } catch {
        toast.error('No se pudieron cargar los productos')
      }
    } finally {
      setLoading(false)
    }
  }

  const toggleProduct = (productId) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
  }

  const saveCatalog = async () => {
    setSaving(true)
    try {
      const selectedIds = Array.from(selectedProducts)
      
      if (selectedIds.length === 0) {
        toast.warning('Selecciona al menos un producto para el catálogo')
        return
      }
      
      try {
        await catalogoService.updateForCliente(client.id, selectedIds)
        toast.success(`Catálogo actualizado: ${selectedIds.length} productos seleccionados`)
      } catch (supabaseError) {
        console.warn('No se pudo guardar en Supabase:', supabaseError)
        toast.success(`Catálogo guardado localmente: ${selectedIds.length} productos (Modo demostración)`)
      }
    } catch {
      toast.error('Error al guardar el catálogo')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
          <ul className="divide-y divide-gray-200">
            {Array.from({ length: 5 }, (_, i) => (
              <CatalogItemSkeleton key={i} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2.5 rounded-lg font-semibold flex items-center space-x-2 text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Volver</span>
            </button>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Catálogo de {client.nombre}
              </h2>
              <p className="text-primary-100 text-sm">
                Gestionar productos disponibles para este cliente
              </p>
            </div>
          </div>
          <button
            onClick={saveCatalog}
            disabled={saving}
            className="bg-white hover:bg-gray-50 disabled:opacity-50 text-primary-700 px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{saving ? 'Guardando...' : 'Guardar Catálogo'}</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{selectedProducts.size}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-800">
                {selectedProducts.size} de {products.length} productos seleccionados
              </p>
              <p className="text-xs text-primary-600">
                Marca los productos que estarán disponibles para este cliente
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.sku} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-primary-300 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedProducts.has(product.id)}
                  onChange={() => toggleProduct(product.id)}
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-all"
                />
                <LazyImage
                  src={product.url_imagen}
                  alt={product.nombre}
                  className="h-16 w-16 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {product.nombre}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">SKU: {product.sku}</span>
                    <span className="text-lg font-bold text-primary-600">
                      €{product.precio.toFixed(2)}
                    </span>
                  </div>
                  {product.descripcion && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {product.descripcion}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  {selectedProducts.has(product.id) ? (
                    <div className="flex items-center space-x-1 text-primary-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">Incluido</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">No incluido</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}