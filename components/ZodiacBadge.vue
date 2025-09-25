<template>
  <!--
    A small card that displays the zodiac sign name, date range and
    description.  The card gently tilts towards the cursor on hover,
    emulating the interactive feel of the original React version.
  -->
  <div
    ref="cardRef"
    class="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(140%_160%_at_50%_-20%,hsla(var(--violet)/0.18),transparent_75%)] p-[1px] transition-all duration-500 ease-[var(--ease-cosmic)]"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    data-zodiac-card
  >
    <span
      class="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(220%_140%_at_50%_-20%,hsla(var(--aurora-teal)/0.2),transparent_65%)] opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover:opacity-80 group-focus-within:opacity-80"
    />
    <div
      class="relative h-full w-full rounded-[24px] border border-white/10 bg-[radial-gradient(180%_140%_at_50%_-10%,hsla(var(--surface)/0.92),hsla(var(--surface)/0.85)_40%,hsla(var(--surface)/0.78)_78%)] p-6 shadow-[0_30px_60px_rgba(8,6,24,0.55)] backdrop-blur-xl transition-all duration-500 ease-[var(--ease-cosmic)] transform-gpu ring-1 ring-transparent before:pointer-events-none before:absolute before:-inset-[1px] before:rounded-[inherit] before:bg-[linear-gradient(135deg,hsla(var(--magenta)/0.14),hsla(var(--aurora-teal)/0.12)_55%,transparent)] before:opacity-0 before:transition-opacity before:duration-700 before:content-[''] hover:-translate-y-[3px] hover:scale-[1.015] hover:shadow-[0_44px_84px_rgba(8,6,24,0.65)] hover:ring-[color:var(--border-hover)] group-focus-within:ring-[color:var(--border-hover)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:transition-none"
    >
      <span class="zodiac-glint" :style="glintStyle" />
      <span
        class="pointer-events-none absolute -top-24 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsla(var(--violet),0.25),transparent_70%)] opacity-0 transition-opacity duration-700 ease-[var(--ease-cosmic)] group-hover:opacity-60 group-focus-within:opacity-60"
      />
      <div
        ref="contentRef"
        class="relative z-10 flex h-full flex-col text-center transition-transform duration-500 ease-[var(--ease-cosmic)]"
        :style="{ transform: transformStyle }"
      >
        <div class="mb-7 flex justify-center">
          <div
            class="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_120%_at_30%_20%,hsla(var(--violet),0.28),transparent_70%)] shadow-[0_20px_40px_rgba(70,40,140,0.35)] transition-all duration-500 ease-[var(--ease-cosmic)] group-hover:-translate-y-1 group-hover:rotate-[10deg] group-hover:scale-[1.08] group-hover:shadow-[0_30px_60px_rgba(70,40,140,0.45)] motion-reduce:group-hover:transform-none"
          >
            <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover:opacity-100" style="background: radial-gradient(circle at 65% 20%, hsla(var(--aurora-teal), 0.28), transparent 58%);" />
            <slot name="icon" />
          </div>
        </div>
        <h3 class="mb-1 font-heading text-xl font-bold text-white drop-shadow-[0_4px_16px_rgba(70,30,140,0.35)]">{{ name }}</h3>
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-text-muted/80">{{ dateRange }}</p>
        <p class="text-sm leading-relaxed text-text-muted">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useGlintAnimation } from '@/composables/useGlintAnimation'

// Props describing a zodiac sign.  The icon is provided via the named
// `icon` slot.
defineProps<{ name: string; dateRange: string; description: string }>()

const cardRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const transformStyle = ref('perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)')
const prefersReducedMotion = ref(false)
const glint = useGlintAnimation({
  duration: 1200,
  forwardName: 'zodiac-glint-forward',
  reverseName: 'zodiac-glint-reverse',
})

const glintStyle = computed(() => glint.glintAnimationStyle.value)
let mediaQuery: MediaQueryList | null = null
let mediaListener: ((event: MediaQueryListEvent) => void) | null = null

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  mediaListener = (event: MediaQueryListEvent) => {
    prefersReducedMotion.value = event.matches
    if (event.matches) {
      glint.stop()
      resetTilt()
    }
  }
  mediaQuery.addEventListener('change', mediaListener)
})

onBeforeUnmount(() => {
  if (mediaQuery && mediaListener) {
    mediaQuery.removeEventListener('change', mediaListener)
  }
})

function handleMouseMove(event: MouseEvent) {
  if (typeof window === 'undefined') return
  if (prefersReducedMotion.value) return
  const target = cardRef.value
  const content = contentRef.value
  if (!target || !content) return
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height
  transformStyle.value = `perspective(1100px) rotateX(${ -y * 5 }deg) rotateY(${ x * 5 }deg) scale(1.02)`
}

function resetTilt() {
  transformStyle.value = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)'
}

function handleMouseEnter(event: MouseEvent) {
  if (!prefersReducedMotion.value) {
    glint.playForward()
  }
  handleMouseMove(event)
}

function handleMouseLeave() {
  if (!prefersReducedMotion.value) {
    glint.playReverse()
  }
  resetTilt()
}

function handleFocusIn() {
  if (!prefersReducedMotion.value) {
    glint.playForward()
  }
}

function handleFocusOut() {
  if (!prefersReducedMotion.value) {
    glint.playReverse()
  }
  resetTilt()
}
</script>

<style scoped>
.zodiac-glint {
  pointer-events: none;
  position: absolute;
  inset: -40% -80%;
  background: linear-gradient(115deg, transparent 20%, hsla(0, 0%, 100%, 0.6) 45%, hsla(0, 0%, 100%, 0.2) 60%, transparent 80%);
  mix-blend-mode: screen;
  opacity: 0;
  transform: translate3d(-120%, 0, 0) skewX(-12deg);
}

@keyframes zodiac-glint-forward {
  0% {
    opacity: 0;
    transform: translate3d(-120%, 0, 0) skewX(-12deg);
  }
  30% {
    opacity: 0.35;
  }
  55% {
    opacity: 0.48;
  }
  100% {
    opacity: 0;
    transform: translate3d(120%, 0, 0) skewX(-12deg);
  }
}

@keyframes zodiac-glint-reverse {
  0% {
    opacity: 0;
    transform: translate3d(120%, 0, 0) skewX(-12deg);
  }
  40% {
    opacity: 0.35;
  }
  100% {
    opacity: 0;
    transform: translate3d(-120%, 0, 0) skewX(-12deg);
  }
}

.zodiac-glint[style*='zodiac-glint-forward'],
.zodiac-glint[style*='zodiac-glint-reverse'] {
  opacity: 1;
}
</style>