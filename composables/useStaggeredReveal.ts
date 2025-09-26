import { onBeforeUnmount, onMounted } from 'vue'

export function useStaggeredReveal(selector = '[data-reveal]', step = 100) {
  if (typeof window === 'undefined') return

  const mq = window.matchMedia('(prefers-reduced-motion: no-preference)')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          const index = elements.indexOf(target)

          if (mq.matches) {
            if (index >= 0) {
              target.style.animationDelay = `${index * step}ms`
            }
            target.classList.add('animate-fade-in-up')
            target.style.willChange = 'transform, opacity'
            target.addEventListener(
              'animationend',
              () => {
                target.style.willChange = ''
              },
              { once: true }
            )
          } else {
            target.classList.remove('opacity-0')
            target.style.opacity = '1'
            target.style.transform = 'none'
          }

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
