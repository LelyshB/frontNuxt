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
          class="group/compat relative h-40 w-80 overflow-visible rounded-[28px] border border-white/10 bg-surface/70 p-6 shadow-[0_26px_60px_rgba(10,8,35,0.45)] transition-all duration-500 ease-[var(--ease-cosmic)] transform-gpu ring-1 ring-transparent hover:-translate-y-[4px] hover:scale-[1.01] hover:ring-[color:var(--border-hover)] hover:shadow-[0_34px_74px_rgba(10,8,35,0.6)] focus-within:ring-2 focus-within:ring-[color:hsl(var(--violet)/0.45)] focus-within:ring-offset-2 focus-within:ring-offset-bg-950 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
          @mouseenter="handlePointerEnter"
          @mouseleave="handlePointerLeave"
          @focusin="handleFocusIn"
          @focusout="handleFocusOut"
        >
          <span
            class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover/compat:opacity-100 group-focus-within/compat:opacity-100"
            style="background: radial-gradient(130% 150% at 50% -10%, hsla(var(--violet), 0.18), transparent 78%);"
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
              d="M 60 140 Q 160 20 260 140"
              :stroke="`url(#${gradientId})`"
              stroke-width="3"
              fill="none"
              class="transition-[filter] duration-500 ease-[var(--ease-cosmic)] group-hover/compat:[filter:drop-shadow(0_0_22px_hsl(var(--aurora-teal)/0.55))]"
            />
            <circle
              v-for="(particle, index) in arcParticles"
              :key="index"
              :cx="particle.cx"
              :cy="particle.cy"
              :r="particle.r"
              :fill="particle.fill"
              :opacity="particle.opacity"
              class="transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover/compat:opacity-100"
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
            <div class="gradient-text text-2xl font-heading font-bold drop-shadow-[0_0_18px_rgba(155,92,255,0.35)]">{{ score }}%</div>
            <div class="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">Cosmic Match</div>
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
const gradientId = 'compat-arc-gradient'

const isPointerOver = ref(false)
const isFocusWithin = ref(false)
const floatY = ref(0)
const prefersReducedMotion = ref(false)

const isInteractive = computed(() => isPointerOver.value || isFocusWithin.value)
const orbGlow = computed(() => (isInteractive.value ? 0.55 : 0.35))

const leftOrbStyle = computed(() => ({
  '--float': `${floatY.value}px`,
  boxShadow: `0 0 26px hsl(var(--amethyst) / ${orbGlow.value})`,
}))

const rightOrbStyle = computed(() => ({
  '--float': `${-floatY.value}px`,
  boxShadow: `0 0 26px hsl(var(--aurora-teal) / ${orbGlow.value})`,
}))

const arcParticles = [
  { cx: 120, cy: 80, r: 2, fill: 'hsl(var(--amethyst))', opacity: 0.6 },
  { cx: 160, cy: 40, r: 1.5, fill: 'hsl(200 95% 70%)', opacity: 0.8 },
  { cx: 200, cy: 60, r: 2.5, fill: 'hsl(var(--aurora-teal))', opacity: 0.5 },
]

let floatFrame = 0
let mediaQuery: MediaQueryList | null = null
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null

function floatStep(timestamp: number) {
  if (prefersReducedMotion.value || isInteractive.value) {
    floatFrame = 0
    floatY.value = 0
    return
  }
  floatY.value = Math.sin(timestamp * 0.002) * 6
  floatFrame = requestAnimationFrame(floatStep)
}

function startFloatAnimation() {
  if (typeof window === 'undefined') return
  if (prefersReducedMotion.value || isInteractive.value || floatFrame) return
  floatFrame = requestAnimationFrame(floatStep)
}

function stopFloatAnimation() {
  if (typeof window === 'undefined') return
  if (floatFrame) {
    cancelAnimationFrame(floatFrame)
    floatFrame = 0
  }
  floatY.value = 0
}

watch(
  () => [prefersReducedMotion.value, isInteractive.value] as const,
  ([reduced, interactive]) => {
    if (reduced || interactive) {
      stopFloatAnimation()
    } else {
      startFloatAnimation()
    }
  },
  { immediate: true }
)

function handlePointerEnter() {
  isPointerOver.value = true
}

function handlePointerLeave() {
  isPointerOver.value = false
}

function handleFocusIn() {
  isFocusWithin.value = true
}

function handleFocusOut() {
  isFocusWithin.value = false
}

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  mediaQueryListener = (event: MediaQueryListEvent) => {
    prefersReducedMotion.value = event.matches
    if (event.matches) {
      stopFloatAnimation()
    } else {
      startFloatAnimation()
    }
  }
  mediaQuery.addEventListener('change', mediaQueryListener)
  if (!mediaQuery.matches) {
    startFloatAnimation()
  }
})

onBeforeUnmount(() => {
  stopFloatAnimation()
  if (mediaQuery && mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener)
  }
})
</script>
