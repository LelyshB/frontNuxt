import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface UseInViewOptions {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
  itemDelay?: number
  initialDelay?: number
  onEnter?: (entry: IntersectionObserverEntry & { target: HTMLElement }) => void
  onLeave?: (entry: IntersectionObserverEntry & { target: HTMLElement }) => void
}

function isElementEntry(
  entry: IntersectionObserverEntry
): entry is IntersectionObserverEntry & { target: HTMLElement } {
  return entry.target instanceof HTMLElement
}

export function useInView(options: UseInViewOptions = {}) {
  const target = ref<HTMLElement | null>(null)
  const isInView = ref(false)
  let observer: IntersectionObserver | null = null
  let observedElement: HTMLElement | null = null
  const once = options.once ?? true
  let hasEntered = false

  const observe = (element: HTMLElement | null) => {
    if (!observer) return
    if (observedElement) {
      observer.unobserve(observedElement)
    }
    observedElement = element
    if (element) {
      observer.observe(element)
    }
  }

  const createObserver = () => {
    if (typeof window === 'undefined') return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isElementEntry(entry)) return
          if (entry.isIntersecting) {
            if (!hasEntered) {
              options.onEnter?.(entry)
            }
            hasEntered = true
            isInView.value = true
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            hasEntered = false
            isInView.value = false
            options.onLeave?.(entry)
          }
        })
      },
      {
        rootMargin: options.rootMargin ?? '-15% 0px',
        threshold: options.threshold ?? 0.1,
      }
    )
    if (target.value) {
      observe(target.value)
    }
  }

  onMounted(() => {
    createObserver()
  })

  watch(
    () => target.value,
    (element) => {
      if (element && !observer) {
        createObserver()
      }
      observe(element ?? null)
    }
  )

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    observedElement = null
  })

  const itemDelay = options.itemDelay ?? 90
  const initialDelay = options.initialDelay ?? 0

  const getStaggerDelay = (index: number) => {
    const delay = initialDelay + index * itemDelay
    return `${delay}ms`
  }

  return {
    target,
    isInView,
    getStaggerDelay,
  }
}
