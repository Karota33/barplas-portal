import { useState, useEffect } from 'react'
import { pedidoService } from '../services/supabaseService'
import { useErrorNotification } from '../utils/errorHandler'

export default function OrdersManager({ user }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState({})
  const { showError, showSuccess } = useErrorNotification()

  useEffect(() => {
    loadOrders()
  }, [user.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadOrders = async () => {
    try {
      setLoading(true)
      const ordersData = await pedidoService.getByComercial(user.id)
      setOrders(ordersData)
    } catch (error) {
      showError(error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus({ ...updatingStatus, [orderId]: true })
      await pedidoService.updateEstado(orderId, newStatus)
      
      // Actualizar el estado local
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, estado: newStatus } : order
      ))
      
      showSuccess(`Pedido actualizado a ${newStatus}`)
    } catch (error) {
      showError(error)
    } finally {
      setUpdatingStatus({ ...updatingStatus, [orderId]: false })
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmado':
        return 'bg-blue-100 text-blue-800'
      case 'enviado':
        return 'bg-purple-100 text-purple-800'
      case 'entregado':
        return 'bg-green-100 text-green-800'
      case 'cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cargando pedidos...</h3>
          <p className="text-gray-600">Obteniendo el historial de pedidos de tus clientes</p>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Historial de Pedidos</h2>
              <p className="text-primary-100 text-sm">Gestión de pedidos de clientes</p>
            </div>
          </div>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V9a4 4 0 00-4-4H9a4 4 0 00-4 4v4.99" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay pedidos todavía</h3>
          <p className="text-gray-600">Los pedidos de tus clientes aparecerán aquí cuando empiecen a realizar compras.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Historial de Pedidos</h2>
            <p className="text-primary-100 text-sm">{orders.length} pedido{orders.length !== 1 ? 's' : ''} total{orders.length !== 1 ? 'es' : ''}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.numero_pedido}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {order.clientes?.nombre}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(order.fecha_pedido)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeClass(order.estado)}`}>
                    {order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}
                  </span>
                  <div className="text-2xl font-bold text-primary-600 mt-2">
                    €{order.total.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Detalles del pedido */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                  </svg>
                  Productos del Pedido
                </h4>
                <div className="space-y-2">
                  {order.pedido_items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{item.productos?.nombre}</div>
                        <div className="text-xs text-gray-500">€{item.precio_unitario.toFixed(2)} por unidad</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">×{item.cantidad}</div>
                        <div className="text-sm font-bold text-primary-600">€{item.subtotal.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones profesionales */}
              <div className="flex flex-wrap gap-3 mt-4">
                {order.estado === 'pendiente' && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'confirmado')}
                      disabled={updatingStatus[order.id]}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{updatingStatus[order.id] ? 'Confirmando...' : 'Confirmar Pedido'}</span>
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelado')}
                      disabled={updatingStatus[order.id]}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Cancelar</span>
                    </button>
                  </>
                )}
                
                {order.estado === 'confirmado' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'enviado')}
                    disabled={updatingStatus[order.id]}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>{updatingStatus[order.id] ? 'Actualizando...' : 'Marcar como Enviado'}</span>
                  </button>
                )}
                
                {order.estado === 'enviado' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'entregado')}
                    disabled={updatingStatus[order.id]}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>{updatingStatus[order.id] ? 'Actualizando...' : 'Marcar como Entregado'}</span>
                  </button>
                )}
                
                {(order.estado === 'entregado' || order.estado === 'cancelado') && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Estado: {order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}</span>
                  </div>
                )}
              </div>

              {order.notas && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">Notas del pedido:</p>
                      <p className="text-sm text-amber-700">{order.notas}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}