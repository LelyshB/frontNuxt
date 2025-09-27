import { onBeforeUnmount, onMounted } from 'vue'

export function useStaggeredReveal(selector = '[data-reveal]', step = 100) {
  let observer: IntersectionObserver | null = null

  const revealImmediately = (elements: HTMLElement[]) => {
    elements.forEach((element) => {
      element.classList.remove('opacity-0')
      element.style.opacity = '1'
      element.style.transform = 'none'
    })
  }

  onMounted(() => {
    if (typeof window === 'undefined') return

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
    if (!elements.length) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)')

    if (!mediaQuery.matches) {
      revealImmediately(elements)
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          const index = elements.indexOf(target)

          if (index >= 0) {
            target.style.animationDelay = `${index * step}ms`
          }

          target.classList.remove('opacity-0')
          target.classList.add('animate-fade-in-up')
          target.style.willChange = 'transform, opacity'

          target.addEventListener(
            'animationend',
            () => {
              target.style.willChange = ''
              target.style.animationDelay = ''
              target.style.opacity = ''
            },
            { once: true }
          )

          observer?.unobserve(target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

    elements.forEach((element) => observer?.observe(element))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
