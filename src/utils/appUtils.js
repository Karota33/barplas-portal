import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContextDefinition'

// Hook para usar el contexto de la aplicación
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp debe usarse dentro de AppProvider')
  }
  return context
}

// Hook para datos específicos con refresco automático
export function useAppData(type, autoRefresh = false) {
  const { loadClients, loadProducts, state } = useApp()
  
  useEffect(() => {
    if (!autoRefresh) return
    
    const refreshInterval = type === 'clients' ? 300000 : 600000 // 5min para clientes, 10min para productos
    const interval = setInterval(() => {
      if (type === 'clients') {
        loadClients(true)
      } else if (type === 'products') {
        loadProducts(true)
      }
    }, refreshInterval)
    
    return () => clearInterval(interval)
  }, [type, autoRefresh, loadClients, loadProducts])
  
  return {
    data: state[type] || [],
    loading: state.loading[type] || false,
    lastUpdated: state.cache.lastUpdated[type] || null
  }
}