import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

// Hook para usar el sistema de toast
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider')
  }
  return context
}