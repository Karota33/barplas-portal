// Utilidades de validación

// Validadores básicos
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'Este campo es obligatorio'
    }
    return null
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      return 'Email inválido'
    }
    return null
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Mínimo ${min} caracteres`
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Máximo ${max} caracteres`
    }
    return null
  },

  number: (value) => {
    if (value && isNaN(Number(value))) {
      return 'Debe ser un número'
    }
    return null
  },

  positiveNumber: (value) => {
    const num = Number(value)
    if (value && (isNaN(num) || num <= 0)) {
      return 'Debe ser un número positivo'
    }
    return null
  },

  price: (value) => {
    const num = Number(value)
    if (value && (isNaN(num) || num < 0)) {
      return 'Precio inválido'
    }
    return null
  },

  phone: (value) => {
    const phoneRegex = /^(\+34|0034|34)?[6-9][0-9]{8}$/
    if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Teléfono inválido'
    }
    return null
  },

  sku: (value) => {
    const skuRegex = /^[A-Z0-9-]+$/
    if (value && !skuRegex.test(value)) {
      return 'SKU inválido (solo letras mayúsculas, números y guiones)'
    }
    return null
  }
}

// Función para validar un campo con múltiples validadores
export const validateField = (value, fieldValidators) => {
  for (const validator of fieldValidators) {
    const error = validator(value)
    if (error) {
      return error
    }
  }
  return null
}

// Función para validar un objeto completo
export const validateForm = (data, schema) => {
  const errors = {}
  
  for (const [field, fieldValidators] of Object.entries(schema)) {
    const error = validateField(data[field], fieldValidators)
    if (error) {
      errors[field] = error
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Hook personalizado para manejar validación de formularios
// Nota: Importar React en el componente que use este hook
export const createFormValidation = (initialData) => {
  // Esta función debe ser llamada dentro de un componente React
  return {
    useFormValidation: () => {
      // El hook real se implementaría aquí usando React.useState
      // Por ahora devolvemos una implementación básica
      const data = initialData
      const errors = {}
      const touched = {}
      
      return {
        data,
        errors,
        touched,
        isValid: true,
        handleChange: () => {},
        handleBlur: () => {},
        validateAllFields: () => true,
        reset: () => {}
      }
    }
  }
}

// Esquemas de validación predefinidos
export const schemas = {
  comercial: {
    email: [validators.required, validators.email],
    nombre: [validators.required, validators.minLength(2), validators.maxLength(100)]
  },

  cliente: {
    nombre: [validators.required, validators.minLength(2), validators.maxLength(100)],
    email: [validators.email],
    telefono: [validators.phone],
    direccion: [validators.maxLength(255)]
  },

  producto: {
    sku: [validators.required, validators.sku],
    nombre: [validators.required, validators.minLength(2), validators.maxLength(100)],
    precio: [validators.required, validators.price],
    descripcion: [validators.maxLength(500)]
  },

  login: {
    email: [validators.required, validators.email],
    password: [validators.required, validators.minLength(6)]
  },

  pedido: {
    items: [(items) => {
      if (!items || items.length === 0) {
        return 'Debe incluir al menos un producto'
      }
      return null
    }],
    total: [validators.required, validators.positiveNumber]
  }
}

// Validadores específicos para el negocio
export const businessValidators = {
  // Validar que el catálogo tenga al menos un producto
  catalogoMinProducts: (selectedProducts) => {
    if (!selectedProducts || selectedProducts.size === 0) {
      return 'Debe seleccionar al menos un producto para el catálogo'
    }
    return null
  },

  // Validar que el pedido tenga productos válidos
  pedidoItems: (items, availableProducts) => {
    if (!items || items.length === 0) {
      return 'El pedido debe incluir al menos un producto'
    }
    
    for (const item of items) {
      if (!item.cantidad || item.cantidad <= 0) {
        return 'Todas las cantidades deben ser positivas'
      }
      
      if (!availableProducts.some(p => p.id === item.producto_id)) {
        return 'Uno o más productos no están disponibles'
      }
    }
    
    return null
  },

  // Validar formato de SKU para BARPLAS
  barplasSku: (sku) => {
    if (!sku) return 'SKU requerido'
    
    if (!sku.startsWith('BAR-')) {
      return 'El SKU debe comenzar con "BAR-"'
    }
    
    if (sku.length < 8) {
      return 'SKU demasiado corto'
    }
    
    return null
  }
}