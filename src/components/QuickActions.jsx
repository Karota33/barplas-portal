import { useState } from 'react'

export default function QuickActions({ clients, onClientSelect, onNewOrder }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredClients = clients.filter(client =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5) // Show only top 5

  const quickActions = [
    {
      id: 'new-order',
      title: 'Nuevo Pedido',
      subtitle: 'Crear pedido rápido',
      icon: '📦',
      color: 'bg-gradient-to-r from-primary-600 to-primary-700',
      action: onNewOrder
    },
    {
      id: 'client-search',
      title: 'Buscar Cliente',
      subtitle: 'Acceso rápido a clientes',
      icon: '🔍',
      color: 'bg-gradient-to-r from-blue-600 to-blue-700',
      action: () => document.getElementById('client-search').focus()
    },
    {
      id: 'export-report',
      title: 'Exportar Reporte',
      subtitle: 'Generar informe de ventas',
      icon: '📊',
      color: 'bg-gradient-to-r from-green-600 to-green-700',
      action: () => generateReport()
    },
    {
      id: 'calculator',
      title: 'Calculadora',
      subtitle: 'Calcular presupuestos',
      icon: '🧮',
      color: 'bg-gradient-to-r from-purple-600 to-purple-700',
      action: () => openCalculator()
    }
  ]

  const generateReport = () => {
    // Simular generación de reporte
    const reportData = {
      period: 'Enero 2025',
      totalSales: '€45,230',
      orders: 87,
      clients: clients.length,
      avgOrderValue: '€520'
    }

    const report = `
REPORTE COMERCIAL BARPLAS
========================
Período: ${reportData.period}
Ventas totales: ${reportData.totalSales}
Pedidos procesados: ${reportData.orders}
Clientes activos: ${reportData.clients}
Valor promedio pedido: ${reportData.avgOrderValue}

Generado: ${new Date().toLocaleString('es-ES')}
Comercial: Usuario BARPLAS
    `.trim()

    // Crear y descargar archivo
    const blob = new Blob([report], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reporte-barplas-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const openCalculator = () => {
    const result = prompt(`
CALCULADORA DE PRESUPUESTOS BARPLAS

Ingresa los datos separados por comas:
- Cantidad de producto
- Precio unitario
- Descuento % (opcional)

Ejemplo: 100, 15.50, 10
    `)

    if (result) {
      try {
        const [quantity, price, discount = 0] = result.split(',').map(x => parseFloat(x.trim()))
        const subtotal = quantity * price
        const discountAmount = subtotal * (discount / 100)
        const total = subtotal - discountAmount
        const iva = total * 0.21
        const totalWithIva = total + iva

        alert(`
PRESUPUESTO CALCULADO
====================
Cantidad: ${quantity} unidades
Precio unitario: €${price.toFixed(2)}
Subtotal: €${subtotal.toFixed(2)}
Descuento (${discount}%): -€${discountAmount.toFixed(2)}
Base imponible: €${total.toFixed(2)}
IVA (21%): €${iva.toFixed(2)}
TOTAL: €${totalWithIva.toFixed(2)}
        `)
      } catch (error) {
        alert('Error en el formato. Usa: cantidad, precio, descuento%')
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">⚡</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Acciones Rápidas</h3>
            <p className="text-gray-300 text-sm">Herramientas comerciales frecuentes</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`${action.color} hover:scale-105 text-white p-4 rounded-xl shadow-lg transition-all duration-200 text-left group`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                <div>
                  <h4 className="font-semibold text-sm">{action.title}</h4>
                  <p className="text-xs opacity-90">{action.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Client Quick Access */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg">👥</span>
            <h4 className="font-semibold text-gray-900">Acceso Rápido a Clientes</h4>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              id="client-search"
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Client List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredClients.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                {searchTerm ? 'No se encontraron clientes' : 'No hay clientes disponibles'}
              </p>
            ) : (
              filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onClientSelect(client)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm">
                        {client.nombre.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{client.nombre}</p>
                      <p className="text-xs text-gray-500 capitalize">{client.tipo || 'Cliente'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`/client/${client.id}`, '_blank')
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Abrir portal"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>

          {searchTerm && filteredClients.length > 5 && (
            <p className="text-center text-sm text-gray-500 mt-3">
              Mostrando los primeros 5 resultados. Refina tu búsqueda.
            </p>
          )}
        </div>

        {/* Additional Tools */}
        <div className="border-t pt-6 mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg">🛠️</span>
            <h4 className="font-semibold text-gray-900">Herramientas Adicionales</h4>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => window.open('https://barplascanarias.com', '_blank')}
              className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center"
            >
              <span className="text-lg mb-1">🌐</span>
              <span className="text-xs font-medium text-gray-700">Web BARPLAS</span>
            </button>
            
            <button
              onClick={() => {
                const email = 'info@barplascanarias.com'
                const subject = 'Consulta desde Portal Comercial'
                const body = 'Hola,\n\nTe escribo desde el portal comercial...\n\nSaludos.'
                window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
              }}
              className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center"
            >
              <span className="text-lg mb-1">📧</span>
              <span className="text-xs font-medium text-gray-700">Email</span>
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'BARPLAS Portal',
                    text: 'Portal comercial de BARPLAS Canarias',
                    url: window.location.href
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert('URL copiada al portapapeles')
                }
              }}
              className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center"
            >
              <span className="text-lg mb-1">📱</span>
              <span className="text-xs font-medium text-gray-700">Compartir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}