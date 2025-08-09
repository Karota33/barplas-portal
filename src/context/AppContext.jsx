import { useReducer, useEffect } from 'react'
import { AppContext } from './AppContextDefinition'
import { useAuth } from '../hooks/useAuth'
import { clienteService, productoService } from '../services/supabaseService'
import { useToast } from '../utils/toastUtils'

// Estado inicial
const initialState = {
  user: null,
  clients: [],
  products: [],
  loading: {
    clients: false,
    products: false,
    global: true
  },
  cache: {
    clients: null,
    products: null,
    lastUpdated: {}
  },
  selectedClient: null,
  currentView: 'clients' // 'clients', 'catalog', 'orders'
}

// Actions
const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_CLIENTS: 'SET_CLIENTS',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_LOADING: 'SET_LOADING',
  SET_SELECTED_CLIENT: 'SET_SELECTED_CLIENT',
  SET_CURRENT_VIEW: 'SET_CURRENT_VIEW',
  UPDATE_CACHE: 'UPDATE_CACHE',
  CLEAR_DATA: 'CLEAR_DATA'
}

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: { ...state.loading, global: false }
      }

    case ACTIONS.SET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loading: { ...state.loading, clients: false },
        cache: {
          ...state.cache,
          clients: action.payload,
          lastUpdated: { ...state.cache.lastUpdated, clients: Date.now() }
        }
      }

    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: { ...state.loading, products: false },
        cache: {
          ...state.cache,
          products: action.payload,
          lastUpdated: { ...state.cache.lastUpdated, products: Date.now() }
        }
      }

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, ...action.payload }
      }

    case ACTIONS.SET_SELECTED_CLIENT:
      return {
        ...state,
        selectedClient: action.payload
      }

    case ACTIONS.SET_CURRENT_VIEW:
      return {
        ...state,
        currentView: action.payload,
        // Reset selected client when changing views
        selectedClient: action.payload === 'clients' ? null : state.selectedClient
      }

    case ACTIONS.UPDATE_CACHE:
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.payload
        }
      }

    case ACTIONS.CLEAR_DATA:
      return {
        ...initialState,
        loading: { ...initialState.loading, global: false }
      }

    default:
      return state
  }
}

// Context imported from separate file to avoid fast-refresh violations

// Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { user, loading: authLoading } = useAuth()
  const toast = useToast()

  // Actualizar usuario cuando cambie la autenticación
  useEffect(() => {
    if (!authLoading) {
      dispatch({ type: ACTIONS.SET_USER, payload: user })
      
      if (!user) {
        dispatch({ type: ACTIONS.CLEAR_DATA })
      }
    }
  }, [user, authLoading])

  // Cargar datos iniciales cuando el usuario esté disponible
  useEffect(() => {
    if (user && !state.cache.clients) {
      loadClients()
    }
    
    if (user && !state.cache.products) {
      loadProducts()
    }
  }, [user, state.cache.clients, state.cache.products]) // eslint-disable-line react-hooks/exhaustive-deps

  // Función para cargar clientes
  const loadClients = async (force = false) => {
    if (!user) return

    // Usar cache si está disponible y es reciente (5 minutos)
    const cacheAge = Date.now() - (state.cache.lastUpdated.clients || 0)
    if (!force && state.cache.clients && cacheAge < 300000) {
      dispatch({ type: ACTIONS.SET_CLIENTS, payload: state.cache.clients })
      return state.cache.clients
    }

    dispatch({ type: ACTIONS.SET_LOADING, payload: { clients: true } })
    
    try {
      const clientsData = await clienteService.getByComercial(user.id)
      dispatch({ type: ACTIONS.SET_CLIENTS, payload: clientsData })
      return clientsData
    } catch (error) {
      console.error('Error cargando clientes:', error)
      toast.error('Error al cargar la lista de clientes')
      
      // Si hay cache, usarlo como fallback
      if (state.cache.clients) {
        dispatch({ type: ACTIONS.SET_CLIENTS, payload: state.cache.clients })
        toast.info('Mostrando datos en caché')
        return state.cache.clients
      }
      
      // Fallback a datos mock
      const mockClients = [
        { id: 1, nombre: 'Restaurante La Esquina', email: 'laesquina@email.com' },
        { id: 2, nombre: 'Cafetería Central', email: 'central@email.com' },
        { id: 3, nombre: 'Bar Los Amigos', email: 'amigos@email.com' }
      ]
      dispatch({ type: ACTIONS.SET_CLIENTS, payload: mockClients })
      toast.warning('Usando datos de demostración')
      return mockClients
    }
  }

  // Función para cargar productos
  const loadProducts = async (force = false) => {
    // Usar cache si está disponible y es reciente (10 minutos)
    const cacheAge = Date.now() - (state.cache.lastUpdated.products || 0)
    if (!force && state.cache.products && cacheAge < 600000) {
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: state.cache.products })
      return state.cache.products
    }

    dispatch({ type: ACTIONS.SET_LOADING, payload: { products: true } })
    
    try {
      const productsData = await productoService.getAll()
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: productsData })
      return productsData
    } catch (error) {
      console.error('Error cargando productos:', error)
      
      // Si hay cache, usarlo como fallback
      if (state.cache.products) {
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: state.cache.products })
        toast.info('Mostrando productos en caché')
        return state.cache.products
      }
      
      // Fallback a productos del JSON
      try {
        const response = await fetch('/productos.json')
        const localProducts = await response.json()
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: localProducts })
        toast.warning('Usando catálogo local')
        return localProducts
      } catch {
        toast.error('Error al cargar productos')
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: [] })
        return []
      }
    }
  }

  // Función para refrescar datos
  const refreshData = async () => {
    if (!user) return
    
    toast.info('Actualizando datos...')
    await Promise.all([
      loadClients(true),
      loadProducts(true)
    ])
    toast.success('Datos actualizados')
  }

  // Funciones de navegación
  const selectClient = (client) => {
    dispatch({ type: ACTIONS.SET_SELECTED_CLIENT, payload: client })
    dispatch({ type: ACTIONS.SET_CURRENT_VIEW, payload: 'catalog' })
  }

  const setCurrentView = (view) => {
    dispatch({ type: ACTIONS.SET_CURRENT_VIEW, payload: view })
  }

  const resetView = () => {
    dispatch({ type: ACTIONS.SET_CURRENT_VIEW, payload: 'clients' })
    dispatch({ type: ACTIONS.SET_SELECTED_CLIENT, payload: null })
  }

  // Función para limpiar cache específico
  const clearCache = (type) => {
    const newCache = { ...state.cache }
    if (type === 'clients') {
      newCache.clients = null
      delete newCache.lastUpdated.clients
    } else if (type === 'products') {
      newCache.products = null
      delete newCache.lastUpdated.products
    }
    
    dispatch({ type: ACTIONS.UPDATE_CACHE, payload: newCache })
  }

  // Valor del contexto
  const value = {
    // Estado
    ...state,
    
    // Funciones de carga
    loadClients,
    loadProducts,
    refreshData,
    
    // Funciones de navegación
    selectClient,
    setCurrentView,
    resetView,
    
    // Utilidades
    clearCache,
    
    // Estados derivados
    isLoading: state.loading.clients || state.loading.products || state.loading.global,
    hasClients: state.clients.length > 0,
    hasProducts: state.products.length > 0
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Hooks moved to src/utils/appUtils.js to avoid fast-refresh violations
// Import from there: import { useApp, useAppData } from '../utils/appUtils'