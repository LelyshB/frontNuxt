<template>
  <div
    ref="cardRef"
    class="group cursor-pointer"
    @mouseenter="handlePointerMove"
    @mousemove="handlePointerMove"
    @mouseleave="resetTransform"
    :style="hover3d ? { transform: transformStyle } : undefined"
  >
    <div
      class="glass-surface glass-hover relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-200 ease-cosmic transform-gpu"
      :class="intensityClass"
    >
      <!-- Gradient border overlay -->
      <div
        class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet to-magenta opacity-0 transition-opacity duration-200 group-hover:opacity-10"
      />

      <!-- Shimmer effect -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl">
        <div
          class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
        />
      </div>

      <div class="relative z-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type GlowIntensity = 'low' | 'medium' | 'high'

const props = withDefaults(
  defineProps<{
    glowIntensity?: GlowIntensity
    hover3d?: boolean
  }>(),
  {
    glowIntensity: 'medium' as GlowIntensity,
    hover3d: false,
  }
)

const cardRef = ref<HTMLDivElement | null>(null)
const transformStyle = ref('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')

const intensityClass = computed(() => {
  const classes: Record<GlowIntensity, string> = {
    low: 'group-hover:shadow-[0_0_28px_hsl(var(--amethyst)_/_0.2)]',
    medium: 'group-hover:shadow-[0_0_32px_hsl(var(--amethyst)_/_0.4)]',
    high: 'group-hover:shadow-[0_0_36px_hsl(var(--amethyst)_/_0.6)]',
  }
  return classes[props.glowIntensity]
})

function handlePointerMove(event: MouseEvent) {
  if (!props.hover3d) return
  if (typeof window === 'undefined') return
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)')
  if (!mediaQuery.matches) return

  const target = cardRef.value
  if (!target) return
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height

  transformStyle.value = `perspective(1000px) rotateX(${ -y * 3 }deg) rotateY(${ x * 3 }deg) scale(1.02)`
}

function resetTransform() {
  transformStyle.value = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}
</script>
