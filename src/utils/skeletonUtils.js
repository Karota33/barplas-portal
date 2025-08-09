import { useState, useEffect } from 'react'

// Hook para simular loading con skeleton
export function useSkeletonDelay(actualLoading, minDelay = 800) {
  const [showSkeleton, setShowSkeleton] = useState(true)

  useEffect(() => {
    let timer
    
    if (!actualLoading) {
      timer = setTimeout(() => {
        setShowSkeleton(false)
      }, minDelay)
    } else {
      setShowSkeleton(true)
    }
    
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [actualLoading, minDelay])

  return showSkeleton || actualLoading
}