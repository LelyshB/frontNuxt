<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { StyleValue } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const baseClasses = 'group cursor-pointer transform-gpu transition-transform duration-200 ease-out will-change-transform'

const containerClass = computed(() => [baseClasses, attrs.class])

const containerStyle = computed<StyleValue | undefined>(() => attrs.style as StyleValue | undefined)

const passthroughAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest as Record<string, unknown>
})

const allowTilt = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: no-preference)').matches

const applyTilt = (event: MouseEvent) => {
  if (!allowTilt()) return
  const target = event.currentTarget as HTMLElement | null
  if (!target) return
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height
  target.style.transform = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) scale(1.02)`
}

const resetTilt = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement | null
  if (!target) return
  target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}
</script>

<template>
  <div
    v-bind="passthroughAttrs"
    :class="containerClass"
    :style="containerStyle"
    @mouseenter="applyTilt"
    @mousemove="applyTilt"
    @mouseleave="resetTilt"
  >
    <div class="glass-surface gloss astro-mask h-full w-full rounded-2xl p-6">
      <slot />
    </div>
  </div>
</template>
