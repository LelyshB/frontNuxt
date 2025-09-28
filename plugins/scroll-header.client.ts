export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') {
    return
  }

  const updateState = () => {
    const scrolled = window.scrollY > 20
    const value = scrolled ? 'true' : 'false'
    document.querySelectorAll<HTMLElement>('[data-header-pill]').forEach((element) => {
      element.dataset.scrolled = value
    })
  }

  const handleScroll = () => {
    requestAnimationFrame(updateState)
  }

  const handleResize = () => {
    requestAnimationFrame(updateState)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)

  nuxtApp.hook('app:mounted', updateState)
  nuxtApp.hook('page:finish', updateState)
  updateState()

  nuxtApp.hook('app:beforeUnmount', () => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })
})
