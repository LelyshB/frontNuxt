import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface UseInViewOptions {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
  groupSize?: number
  groupDelay?: number
  itemDelay?: number
}

export function useInView(options: UseInViewOptions = {}) {
  const target = ref<HTMLElement | null>(null)
  const isInView = ref(false)
  let observer: IntersectionObserver | null = null
  let observedElement: HTMLElement | null = null
  const once = options.once ?? true

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
          if (entry.isIntersecting) {
            isInView.value = true
            if (once && observer && entry.target instanceof HTMLElement) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            isInView.value = false
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

  const groupSize = options.groupSize ?? 4
  const groupDelay = options.groupDelay ?? 150
  const itemDelay = options.itemDelay ?? 45

  const getStaggerDelay = (index: number) => {
    const groupIndex = Math.floor(index / groupSize)
    const indexInGroup = index % groupSize
    const delay = groupIndex * groupDelay + indexInGroup * itemDelay
    return `${delay}ms`
  }

  return {
    target,
    isInView,
    getStaggerDelay,
  }
}
