import type { RouterConfig } from '@nuxt/schema'

const shouldSmoothScroll = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: no-preference)').matches

const routerOptions: RouterConfig = {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    const behavior = shouldSmoothScroll() ? 'smooth' : undefined

    if (to.hash) {
      return behavior ? { el: to.hash, top: 0, behavior } : { el: to.hash, top: 0 }
    }

    return behavior ? { top: 0, behavior } : { top: 0 }
  },
}

export default routerOptions
