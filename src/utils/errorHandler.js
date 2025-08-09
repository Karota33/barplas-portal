// Utilidades para manejo de errores

export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', statusCode = 500) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
  }
}

export class AuthError extends AppError {
  constructor(message = 'Error de autenticación') {
    super(message, 'AUTH_ERROR', 401)
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Error de conexión') {
    super(message, 'NETWORK_ERROR', 503)
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Datos inválidos', fields = {}) {
    super(message, 'VALIDATION_ERROR', 400)
    this.fields = fields
  }
}

// Funciones de utilidad para manejo de errores
export const errorHandler = {
  // Maneja errores de Supabase
  supabase: (error) => {
    console.error('Supabase Error:', error)
    
    if (error.message?.includes('JWT')) {
      return new AuthError('Sesión expirada. Por favor, inicia sesión nuevamente.')
    }
    
    if (error.message?.includes('network')) {
      return new NetworkError('Error de conexión. Verifica tu conexión a internet.')
    }
    
    if (error.message?.includes('duplicate')) {
      return new ValidationError('Este registro ya existe.')
    }
    
    return new AppError(error.message || 'Error en el servidor')
  },

  // Maneja errores de red
  network: (error) => {
    console.error('Network Error:', error)
    
    if (!navigator.onLine) {
      return new NetworkError('Sin conexión a internet')
    }
    
    return new NetworkError('Error de conexión al servidor')
  },

  // Maneja errores de validación
  validation: (errors) => {
    const message = Object.values(errors)[0] || 'Datos inválidos'
    return new ValidationError(message, errors)
  }
}

// Hook para mostrar notificaciones de error (deprecated - usar useToast)
export const useErrorNotification = () => {
  const showError = (error) => {
    let message = 'Ha ocurrido un error inesperado'
    
    if (error instanceof AppError) {
      message = error.message
    } else if (error instanceof Error) {
      message = error.message
    } else if (typeof error === 'string') {
      message = error
    }
    
    // Mantener alert como fallback por compatibilidad
    console.error('Error:', message)
    alert(message)
  }

  const showSuccess = (message) => {
    console.log('Success:', message)
    alert(message)
  }

  return { showError, showSuccess }
}

// Wrapper para funciones async que maneja errores automáticamente
export const withErrorHandling = (asyncFn, errorHandler) => {
  return async (...args) => {
    try {
      return await asyncFn(...args)
    } catch (error) {
      const handledError = errorHandler ? errorHandler(error) : error
      throw handledError
    }
  }
}

// Retry mechanism para operaciones que pueden fallar
export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      
      // No reintentar en errores de autenticación o validación
      if (error instanceof AuthError || error instanceof ValidationError) {
        throw error
      }
      
      // Esperar antes del siguiente intento
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
      }
    }
  }
  
  throw lastError
}