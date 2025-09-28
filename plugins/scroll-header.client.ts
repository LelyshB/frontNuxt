export default defineNuxtPlugin(() => {
  const el = document.querySelector<HTMLElement>('[data-header-pill]')
  if (!el) return

  // Sentinel ~20px from top. When it leaves the viewport, we mark "scrolled".
  const sentinel = document.createElement('div')
  sentinel.style.position = 'absolute'
  sentinel.style.top = '20px'
  sentinel.style.width = '1px'
  sentinel.style.height = '1px'
  document.body.prepend(sentinel)

  const io = new IntersectionObserver(([entry]) => {
    el.toggleAttribute('data-scrolled', !entry.isIntersecting)
  }, { root: null, threshold: 1 })

  io.observe(sentinel)
})
