<template>
  <section
    ref="sectionRef"
    class="py-16 px-4"
    aria-label="Compatibility Preview — Synastry Teaser"
    :data-in-view="isInView ? 'true' : null"
  >
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
          class="group/compat relative h-40 w-80 overflow-visible rounded-[30px] border border-white/10 bg-[radial-gradient(160%_120%_at_50%_-20%,hsla(var(--violet)/0.18),transparent_75%)] p-[1px] shadow-[0_34px_80px_rgba(6,4,20,0.55)] transition-transform duration-500 ease-[var(--ease-cosmic)] transform-gpu hover:-translate-y-[6px] hover:scale-[1.015] focus-within:ring-2 focus-within:ring-[color:hsl(var(--violet)/0.45)] focus-within:ring-offset-2 focus-within:ring-offset-bg-950 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
          @mouseenter="isPointerOver = true"
          @mouseleave="isPointerOver = false"
          @focusin="isFocusWithin = true"
          @focusout="isFocusWithin = false"
        >
          <div
            class="relative h-full w-full rounded-[28px] border border-white/10 bg-[radial-gradient(120%_130%_at_50%_-10%,hsla(var(--surface)/0.92),hsla(var(--surface)/0.82)_45%,hsla(var(--surface)/0.78)_82%)] p-6 transition-all duration-500 ease-[var(--ease-cosmic)] ring-1 ring-transparent before:pointer-events-none before:absolute before:-inset-[1px] before:rounded-[inherit] before:bg-[linear-gradient(135deg,hsla(var(--magenta)/0.12),hsla(var(--aurora-teal)/0.1)_58%,transparent)] before:opacity-0 before:transition-opacity before:duration-700 before:content-[''] group-hover/compat:before:opacity-100 group-focus-within/compat:before:opacity-100"
          >
          <span
            class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover/compat:opacity-100 group-focus-within/compat:opacity-100"
            style="background: radial-gradient(130% 150% at 50% -10%, hsla(var(--violet), 0.2), transparent 78%);"
          />
          <span
            class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700 ease-[var(--ease-cosmic)] group-hover/compat:opacity-100"
            style="background: linear-gradient(130deg, hsla(var(--magenta), 0.12), hsla(var(--aurora-teal), 0.14) 55%, transparent);"
          />

          <svg class="absolute inset-0 h-full w-full" viewBox="0 0 320 160" aria-hidden="true">
            <defs>
              <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="'hsl(var(--amethyst))'" stop-opacity="0.85" />
                <stop offset="100%" :stop-color="'hsl(var(--aurora-teal))'" stop-opacity="0.85" />
              </linearGradient>
            </defs>
            <path
              ref="arcPathRef"
              d="M 60 140 Q 160 20 260 140"
              :stroke="`url(#${gradientId})`"
              stroke-width="3"
              fill="none"
              :stroke-dasharray="arcDashArray"
              :stroke-dashoffset="arcDashOffset"
              class="transition-[filter] duration-500 ease-[var(--ease-cosmic)] group-hover/compat:[filter:drop-shadow(0_0_22px_hsl(var(--aurora-teal)/0.55))]"
            />
            <circle
              v-for="(particle, index) in particles"
              :key="index"
              :cx="particle.cx"
              :cy="particle.cy"
              :r="particle.r"
              :fill="particle.fill"
              :opacity="particle.opacity"
            />
          </svg>

          <div
            class="absolute left-0 bottom-0 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-amethyst/25 bg-white/5 backdrop-blur-sm transition-all duration-500 ease-[var(--ease-cosmic)] [transform:translate3d(0,var(--float,0px),0)] ring-1 ring-transparent group-hover/compat:ring-[color:var(--border-hover)] group-hover/compat:shadow-[0_0_32px_hsl(var(--amethyst)/0.45)]"
            :style="leftOrbStyle"
          >
            <span
              class="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,hsla(var(--violet),0.45),transparent_70%)] opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover/compat:opacity-80 group-hover/compat:animate-[orb-glow_2s_ease-in-out_infinite] motion-reduce:group-hover/compat:animate-none"
            />
            <div class="h-6 w-6 rounded-full bg-amethyst" />
          </div>

          <div
            class="absolute right-0 bottom-0 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-aurora-teal/25 bg-white/5 backdrop-blur-sm transition-all duration-500 ease-[var(--ease-cosmic)] [transform:translate3d(0,var(--float,0px),0)] ring-1 ring-transparent group-hover/compat:ring-[color:var(--border-hover)] group-hover/compat:shadow-[0_0_32px_hsl(var(--aurora-teal)/0.45)]"
            :style="rightOrbStyle"
          >
            <span
              class="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,hsla(var(--aurora-teal),0.45),transparent_70%)] opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover/compat:opacity-80 group-hover/compat:animate-[orb-glow_2s_ease-in-out_infinite] motion-reduce:group-hover/compat:animate-none"
            />
            <div class="h-6 w-6 rounded-full bg-aurora-teal" />
          </div>

          <div class="absolute top-4 left-1/2 -translate-x-1/2 text-center">
            <div
              class="gradient-text text-3xl font-heading font-bold drop-shadow-[0_0_18px_rgba(155,92,255,0.35)] transition-transform duration-300"
              :style="scoreTransform"
              aria-live="polite"
            >
              {{ displayedScore }}%
            </div>
            <div class="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">Cosmic Match</div>
          </div>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { useInView } from '@/composables/useInView'

