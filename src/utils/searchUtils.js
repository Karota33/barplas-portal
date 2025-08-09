import { useState } from 'react'

// Hook personalizado para manejar búsqueda y filtros
export function useSearchAndFilter(initialData, searchFields = [], filterFunctions = {}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredData = initialData.filter(item => {
    // Aplicar búsqueda por texto
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = searchFields.some(field => {
        const value = item[field]
        return value && value.toString().toLowerCase().includes(searchLower)
      })
      if (!matchesSearch) return false
    }

    // Aplicar filtros personalizados
    for (const [key, filterValue] of Object.entries(filters)) {
      if (filterValue && filterValue !== '' && filterFunctions[key]) {
        if (!filterFunctions[key](item, filterValue)) {
          return false
        }
      }
    }

    return true
  })

  const clearAll = () => {
    setSearchTerm('')
    setFilters({})
  }

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    handleFilterChange,
    filteredData,
    clearAll,
    hasActiveFilters: searchTerm || Object.values(filters).some(v => v && v !== '')
  }
}

// Funciones de filtro comunes
export const commonFilterFunctions = {
  priceRange: (item, range) => {
    const [min, max] = range.split('-').map(Number)
    return item.precio >= min && (max ? item.precio <= max : true)
  },
  
  category: (item, category) => {
    return item.categoria === category
  },
  
  inStock: (item, inStock) => {
    return inStock ? item.stock > 0 : true
  },
  
  dateRange: (item, dateRange) => {
    const itemDate = new Date(item.created_at || item.fecha)
    const today = new Date()
    
    switch (dateRange) {
      case 'today':
        return itemDate.toDateString() === today.toDateString()
      case 'week': {
        const weekAgo = new Date(today - 7 * 24 * 60 * 60 * 1000)
        return itemDate >= weekAgo
      }
      case 'month': {
        const monthAgo = new Date(today - 30 * 24 * 60 * 60 * 1000)
        return itemDate >= monthAgo
      }
      default:
        return true
    }
  }
}