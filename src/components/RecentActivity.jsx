import { useState } from 'react'

export default function RecentActivity({ activities, alerts }) {
  const [activeTab, setActiveTab] = useState('activity')

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return { emoji: '📦', color: 'text-blue-600 bg-blue-50' }
      case 'client':
        return { emoji: '👤', color: 'text-green-600 bg-green-50' }
      case 'catalog':
        return { emoji: '📋', color: 'text-purple-600 bg-purple-50' }
      case 'payment':
        return { emoji: '💰', color: 'text-yellow-600 bg-yellow-50' }
      default:
        return { emoji: '📄', color: 'text-gray-600 bg-gray-50' }
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return { emoji: '⚠️', color: 'text-orange-600 bg-orange-50 border-orange-200' }
      case 'error':
        return { emoji: '❌', color: 'text-red-600 bg-red-50 border-red-200' }
      case 'info':
        return { emoji: 'ℹ️', color: 'text-blue-600 bg-blue-50 border-blue-200' }
      case 'success':
        return { emoji: '✅', color: 'text-green-600 bg-green-50 border-green-200' }
      default:
        return { emoji: '📢', color: 'text-gray-600 bg-gray-50 border-gray-200' }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 text-lg">🔔</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Centro de Actividad</h3>
                <p className="text-gray-600 text-sm">Últimas actualizaciones y notificaciones</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'activity'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>📊</span>
                <span>Actividad Reciente</span>
                <span className="bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded-full">
                  {activities.length}
                </span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'alerts'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🚨</span>
                <span>Alertas</span>
                {alerts.length > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                    {alerts.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-2xl">📊</span>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No hay actividad reciente</h4>
                <p className="text-gray-600">Las actualizaciones aparecerán aquí cuando ocurran.</p>
              </div>
            ) : (
              activities.map((activity) => {
                const icon = getActivityIcon(activity.type)
                return (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${icon.color}`}>
                      <span className="text-lg">{icon.emoji}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                            {activity.priority}
                          </span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        Cliente: <span className="font-medium">{activity.client}</span>
                      </p>
                      
                      <div className="mt-2 flex space-x-2">
                        <button className="text-xs text-primary-600 hover:text-primary-800 font-medium">
                          Ver detalles
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Marcar como leído
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}

            {activities.length > 0 && (
              <div className="text-center pt-4">
                <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                  Ver todas las actividades →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-green-600 text-2xl">✅</span>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Todo en orden</h4>
                <p className="text-gray-600">No hay alertas pendientes en este momento.</p>
              </div>
            ) : (
              alerts.map((alert) => {
                const icon = getAlertIcon(alert.type)
                return (
                  <div key={alert.id} className={`border-l-4 p-4 rounded-lg ${icon.color} border`}>
                    <div className="flex items-start space-x-3">
                      <span className="text-xl">{icon.emoji}</span>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold">{alert.title}</h4>
                          <button className="text-xs text-gray-500 hover:text-gray-700">
                            ✕
                          </button>
                        </div>
                        
                        <p className="text-sm mt-1 opacity-90">
                          {alert.message}
                        </p>
                        
                        {alert.action && (
                          <button className="mt-2 text-xs font-medium underline hover:no-underline">
                            {alert.action} →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}

            {alerts.length > 0 && (
              <div className="flex justify-between items-center pt-4 border-t">
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  Marcar todas como leídas
                </button>
                <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                  Configurar alertas
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {activities.filter(a => a.type === 'order').length}
              </div>
              <div className="text-xs text-gray-600">Pedidos hoy</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {activities.filter(a => a.priority === 'high').length}
              </div>
              <div className="text-xs text-gray-600">Alta prioridad</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {alerts.filter(a => a.type === 'warning').length}
              </div>
              <div className="text-xs text-gray-600">Advertencias</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}