const birth1 = ref('')
const birth2 = ref('')
const displayedScore = ref(0)
const targetScore = 87
const isPointerOver = ref(false)
const isFocusWithin = ref(false)
const floatY = ref(0)
const reduced = ref(false)
const gradientId = `arc-gradient-${Math.random().toString(36).slice(2, 9)}`
const arcPathRef = ref<SVGPathElement | null>(null)
const arcLength = ref(0)
const arcDashOffset = ref(0)
const arcDashArray = computed(() => arcLength.value)
const scoreProgress = computed(() => Math.min(displayedScore.value / targetScore, 1))
const scoreTransform = computed(() => ({
  transform: `translate3d(0, ${Math.round((1 - scoreProgress.value) * 14)}px, 0)`,
}))
let floatFrame: number | null = null
let arcFrame: number | null = null
let mediaQuery: MediaQueryList | null = null
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null
let arcPlayed = false

const particles = [
  { cx: 120, cy: 80, r: 2, fill: 'hsl(var(--amethyst))', opacity: 0.6 },
  { cx: 160, cy: 40, r: 1.5, fill: 'hsl(200 95% 70%)', opacity: 0.8 },
  { cx: 200, cy: 60, r: 2.5, fill: 'hsl(var(--aurora-teal))', opacity: 0.5 },
]

const isInteractive = computed(() => isPointerOver.value || isFocusWithin.value)
const paused = computed(() => isInteractive.value)

const orbGlow = computed(() => (isInteractive.value ? 0.55 : 0.35))

const leftOrbStyle = computed(() => ({
  '--float': `${floatY.value}px`,
  boxShadow: `0 0 26px hsl(var(--amethyst) / ${orbGlow.value})`,
}))

const rightOrbStyle = computed(() => ({
  '--float': `${-floatY.value}px`,
  boxShadow: `0 0 26px hsl(var(--aurora-teal) / ${orbGlow.value})`,
}))

const stopFloatAnimation = () => {
  if (floatFrame !== null && typeof window !== 'undefined') {
    cancelAnimationFrame(floatFrame)
    floatFrame = null
  }
  floatY.value = 0
}

const floatStep = () => {
  if (typeof window === 'undefined') return
  const now = performance.now()
  floatY.value = Math.sin(now * 0.002) * 6
  floatFrame = requestAnimationFrame(floatStep)
}

const startFloatAnimation = () => {
  if (reduced.value || paused.value || floatFrame !== null || typeof window === 'undefined') {
    return
  }
  floatFrame = requestAnimationFrame(floatStep)
}

const stopArcAnimation = () => {
  if (arcFrame !== null && typeof window !== 'undefined') {
    cancelAnimationFrame(arcFrame)
    arcFrame = null
  }
}

const updateArcMetrics = () => {
  if (typeof window === 'undefined') return
  const path = arcPathRef.value
  if (!path) return
  const length = path.getTotalLength()
  arcLength.value = length
  arcDashOffset.value = length
}

const resetArcSequence = () => {
  stopArcAnimation()
  updateArcMetrics()
  arcDashOffset.value = arcLength.value
  displayedScore.value = 0
  arcPlayed = false
}

const playArcSequence = () => {
  if (arcPlayed) return
  updateArcMetrics()
  arcPlayed = true
  if (reduced.value || typeof window === 'undefined') {
    arcDashOffset.value = 0
    displayedScore.value = targetScore
    return
  }
  const startOffset = arcLength.value
  const start = performance.now()
  const duration = 1100

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    arcDashOffset.value = startOffset * (1 - eased)
    displayedScore.value = Math.round(eased * targetScore)
    if (progress < 1) {
      arcFrame = requestAnimationFrame(tick)
    } else {
      arcFrame = null
      displayedScore.value = targetScore
    }
  }

  arcFrame = requestAnimationFrame(tick)
}

const { target: sectionRef, isInView } = useInView({
  threshold: 0.35,
  rootMargin: '-20% 0px',
  once: false,
  onEnter: () => {
    playArcSequence()
  },
  onLeave: () => {
    resetArcSequence()
  },
})

watch(
  () => [paused.value, reduced.value],
  ([isPaused, isReduced]) => {
    if (isPaused || isReduced) {
      stopFloatAnimation()
    } else {
      startFloatAnimation()
    }
  },
  { immediate: true }
)

watch(
  () => reduced.value,
  (value) => {
    if (value) {
      stopFloatAnimation()
      stopArcAnimation()
      arcDashOffset.value = 0
      displayedScore.value = targetScore
    } else if (isInView.value) {
      resetArcSequence()
      playArcSequence()
    }
  }
)

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mediaQuery.matches
  mediaQueryListener = (event: MediaQueryListEvent) => {
    reduced.value = event.matches
    if (!event.matches && isInView.value && !arcPlayed) {
      playArcSequence()
    }
  }
  mediaQuery.addEventListener('change', mediaQueryListener)
  nextTick(() => {
    updateArcMetrics()
    if (isInView.value) {
      playArcSequence()
    }
  })
  startFloatAnimation()
})

onBeforeUnmount(() => {
  stopFloatAnimation()
  stopArcAnimation()
  if (mediaQuery && mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener)
  }
})
</script>
