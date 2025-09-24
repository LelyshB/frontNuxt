<template>
  <section class="py-16 px-4" aria-label="Compatibility Preview — Synastry Teaser">
    <div class="container mx-auto max-w-4xl">
      <SectionHeader
        subtitle="Compatibility Preview"
        title="Cosmic Connections"
        description="Explore the celestial chemistry between souls through synastry."
        className="mb-12"
        titleGradient
      />

      <div class="flex flex-col items-center space-y-8">
        <div
          class="relative h-40 w-80"
          @mouseenter="isPointerOver = true"
          @mouseleave="isPointerOver = false"
          @focusin="isFocusWithin = true"
          @focusout="isFocusWithin = false"
        >
          <svg class="absolute inset-0 h-full w-full" viewBox="0 0 320 160" aria-hidden="true">
            <defs>
              <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="'hsl(var(--amethyst))'" stop-opacity="0.8" />
                <stop offset="100%" :stop-color="'hsl(var(--aurora-teal))'" stop-opacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 60 140 Q 160 20 260 140"
              :stroke="`url(#${gradientId})`"
              stroke-width="3"
              fill="none"
              style="filter: drop-shadow(0 0 8px hsl(var(--amethyst) / 0.5));"
            />
            <circle v-for="(particle, index) in particles" :key="index" :cx="particle.cx" :cy="particle.cy" :r="particle.r"
              :fill="particle.fill" :opacity="particle.opacity" />
          </svg>

          <div class="absolute left-0 bottom-0 flex h-20 w-20 items-center justify-center rounded-full border border-amethyst/30 glass-surface"
            :style="leftOrbStyle"
          >
            <div class="h-6 w-6 rounded-full bg-amethyst" />
          </div>

          <div class="absolute right-0 bottom-0 flex h-20 w-20 items-center justify-center rounded-full border border-aurora-teal/30 glass-surface"
            :style="rightOrbStyle"
          >
            <div class="h-6 w-6 rounded-full bg-aurora-teal" />
          </div>

          <div class="absolute top-4 left-1/2 -translate-x-1/2 text-center">
            <div class="text-2xl font-heading font-bold gradient-text">{{ score }}%</div>
            <div class="text-xs font-medium text-text-muted">Cosmic Match</div>
          </div>
        </div>

        <div class="w-full max-w-md space-y-4">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label class="flex flex-col gap-2 text-sm font-medium text-text-muted">
              <span>Your Birth Date</span>
              <input
                v-model="birth1"
                type="text"
                inputmode="numeric"
                placeholder="DD.MM.YYYY"
                class="glass-surface w-full rounded-lg border border-amethyst/20 px-4 py-3 text-text-base transition-colors focus-cosmic focus:border-amethyst/50"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm font-medium text-text-muted">
              <span>Their Birth Date</span>
              <input
                v-model="birth2"
                type="text"
                inputmode="numeric"
                placeholder="DD.MM.YYYY"
                class="glass-surface w-full rounded-lg border border-aurora-teal/20 px-4 py-3 text-text-base transition-colors focus-cosmic focus:border-aurora-teal/50"
              />
            </label>
          </div>
          <div class="pt-2 text-center">
            <a href="/compat" class="btn-cosmic" aria-label="Check compatibility">
              Check compatibility
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'

const birth1 = ref('')
const birth2 = ref('')
const score = 87
const isPointerOver = ref(false)
const isFocusWithin = ref(false)
const floatY = ref(0)
const reduced = ref(false)
const gradientId = `arc-gradient-${Math.random().toString(36).slice(2, 9)}`
let frame: number | null = null
let mediaQuery: MediaQueryList | null = null
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null

const particles = [
  { cx: 120, cy: 80, r: 2, fill: 'hsl(var(--amethyst))', opacity: 0.6 },
  { cx: 160, cy: 40, r: 1.5, fill: 'hsl(200 95% 70%)', opacity: 0.8 },
  { cx: 200, cy: 60, r: 2.5, fill: 'hsl(var(--aurora-teal))', opacity: 0.5 },
]

const paused = computed(() => isPointerOver.value || isFocusWithin.value)

const leftOrbStyle = computed(() => ({
  transform: `translateY(${floatY.value}px)`,
  boxShadow: '0 0 20px hsl(var(--amethyst) / 0.35)',
}))

const rightOrbStyle = computed(() => ({
  transform: `translateY(${-floatY.value}px)`,
  boxShadow: '0 0 20px hsl(var(--aurora-teal) / 0.35)',
}))

const stopAnimation = () => {
  if (frame !== null && typeof window !== 'undefined') {
    cancelAnimationFrame(frame)
    frame = null
  }
  floatY.value = 0
}

const animate = () => {
  if (typeof window === 'undefined') return
  const now = performance.now()
  floatY.value = Math.sin(now * 0.002) * 6
  frame = requestAnimationFrame(animate)
}

const startAnimation = () => {
  if (reduced.value || paused.value || frame !== null || typeof window === 'undefined') {
    return
  }
  frame = requestAnimationFrame(animate)
}

watch(
  () => [paused.value, reduced.value],
  ([isPaused, isReduced]) => {
    if (isPaused || isReduced) {
      stopAnimation()
    } else {
      startAnimation()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mediaQuery.matches
  mediaQueryListener = (event: MediaQueryListEvent) => {
    reduced.value = event.matches
  }
  mediaQuery.addEventListener('change', mediaQueryListener)
  startAnimation()
})

onBeforeUnmount(() => {
  stopAnimation()
  if (mediaQuery && mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener)
  }
})
</script>
