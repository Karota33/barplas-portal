import { useState } from 'react'

export default function SearchFilter({ 
  searchTerm, 
  onSearchChange, 
  filters = {}, 
  onFilterChange,
  filterOptions = {},
  placeholder = "Buscar...",
  showFilters = true 
}) {
  const [showFilterPanel, setShowFilterPanel] = useState(false)

  const clearFilters = () => {
    Object.keys(filters).forEach(key => {
      onFilterChange(key, '')
    })
    onSearchChange('')
    setShowFilterPanel(false)
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some(value => value && value !== '')

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Barra de búsqueda */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder={placeholder}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-2">
          {showFilters && Object.keys(filterOptions).length > 0 && (
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`px-3 py-2 border rounded-md text-sm font-medium flex items-center space-x-2 ${
                showFilterPanel || Object.values(filters).some(v => v)
                  ? 'bg-primary-50 border-primary-300 text-primary-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>Filtros</span>
              {Object.values(filters).some(v => v) && (
                <span className="bg-primary-100 text-primary-700 text-xs rounded-full px-2 py-0.5 ml-1">
                  {Object.values(filters).filter(v => v).length}
                </span>
              )}
            </button>
          )}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-1"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Panel de filtros expandible */}
      {showFilterPanel && showFilters && Object.keys(filterOptions).length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {options.label || key}
                </label>
                {options.type === 'select' ? (
                  <select
                    value={filters[key] || ''}
                    onChange={(e) => onFilterChange(key, e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Todos</option>
                    {options.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : options.type === 'range' ? (
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={options.min || 0}
                      max={options.max || 100}
                      value={filters[key] || options.min || 0}
                      onChange={(e) => onFilterChange(key, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{options.min || 0}</span>
                      <span className="font-medium">{filters[key] || options.min || 0}</span>
                      <span>{options.max || 100}</span>
                    </div>
                  </div>
                ) : options.type === 'checkbox' ? (
                  <div className="space-y-2">
                    {options.options.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters[key]?.includes(option.value) || false}
                          onChange={(e) => {
                            const currentValues = filters[key] || []
                            const newValues = e.target.checked
                              ? [...currentValues, option.value]
                              : currentValues.filter(v => v !== option.value)
                            onFilterChange(key, newValues)
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={options.type || 'text'}
                    value={filters[key] || ''}
                    onChange={(e) => onFilterChange(key, e.target.value)}
                    placeholder={options.placeholder}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Hook and utility functions moved to src/utils/searchUtils.js to avoid fast-refresh violations
// Import them from there when needed:
// import { useSearchAndFilter, commonFilterFunctions } from '../utils/searchUtils'