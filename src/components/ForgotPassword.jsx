import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useToast } from '../utils/toastUtils'
import { validateForm, schemas } from '../utils/validation'

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar email
    const { isValid, errors: validationErrors } = validateForm(
      { email }, 
      { email: schemas.login.email }
    )
    setErrors(validationErrors)
    
    if (!isValid) return

    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) throw error
      
      setSent(true)
      toast.success('Email de recuperación enviado')
    } catch (error) {
      console.error('Error sending password reset:', error)
      toast.error(error.message || 'Error al enviar el email de recuperación')
      setErrors({ email: 'Error al enviar el email. Verifica que sea correcto.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (value) => {
    setEmail(value)
    if (errors.email) {
      setErrors({ ...errors, email: null })
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Email Enviado
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>
            </p>
            <p className="mt-4 text-center text-sm text-gray-500">
              Revisa tu bandeja de entrada y spam. El enlace expirará en 1 hora.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={onBack}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Volver al Login
            </button>
            
            <button
              onClick={() => {
                setSent(false)
                setEmail('')
                setErrors({})
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Enviar a otro email
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={onBack}
            className="mb-4 flex items-center text-sm text-primary-600 hover:text-primary-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Login
          </button>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recuperar Contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tu email para recibir un enlace de recuperación
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange(e.target.value)}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar Email de Recuperación'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              ¿Recordaste tu contraseña?{' '}
              <button
                type="button"
                onClick={onBack}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}