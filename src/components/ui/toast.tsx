import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Icon } from './icon'
import type { ReactNode } from 'react'

const TOAST_MS = 2400

type ToastApi = { show: (text: string) => void }

const ToastContext = createContext<ToastApi | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const show = useCallback((text: string) => {
    clearTimeout(timer.current)
    setToast({ text, id: Date.now() })
    timer.current = setTimeout(() => setToast(null), TOAST_MS)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center sm:bottom-8"
      >
        {toast && (
          <div
            key={toast.id}
            className="inline-flex h-11 animate-toast-in items-center gap-2.5 rounded-full bg-ink pr-4.5 pl-4 text-label font-medium whitespace-nowrap text-on-ink shadow-tray"
          >
            <Icon name="check" size={16} strokeWidth={2} />
            {toast.text}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const api = useContext(ToastContext)
  if (!api) throw new Error('useToast must be used inside <ToastProvider>')
  return api
}
