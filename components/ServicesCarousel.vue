<template>
  <div class="relative w-full">
    <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:items-end">
      <article
        v-for="(card, index) in cards"
        :key="card.id"
        class="group/service relative flex h-full transform-gpu transition-all duration-500 ease-[var(--ease-cosmic)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:hsl(var(--violet)/0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950"
        :class="getCardClasses(index)"
        tabindex="0"
        @mouseenter="handleEnter(index)"
        @mouseleave="handleLeave(index)"
        @focusin="handleEnter(index)"
        @focusout="handleLeave(index)"
      >
        <div
          class="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(160%_140%_at_50%_-30%,hsla(var(--violet)/0.18),transparent_70%)] p-[1px] shadow-[0_38px_90px_rgba(6,4,20,0.55)] transition-all duration-500 ease-[var(--ease-cosmic)] ring-1 ring-transparent before:pointer-events-none before:absolute before:inset-px before:rounded-[inherit] before:bg-[linear-gradient(125deg,hsla(var(--magenta)/0.16),hsla(var(--aurora-teal)/0.14)_60%,transparent)] before:opacity-0 before:transition-opacity before:duration-700 before:content-[''] group-hover/service:-translate-y-3 group-hover/service:scale-[1.015] group-hover/service:shadow-[0_48px_110px_rgba(6,4,20,0.7)] group-hover/service:ring-[color:var(--border-hover)] group-hover/service:before:opacity-100 motion-reduce:group-hover/service:transform-none motion-reduce:transition-none"
        >
          <div
            class="relative flex h-full flex-col gap-6 rounded-[28px] border border-white/10 bg-[radial-gradient(140%_140%_at_50%_-10%,hsla(var(--surface)/0.94),hsla(var(--surface)/0.85)_48%,hsla(var(--surface)/0.8)_82%)] p-8 text-left"
          >
            <span class="service-glint" :style="card.glint.glintAnimationStyle" />
            <span
              class="pointer-events-none absolute -top-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsla(var(--violet),0.22),transparent_72%)] opacity-0 transition-opacity duration-700 ease-[var(--ease-cosmic)] group-hover/service:opacity-60 group-focus-within/service:opacity-60"
            />
            <div class="flex items-center justify-center">
              <div
                class="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(120%_120%_at_30%_20%,hsla(var(--violet),0.3),transparent_70%)] shadow-[0_24px_44px_rgba(70,40,140,0.35)] transition-all duration-500 ease-[var(--ease-cosmic)] group-hover/service:-translate-y-1 group-hover/service:scale-[1.08] group-hover/service:shadow-[0_34px_64px_rgba(70,40,140,0.45)] motion-reduce:group-hover/service:transform-none"
              >
                <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover/service:opacity-100" style="background: radial-gradient(circle at 65% 20%, hsla(var(--aurora-teal), 0.3), transparent 58%);" />
                <component :is="card.Icon" class="h-7 w-7 text-white drop-shadow-[0_6px_18px_rgba(90,40,160,0.45)]" />
              </div>
            </div>
            <div class="space-y-3">
              <p class="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted/70">{{ card.tagline }}</p>
              <h3 class="font-heading text-2xl font-bold text-white drop-shadow-[0_6px_20px_rgba(90,45,155,0.35)]">{{ card.title }}</h3>
              <p class="text-sm leading-relaxed text-text-muted">{{ card.description }}</p>
            </div>
            <a
              href="#"
              class="group/cta inline-flex items-center text-sm font-semibold transition-colors duration-300 ease-[var(--ease-cosmic)] focus-cosmic"
            >
              <span class="bg-[linear-gradient(90deg,hsl(var(--amethyst)),hsl(var(--rose)))] bg-clip-text text-transparent group-hover/cta:text-white">Learn more</span>
              <ArrowRight class="ml-2 h-4 w-4 text-aurora-teal transition-transform duration-300 group-hover/cta:translate-x-1" />
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowRight, BookOpen, Sparkles, Users } from 'lucide-vue-next'
import { useGlintAnimation } from '@/composables/useGlintAnimation'

interface ServiceCard {
  id: string
  title: string
  tagline: string
  description: string
  Icon: any
}

const serviceData: ServiceCard[] = [
  {
    id: 'personal',
    title: 'Personal Readings',
    tagline: 'Tailored Insight',
    description: 'Dive deep into your cosmic blueprint with readings crafted for your unique celestial imprint.',
    Icon: Sparkles,
  },
  {
    id: 'relationship',
    title: 'Relationship Analysis',
    tagline: 'Synastry Focus',
    description: 'Reveal compatibility patterns and energetic chemistry to strengthen the bonds that matter most.',
    Icon: Users,
  },
  {
    id: 'education',
    title: 'Cosmic Education',
    tagline: 'Learn & Grow',
    description: 'Master the language of the stars through guided lessons and immersive celestial workshops.',
    Icon: BookOpen,
  },
]

const cards = serviceData.map((service) => ({
  ...service,
  glint: useGlintAnimation({
    duration: 1200,
    forwardName: 'service-glint-forward',
    reverseName: 'service-glint-reverse',
  }),
}))

const prefersReducedMotion = ref(false)
let mediaQuery: MediaQueryList | null = null
let mediaListener: ((event: MediaQueryListEvent) => void) | null = null

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  mediaListener = (event: MediaQueryListEvent) => {
    prefersReducedMotion.value = event.matches
    if (event.matches) {
      cards.forEach((card) => card.glint.stop())
    }
  }
  mediaQuery.addEventListener('change', mediaListener)
})

onBeforeUnmount(() => {
  if (mediaQuery && mediaListener) {
    mediaQuery.removeEventListener('change', mediaListener)
  }
})

function handleEnter(index: number) {
  if (prefersReducedMotion.value) return
  cards[index]?.glint.playForward()
}

function handleLeave(index: number) {
  if (prefersReducedMotion.value) return
  cards[index]?.glint.playReverse()
}

function getCardClasses(index: number) {
  if (index === 1) {
    return 'md:-translate-y-6 md:scale-[1.05] md:z-10'
  }
  if (index === 0) {
    return 'md:translate-y-4 md:pr-4 md:opacity-95'
  }
  if (index === 2) {
    return 'md:translate-y-4 md:pl-4 md:opacity-95'
  }
  return ''
}
</script>

<style scoped>
.service-glint {
  pointer-events: none;
  position: absolute;
  inset: -45% -90%;
  background: linear-gradient(110deg, transparent 25%, hsla(0, 0%, 100%, 0.58) 48%, hsla(0, 0%, 100%, 0.18) 63%, transparent 78%);
  mix-blend-mode: screen;
  opacity: 0;
  transform: translate3d(-120%, 0, 0) skewX(-10deg);
}

@keyframes service-glint-forward {
  0% {
    opacity: 0;
    transform: translate3d(-120%, 0, 0) skewX(-10deg);
  }
  35% {
    opacity: 0.32;
  }
  55% {
    opacity: 0.46;
  }
  100% {
    opacity: 0;
    transform: translate3d(120%, 0, 0) skewX(-10deg);
  }
}

@keyframes service-glint-reverse {
  0% {
    opacity: 0;
    transform: translate3d(120%, 0, 0) skewX(-10deg);
  }
  45% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translate3d(-120%, 0, 0) skewX(-10deg);
  }
}

.service-glint[style*='service-glint-forward'],
.service-glint[style*='service-glint-reverse'] {
  opacity: 1;
}
</style>
