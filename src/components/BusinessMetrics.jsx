import { useState, useEffect } from 'react'

export default function BusinessMetrics({ metrics }) {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalClients: 0,
    activeOrders: 0,
    monthlyRevenue: 0,
    completedOrders: 0
  })

  useEffect(() => {
    // Animación de números
    const duration = 1500
    const steps = 60
    const stepDuration = duration / steps

    const animate = (key, targetValue) => {
      let currentValue = 0
      const increment = targetValue / steps

      const timer = setInterval(() => {
        currentValue += increment
        if (currentValue >= targetValue) {
          currentValue = targetValue
          clearInterval(timer)
        }
        
        setAnimatedMetrics(prev => ({
          ...prev,
          [key]: Math.round(currentValue)
        }))
      }, stepDuration)
    }

    // Animar cada métrica con delay escalonado
    setTimeout(() => animate('totalClients', metrics.totalClients), 100)
    setTimeout(() => animate('activeOrders', metrics.activeOrders), 300)
    setTimeout(() => animate('monthlyRevenue', metrics.monthlyRevenue), 500)
    setTimeout(() => animate('completedOrders', metrics.completedOrders), 700)
    
  }, [metrics])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const MetricCard = ({ icon, title, value, subtitle, trend, color = 'primary' }) => {
    const colorClasses = {
      primary: 'from-primary-600 to-primary-700 text-primary-600 bg-primary-50 border-primary-200',
      blue: 'from-blue-600 to-blue-700 text-blue-600 bg-blue-50 border-blue-200',
      green: 'from-green-600 to-green-700 text-green-600 bg-green-50 border-green-200',
      purple: 'from-purple-600 to-purple-700 text-purple-600 bg-purple-50 border-purple-200',
      orange: 'from-orange-600 to-orange-700 text-orange-600 bg-orange-50 border-orange-200'
    }

    const colors = colorClasses[color] || colorClasses.primary

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 bg-gradient-to-r ${colors.split(' ')[0]} ${colors.split(' ')[1]} rounded-xl flex items-center justify-center shadow-lg`}>
                <div className="text-white text-2xl">
                  {icon}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
                <div className="mt-1 flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-gray-900">
                    {typeof value === 'number' && title.includes('Revenue') ? formatCurrency(value) : value}
                  </p>
                  {trend && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      trend.type === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trend.type === 'up' ? '↗' : '↘'} {trend.value}%
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress bar for visual appeal */}
        <div className={`h-1 bg-gradient-to-r ${colors.split(' ')[0]} ${colors.split(' ')[1]}`}></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Control Comercial</h2>
          <p className="text-gray-600">Métricas clave de tu actividad comercial</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Actualizado</p>
          <p className="text-sm font-semibold text-primary-600">
            {new Date().toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'short', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon="👥"
          title="Clientes Activos"
          value={animatedMetrics.totalClients}
          subtitle="En tu cartera"
          color="primary"
          trend={{ type: 'up', value: 8 }}
        />
        
        <MetricCard
          icon="📦"
          title="Pedidos Activos"
          value={animatedMetrics.activeOrders}
          subtitle="Por procesar"
          color="blue"
          trend={{ type: 'up', value: 12 }}
        />
        
        <MetricCard
          icon="💰"
          title="Facturación Mensual"
          value={animatedMetrics.monthlyRevenue}
          subtitle="Este mes"
          color="green"
          trend={{ type: 'up', value: 15 }}
        />
        
        <MetricCard
          icon="✅"
          title="Pedidos Completados"
          value={animatedMetrics.completedOrders}
          subtitle="Este mes"
          color="purple"
          trend={{ type: 'up', value: 5 }}
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Client */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-lg">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Cliente Destacado</h3>
          </div>
          
          {metrics.topClient ? (
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-700 font-bold">
                  {metrics.topClient.nombre.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{metrics.topClient.nombre}</p>
                <p className="text-sm text-gray-500">Mayor volumen de pedidos</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Cargando información...</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Estadísticas</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tasa de conversión</span>
              <span className="text-sm font-semibold text-gray-900">87%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Pedido promedio</span>
              <span className="text-sm font-semibold text-gray-900">€847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tiempo respuesta</span>
              <span className="text-sm font-semibold text-gray-900">2.3h</span>
            </div>
          </div>
        </div>

        {/* Tasks & Alerts */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-lg">⚠️</span>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tareas Pendientes</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {metrics.pendingTasks || 0}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revisar pedidos urgentes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Actualizar catálogos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Contactar clientes inactivos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}