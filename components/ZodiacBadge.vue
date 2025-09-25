<template>
  <div
    ref="cardRef"
    class="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-[0_26px_60px_rgba(10,8,35,0.45)] backdrop-blur-2xl transition-all duration-500 ease-[var(--ease-cosmic)] transform-gpu ring-1 ring-transparent hover:-translate-y-[3px] hover:shadow-[0_32px_72px_rgba(10,8,35,0.58)] hover:ring-[color:var(--border-hover)] focus-within:ring-2 focus-within:ring-[color:hsl(var(--violet)/0.45)] focus-within:ring-offset-2 focus-within:ring-offset-bg-950 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[0_26px_60px_rgba(10,8,35,0.45)]"
    :style="{ transform: cardTransform }"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    data-zodiac-card
  >
    <span
      class="pointer-events-none absolute inset-px rounded-[inherit] border border-white/5 opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover:opacity-100"
    />
    <span
      class="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(120%_140%_at_50%_-10%,hsla(var(--violet)/0.18),transparent_78%)] opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover:opacity-100"
    />
    <span
      class="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(125deg,hsla(var(--magenta)/0.14),hsla(var(--aurora-teal)/0.1)_55%,transparent)] opacity-0 transition-opacity duration-700 ease-[var(--ease-cosmic)] group-hover:opacity-100"
    />
    <span
      class="pointer-events-none absolute -top-1/3 left-1/2 h-[160%] w-[65%] -translate-x-1/2 rotate-[18deg] bg-white/15 blur-3xl opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover:opacity-70 motion-reduce:opacity-40"
    />
    <div class="pointer-events-none absolute inset-px overflow-hidden rounded-[inherit]">
      <span
        v-if="!prefersReducedMotion && shimmerDirection"
        :key="shimmerKey"
        class="shimmer-strip"
        :class="{
          'shimmer-strip--forward': shimmerDirection === 'forward',
          'shimmer-strip--reverse': shimmerDirection === 'reverse',
        }"
        @animationend="handleShimmerEnd"
      />
    </div>

    <div class="relative z-10 flex flex-col text-center transition-transform duration-500 ease-[var(--ease-cosmic)]">
      <div class="mb-6 flex justify-center">
        <div
          class="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent shadow-[0_16px_32px_rgba(128,90,255,0.25)] transition-transform duration-500 ease-[var(--ease-cosmic)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-[10deg] group-hover:shadow-[0_24px_46px_rgba(128,90,255,0.35)] motion-reduce:group-hover:transform-none"
        >
          <div
            class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style="background: radial-gradient(circle at 30% 20%, hsla(var(--violet), 0.3), transparent 60%);"
          />
          <div class="pointer-events-none absolute inset-[18%] rounded-full bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-60" />
          <slot name="icon" />
        </div>
      </div>
      <h3 class="mb-1 font-heading text-xl font-bold text-text-base">{{ name }}</h3>
      <p class="mb-2 text-sm font-medium tracking-wide text-text-muted/80">{{ dateRange }}</p>
      <p class="text-sm leading-relaxed text-text-muted">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{ name: string; dateRange: string; description: string }>()

type ShimmerDirection = 'forward' | 'reverse'

const cardRef = ref<HTMLElement | null>(null)
const cardTransform = ref('perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)')
const shimmerDirection = ref<ShimmerDirection | null>(null)
const shimmerKey = ref(0)
const prefersReducedMotion = ref(false)
let mediaQuery: MediaQueryList | null = null
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null

function handleMouseEnter(event: MouseEvent) {
  triggerShimmer('forward')
  handleMouseMove(event)
}

function handleMouseMove(event: MouseEvent) {
  if (typeof window === 'undefined' || prefersReducedMotion.value) return
  const target = cardRef.value
  if (!target) return
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height
  cardTransform.value = `perspective(1100px) rotateX(${ -y * 5 }deg) rotateY(${ x * 5 }deg) scale(1.02)`
}

function handleMouseLeave() {
  triggerShimmer('reverse')
  resetTilt()
}

function triggerShimmer(direction: ShimmerDirection) {
  if (prefersReducedMotion.value) return
  shimmerDirection.value = direction
  shimmerKey.value += 1
}

function handleShimmerEnd() {
  shimmerDirection.value = null
}

function resetTilt() {
  cardTransform.value = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)'
}

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  mediaQueryListener = (event: MediaQueryListEvent) => {
    prefersReducedMotion.value = event.matches
    if (event.matches) {
      resetTilt()
      shimmerDirection.value = null
    }
  }
  mediaQuery.addEventListener('change', mediaQueryListener)
})

onBeforeUnmount(() => {
  if (mediaQuery && mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener)
  }
})
</script>

<style scoped>
.shimmer-strip {
  position: absolute;
  top: -35%;
  bottom: -35%;
  left: -25%;
  width: 36%;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, hsla(var(--violet) / 0.6), hsla(var(--magenta) / 0.55), transparent);
  filter: blur(6px);
  opacity: 0;
  mix-blend-mode: screen;
  border-radius: 999px;
}

.shimmer-strip--forward {
  animation: zodiac-shimmer 0.65s cubic-bezier(0.25, 0.9, 0.35, 1) forwards;
}

.shimmer-strip--reverse {
  animation: zodiac-shimmer 0.65s cubic-bezier(0.25, 0.9, 0.35, 1) reverse forwards;
}

@keyframes zodiac-shimmer {
  0% {
    transform: translateX(-120%) skewX(-18deg);
    opacity: 0;
  }
  10% {
    opacity: 0.55;
  }
  45% {
    opacity: 0.85;
  }
  100% {
    transform: translateX(160%) skewX(-18deg);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shimmer-strip--forward,
  .shimmer-strip--reverse {
    animation: none;
  }
}
</style>
