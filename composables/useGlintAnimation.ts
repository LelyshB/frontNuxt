import { computed, ref } from 'vue'

type GlintDirection = 'forward' | 'reverse'

interface UseGlintAnimationOptions {
  duration?: number
  easing?: string
  forwardName?: string
  reverseName?: string
}

export function useGlintAnimation(options: UseGlintAnimationOptions = {}) {
  const {
    duration = 1100,
    easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
    forwardName = 'glint-forward',
    reverseName = 'glint-reverse',
  } = options

  const state = ref<'idle' | GlintDirection>('idle')
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const clearTimer = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const schedule = (direction: GlintDirection) => {
    clearTimer()
    const run = () => {
      state.value = direction
      timeoutId = setTimeout(() => {
        state.value = 'idle'
        timeoutId = null
      }, duration)
    }

    if (typeof window === 'undefined') {
      run()
      return
    }

    state.value = 'idle'
    window.requestAnimationFrame(run)
  }

  const playForward = () => schedule('forward')
  const playReverse = () => schedule('reverse')
  const stop = () => {
    clearTimer()
    state.value = 'idle'
  }

  const glintAnimationStyle = computed(() => {
    if (state.value === 'idle') {
      return { animation: 'none' }
    }
    const name = state.value === 'forward' ? forwardName : reverseName
    return { animation: `${name} ${duration}ms ${easing} forwards` }
  })

  return {
    glintAnimationStyle,
    playForward,
    playReverse,
    stop,
  }
}
