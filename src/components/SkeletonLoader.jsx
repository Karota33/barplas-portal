// Componentes de skeleton loading para diferentes casos de uso

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-40 sm:h-48 bg-gray-200"></div>
      <div className="p-3 sm:p-4">
        <div className="h-4 sm:h-5 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/2 mb-3 sm:mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 sm:w-12 h-4 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ClientCardSkeleton() {
  return (
    <div className="py-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex space-x-2">
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export function OrderCardSkeleton() {
  return (
    <div className="px-4 py-6 sm:px-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-5 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="h-10 bg-gray-100 rounded"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="w-20 h-6 bg-gray-200 rounded"></div>
        <div className="w-16 h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export function CatalogItemSkeleton() {
  return (
    <div className="px-4 py-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-16 bg-gray-200 rounded"></div>
        <div className="flex-1 min-w-0">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="px-4 sm:px-0 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="w-32 h-10 bg-gray-200 rounded"></div>
          <div className="w-24 h-10 bg-gray-200 rounded"></div>
          <div className="w-28 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="mb-6">
        <div className="flex space-x-8">
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            <ClientCardSkeleton />
            <ClientCardSkeleton />
            <ClientCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ClientPortalSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Products grid skeleton */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {Array.from({ length: 8 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// Componente genérico de skeleton con personalización
export function GenericSkeleton({ 
  className = '', 
  lines = 3, 
  showAvatar = false,
  showButton = false 
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {showAvatar && (
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <div 
            key={i}
            className={`h-4 bg-gray-200 rounded ${
              i === lines - 1 ? 'w-2/3' : 'w-full'
            }`}
          ></div>
        ))}
      </div>
      
      {showButton && (
        <div className="mt-4">
          <div className="w-24 h-8 bg-gray-200 rounded"></div>
        </div>
      )}
    </div>
  )
}

// useSkeletonDelay hook moved to src/utils/skeletonUtils.js to avoid fast-refresh violations