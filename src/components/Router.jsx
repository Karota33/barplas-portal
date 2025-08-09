import { useState, useEffect } from 'react'
import Layout from './Layout'
import LoginForm from './LoginForm'
import BusinessDashboard from './BusinessDashboard'
import ClientPortal from './ClientPortal'
import { useAuth } from '../hooks/useAuth'

// Componente Landing integrado
function Landing() {
  useEffect(() => {
    // Redireccionar a la página estática
    window.location.href = '/landing.html'
  }, [])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  )
}

function Router() {
  const { user, loading, login, logout } = useAuth()
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Función para navegar
  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cargando Portal BARPLAS</h3>
          <p className="text-gray-600">Inicializando sistema...</p>
        </div>
      </div>
    )
  }

  // Rutas públicas (sin autenticación)
  if (currentPath === '/landing' || currentPath === '/') {
    if (currentPath === '/landing') {
      return <Landing />
    }
    
    // Si no hay usuario, mostrar login
    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">BARPLAS Portal</h1>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate('/landing')}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    ← Volver al Sitio Web
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="flex items-center justify-center py-12">
            <LoginForm onLogin={login} />
          </div>
        </div>
      )
    }

    // Si hay usuario, mostrar dashboard
    return <BusinessDashboard user={user} onLogout={logout} />
  }

  // Rutas de portales de clientes (públicas)
  const clientMatch = currentPath.match(/^\/client\/(.+)$/)
  if (clientMatch) {
    const clientId = clientMatch[1]
    return (
      <Layout>
        <ClientPortal clientId={clientId} />
      </Layout>
    )
  }

  // Rutas protegidas (requieren autenticación)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">BARPLAS Portal</h1>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate('/landing')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  ← Volver al Sitio Web
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center py-12">
          <LoginForm onLogin={login} />
        </div>
      </div>
    )
  }

  // Dashboard para usuarios autenticados
  return <BusinessDashboard user={user} onLogout={logout} />
}

export default Router