import { ref, onMounted, onUnmounted, readonly } from 'vue'

/**
 * Detects the user's reduced motion preference via a media query.  If
 * the user has enabled reduced motion in their system settings the
 * returned `reduced` ref will be true.  Components can use this to
 * disable animations when appropriate.
 */
export const useMotion = () => {
  const reduced = ref(false)
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      reduced.value = mediaQuery.matches
      const handleChange = (e: MediaQueryListEvent) => {
        reduced.value = e.matches
      }
      mediaQuery.addEventListener('change', handleChange)
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleChange)
      })
    }
  })
  return { reduced: readonly(reduced) }
}