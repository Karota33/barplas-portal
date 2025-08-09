import { useState, useEffect } from 'react'
import { useApp } from '../utils/appUtils'
import CatalogManager from './CatalogManager'
import OrdersManager from './OrdersManager'
import ClientManager from './ClientManager'
import BusinessMetrics from './BusinessMetrics'
import QuickActions from './QuickActions'
import RecentActivity from './RecentActivity'

export default function BusinessDashboard({ user, onLogout }) {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showClientManager, setShowClientManager] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      totalClients: 0,
      activeOrders: 0,
      monthlyRevenue: 0,
      completedOrders: 0,
      pendingTasks: 0,
      topClient: null
    },
    recentActivity: [],
    alerts: []
  })

  const { 
    clients, 
    isLoading,
    refreshData 
  } = useApp()

  useEffect(() => {
    if (clients.length > 0) {
      calculateDashboardMetrics()
    }
  }, [clients])

  const calculateDashboardMetrics = () => {
    // Simulación de métricas empresariales
    const mockMetrics = {
      totalClients: clients.length,
      activeOrders: Math.floor(Math.random() * 15) + 5,
      monthlyRevenue: Math.floor(Math.random() * 50000) + 25000,
      completedOrders: Math.floor(Math.random() * 100) + 50,
      pendingTasks: Math.floor(Math.random() * 8) + 2,
      topClient: clients[Math.floor(Math.random() * clients.length)]
    }

    const mockActivity = [
      {
        id: 1,
        type: 'order',
        title: 'Nuevo pedido recibido',
        client: clients[0]?.nombre || 'Cliente',
        time: '5 min',
        priority: 'high'
      },
      {
        id: 2,
        type: 'client',
        title: 'Cliente actualizado',
        client: clients[1]?.nombre || 'Cliente',
        time: '23 min',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'catalog',
        title: 'Catálogo personalizado',
        client: clients[2]?.nombre || 'Cliente',
        time: '1 h',
        priority: 'low'
      }
    ]

    const mockAlerts = [
      {
        id: 1,
        type: 'warning',
        title: 'Stock bajo',
        message: '3 productos con stock crítico',
        action: 'Ver inventario'
      },
      {
        id: 2,
        type: 'info',
        title: 'Nuevos productos',
        message: '5 productos añadidos al catálogo',
        action: 'Revisar'
      }
    ]

    setDashboardData({
      metrics: mockMetrics,
      recentActivity: mockActivity,
      alerts: mockAlerts
    })
  }

  const handleClientSelect = (client) => {
    setSelectedClient(client)
    setActiveView('catalog')
  }

  const resetView = () => {
    setSelectedClient(null)
    setActiveView('dashboard')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cargando Portal Comercial</h3>
            <p className="text-gray-600">Obteniendo datos de clientes y pedidos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Empresarial */}
      <header className="bg-white shadow-xl sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BARPLAS Portal</h1>
                <p className="text-sm text-gray-600">Sistema Comercial Empresarial</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Comercial</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <button
                onClick={refreshData}
                className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-2 shadow-sm border transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden sm:inline">Actualizar</span>
              </button>
              
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all"
              >
                <span className="hidden sm:inline">Cerrar Sesión</span>
                <span className="sm:hidden">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeView === 'dashboard'
                  ? 'bg-primary-100 text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveView('clients')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeView === 'clients'
                  ? 'bg-primary-100 text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.121M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Clientes ({clients.length})</span>
            </button>
            
            <button
              onClick={() => setActiveView('orders')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeView === 'orders'
                  ? 'bg-primary-100 text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Pedidos</span>
            </button>
            
            <button
              onClick={() => setShowClientManager(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Gestión</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              {/* Business Metrics */}
              <BusinessMetrics metrics={dashboardData.metrics} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <QuickActions 
                  clients={clients}
                  onClientSelect={handleClientSelect}
                  onNewOrder={() => setActiveView('orders')}
                />
                
                {/* Recent Activity */}
                <RecentActivity 
                  activities={dashboardData.recentActivity}
                  alerts={dashboardData.alerts}
                />
              </div>
            </div>
          )}

          {/* Clients View */}
          {activeView === 'clients' && !selectedClient && (
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.121M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Cartera de Clientes</h2>
                    <p className="text-primary-100 text-sm">{clients.length} cliente{clients.length !== 1 ? 's' : ''} activo{clients.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {clients.map((client) => (
                    <div key={client.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                              <span className="text-primary-700 font-bold text-lg">
                                {client.nombre.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{client.nombre}</h3>
                              <p className="text-sm text-gray-600">{client.email}</p>
                              <p className="text-xs text-gray-500 capitalize">{client.tipo || 'Cliente'}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Activo
                            </span>
                            {client.tipo && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                {client.tipo}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleClientSelect(client)}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Gestionar Catálogo</span>
                        </button>
                        <a
                          href={`/client/${client.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>Ver Portal</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Catalog Manager */}
          {activeView === 'catalog' && selectedClient && (
            <CatalogManager 
              client={selectedClient} 
              onBack={resetView}
            />
          )}

          {/* Orders View */}
          {activeView === 'orders' && (
            <OrdersManager user={user} />
          )}

          {/* Client Manager Modal */}
          {showClientManager && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowClientManager(false)}></div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                  <ClientManager onClose={() => setShowClientManager(false)} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}