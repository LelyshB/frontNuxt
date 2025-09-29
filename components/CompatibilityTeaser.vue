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

      <div class="flex justify-center">
        <div
          class="relative w-full max-w-[420px] overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(140%_90%_at_50%_-30%,rgba(123,68,255,0.35),transparent_60%),linear-gradient(180deg,rgba(19,12,36,0.92)0%,rgba(10,7,24,0.95)100%)] px-12 pb-12 pt-16 text-center shadow-[0_34px_120px_rgba(8,5,24,0.65)] ring-1 ring-white/5 backdrop-blur-[26px]"
        >
          <span
            class="pointer-events-none absolute inset-x-10 top-0 h-32 rounded-[30px] bg-[radial-gradient(120%_80%_at_50%_10%,rgba(175,111,255,0.35),rgba(85,54,156,0.05))] opacity-90"
            aria-hidden="true"
          />
          <span
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_120%,rgba(255,145,255,0.08),transparent_70%)]"
            aria-hidden="true"
          />

          <div class="relative z-10">
            <div
              class="font-heading text-[56px] font-semibold leading-none text-white drop-shadow-[0_0_26px_rgba(140,82,255,0.55)]"
              aria-live="polite"
            >
              {{ displayedScore }}%
            </div>
            <div class="mt-2 text-sm font-medium uppercase tracking-[0.65em] text-white/45">
              Cosmic Match
            </div>
          </div>

          <div class="relative z-10 mt-10 flex h-32 w-full items-center justify-center">
            <svg class="h-full w-full" viewBox="0 0 360 200" role="presentation" aria-hidden="true">
              <defs>
                <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(198,126,255,0.95)" />
                  <stop offset="55%" stop-color="rgba(216,133,255,1)" />
                  <stop offset="100%" stop-color="rgba(124,210,255,0.95)" />
                </linearGradient>
                <radialGradient :id="orbGradientId" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.95)" />
                  <stop offset="60%" stop-color="rgba(203,149,255,0.65)" />
                  <stop offset="100%" stop-color="rgba(120,60,190,0)" />
                </radialGradient>
              </defs>
              <g transform="translate(12, 0)">
                <path
                  ref="arcPathRef"
                  d="M 30 170 Q 168 46 306 170"
                  :stroke="`url(#${gradientId})`"
                  stroke-width="5"
                  stroke-linecap="round"
                  fill="none"
                  :stroke-dasharray="arcDashArray"
                  :stroke-dashoffset="arcDashOffset"
                  class="[filter:drop-shadow(0_0_22px_rgba(189,115,255,0.45))]"
                />
                <circle
                  :cx="connectionPoint.x"
                  :cy="connectionPoint.y"
                  r="14"
                  :fill="`url(#${orbGradientId})`"
                  :opacity="orbOpacity"
                />
              </g>
            </svg>
          </div>

          <div class="relative z-10 mt-10 flex w-full justify-between text-lg font-medium text-white/85">
            <span class="tracking-[0.08em] text-white/80">Artem</span>
            <span class="tracking-[0.08em] text-white/80">Olga</span>
          </div>
          <div class="relative z-10 mt-6 text-xs uppercase tracking-[0.75em] text-white/35">
            Orbital Synastry
          </div>
        </div>
      </div>

      <div class="mt-10 text-center">
        <NuxtLink to="/compat" class="btn-cosmic inline-flex items-center justify-center" aria-label="Check compatibility">
          Check compatibility
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { useInView } from '@/composables/useInView'

const displayedScore = ref(0)
const targetScore = 87 as number
const animationDuration = 5000

// stable, collision-safe IDs for gradients
const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '') || 'id'
const gradientId = `compatibility-arc-${sanitizeId(useId())}`
const orbGradientId = `compatibility-orb-${sanitizeId(useId())}`

const arcPathRef = ref<SVGPathElement | null>(null)
const arcLength = ref(0)
const arcDashOffset = ref(0)
const arcDashArray = computed(() => arcLength.value)

const connectionPoint = ref({ x: 30, y: 170 })
const prefersReducedMotion = ref(false)

const orbOpacity = computed(() => {
  const progress = targetScore === 0 ? 0 : displayedScore.value / targetScore
  return 0.35 + Math.min(Math.max(progress, 0), 1) * 0.6
})

let animationFrame: number | null = null
let mediaQuery: MediaQueryList | null = null
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null
let resizeListener: (() => void) | null = null
let animationStarted = false

const updateConnectionPoint = (progress: number) => {
  const path = arcPathRef.value
  if (!path || arcLength.value === 0) return
  const length = arcLength.value * progress
  const point = path.getPointAtLength(length)
  connectionPoint.value = { x: point.x, y: point.y }
}

const updateArcMetrics = () => {
  const path = arcPathRef.value
  if (!path) return
  const length = path.getTotalLength()
  arcLength.value = length
  arcDashOffset.value = length
  updateConnectionPoint(0)
}

const stopAnimation = () => {
  if (animationFrame !== null && typeof window !== 'undefined') {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  animationStarted = false
}

const playArcSequence = () => {
  if (animationStarted) return
  animationStarted = true
  updateArcMetrics()

  if (prefersReducedMotion.value || typeof window === 'undefined') {
    arcDashOffset.value = 0
    displayedScore.value = targetScore
    updateConnectionPoint(1)
    return
  }

  const start = performance.now()
  const tick = (now: number) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / animationDuration, 1)
    arcDashOffset.value = arcLength.value * (1 - progress)
    displayedScore.value = Math.round(progress * targetScore)
    updateConnectionPoint(progress)

    if (progress < 1) {
      animationFrame = requestAnimationFrame(tick)
    } else {
      animationFrame = null
      displayedScore.value = targetScore
      updateConnectionPoint(1)
    }
  }

  animationFrame = requestAnimationFrame(tick)
}

const { target: sectionRef, isInView } = useInView({
  threshold: 0.6,
  rootMargin: '0px 0px',
  once: true,
  onEnter: () => playArcSequence(),
})

watch(
  () => prefersReducedMotion.value,
  (value) => {
    if (value) {
      stopAnimation()
      arcDashOffset.value = 0
      displayedScore.value = targetScore
      updateConnectionPoint(1)
    } else if (isInView.value && !animationStarted) {
      playArcSequence()
    }
  }
)

onMounted(() => {
  if (typeof window === 'undefined') return

  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  mediaQueryListener = (event: MediaQueryListEvent) => {
    prefersReducedMotion.value = event.matches
    if (!event.matches && isInView.value && !animationStarted) playArcSequence()
  }
  mediaQuery.addEventListener('change', mediaQueryListener)

  resizeListener = () => {
    const wasAtEnd = arcDashOffset.value === 0
    updateArcMetrics()
    if (wasAtEnd) {
      arcDashOffset.value = 0
      updateConnectionPoint(1)
    }
  }
  window.addEventListener('resize', resizeListener)

  nextTick(() => {
    updateArcMetrics()
    if (isInView.value) playArcSequence()
  })
})

onBeforeUnmount(() => {
  stopAnimation()
  if (mediaQuery && mediaQueryListener) mediaQuery.removeEventListener('change', mediaQueryListener)
  if (resizeListener) window.removeEventListener('resize', resizeListener)
})
</script>