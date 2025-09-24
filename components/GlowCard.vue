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
      class="glass-surface glass-hover relative h-full overflow-hidden rounded-2xl p-6 shadow-[0_18px_40px_rgba(10,8,35,0.35)] transition-all duration-500 ease-[var(--ease-cosmic)] transform-gpu ring-1 ring-transparent group-hover:-translate-y-[1px] group-hover:scale-[1.01] group-hover:ring-[color:var(--border-hover)] group-focus-visible:ring-2 group-focus-visible:ring-[color:hsl(var(--violet)/0.4)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-bg-950 motion-reduce:transition-none motion-reduce:transform-none"
      :class="intensityClass"
    >
      <div
        class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style="background: radial-gradient(120% 140% at 50% -20%, hsla(var(--violet), 0.22), transparent 70%);"
      />
      <div
        class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet/20 via-transparent to-magenta/20 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
      />
      <div class="absolute inset-0 overflow-hidden rounded-2xl">
        <div
          class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-60 transition-transform duration-1000 ease-[var(--ease-cosmic)] group-hover:translate-x-full"
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
    low: 'group-hover:shadow-[0_24px_55px_rgba(10,8,35,0.45)]',
    medium: 'group-hover:shadow-[0_30px_68px_rgba(10,8,35,0.55)]',
    high: 'group-hover:shadow-[0_36px_80px_rgba(10,8,35,0.65)]',
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
