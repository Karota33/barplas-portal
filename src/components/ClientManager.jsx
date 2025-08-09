import { useState } from 'react'
import { useToast } from '../utils/toastUtils'
import { clienteService } from '../services/supabaseService'
import { validateForm, schemas } from '../utils/validation'
import { useApp } from '../utils/appUtils'

export default function ClientManager({ onClose }) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  const toast = useToast()
  const { clients, user, refreshData } = useApp()

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      direccion: ''
    })
    setErrors({})
    setIsCreating(false)
    setEditingClient(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar formulario
    const { isValid, errors: validationErrors } = validateForm(formData, schemas.cliente)
    setErrors(validationErrors)
    
    if (!isValid) {
      toast.error('Por favor corrige los errores en el formulario')
      return
    }

    setLoading(true)
    try {
      const clientData = {
        ...formData,
        comercial_id: user.id
      }

      if (editingClient) {
        // Actualizar cliente existente (funcionalidad futura)
        toast.info('Funcionalidad de edición en desarrollo')
      } else {
        // Crear nuevo cliente
        await clienteService.create(clientData)
        toast.success(`Cliente ${formData.nombre} creado exitosamente`)
        resetForm()
        refreshData() // Recargar lista de clientes
      }
    } catch (error) {
      console.error('Error al guardar cliente:', error)
      toast.error('Error al guardar el cliente')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (client) => {
    setEditingClient(client)
    setFormData({
      nombre: client.nombre || '',
      email: client.email || '',
      telefono: client.telefono || '',
      direccion: client.direccion || ''
    })
    setIsCreating(true)
    setErrors({})
  }

  const handleDelete = async (client) => {
    if (!confirm(`¿Estás seguro de eliminar al cliente ${client.nombre}?`)) {
      return
    }

    try {
      // Funcionalidad de eliminación futura
      toast.info('Funcionalidad de eliminación en desarrollo')
    } catch {
      toast.error('Error al eliminar el cliente')
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  if (isCreating) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre del negocio *
              </label>
              <input
                type="text"
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.nombre ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Ej: Restaurante La Esquina"
              />
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="cliente@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleChange('telefono', e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.telefono ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="928123456"
              />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
              )}
            </div>

            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <textarea
                id="direccion"
                rows={3}
                value={formData.direccion}
                onChange={(e) => handleChange('direccion', e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.direccion ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Calle Mayor 123, Las Palmas"
              />
              {errors.direccion && (
                <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-md text-sm font-medium"
              >
                {loading ? 'Guardando...' : editingClient ? 'Actualizar' : 'Crear Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Gestión de Clientes</h3>
            <p className="text-sm text-gray-500">
              Administra tus clientes y sus datos de contacto
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsCreating(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuevo Cliente
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.121M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay clientes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza creando tu primer cliente.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsCreating(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Crear Cliente
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{client.nombre}</h4>
                    <p className="text-xs text-gray-500 mt-1">{client.email}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(client)}
                      className="text-gray-400 hover:text-primary-600 p-1"
                      title="Editar cliente"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(client)}
                      className="text-gray-400 hover:text-red-600 p-1"
                      title="Eliminar cliente"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {client.telefono && (
                  <p className="text-xs text-gray-600 mb-1">📞 {client.telefono}</p>
                )}
                
                {client.direccion && (
                  <p className="text-xs text-gray-600 mb-3">📍 {client.direccion}</p>
                )}
                
                <div className="flex space-x-2">
                  <a
                    href={`/client/${client.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium text-center"
                  >
                    Ver Portal
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}