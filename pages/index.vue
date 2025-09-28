<template>
  <div class="relative min-h-screen overflow-x-hidden bg-bg-950 text-text-base">
    <StarfieldCanvas class="!fixed inset-0 z-0 pointer-events-none" />
    <div class="starfield-static pointer-events-none fixed inset-0 z-0" />
    <div
      class="pointer-events-none fixed top-0 left-1/2 z-0 h-full w-full -translate-x-1/2"
      style="background: var(--gradient-nebula)"
      data-parallax="0.3"
    />

    <AppHeader class="relative z-20" />

    <main class="relative z-10 pt-[var(--header-height,0px)]">
      <section
        id="hero"
        class="grid min-h-[calc(100dvh-var(--header-height,0px))] place-items-center px-4 scroll-mt-[calc(var(--header-height,0px)+1.5rem)]"
      >
        <div class="container mx-auto max-w-4xl text-center">
          <div class="space-y-8" data-parallax="0.6">
            <div class="space-y-4">
              <span
                class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-starlight/80 backdrop-blur"
              >
                Trusted cosmic insights
              </span>
              <h1 class="font-heading text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                Unlock Your <span class="gradient-text">Cosmic</span> Destiny
              </h1>
              <p class="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">
                Discover the ancient wisdom of the stars with personalized astrology readings that illuminate your path forward.
              </p>
            </div>

            <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#readings" class="btn-cosmic group inline-flex items-center">
                Start Your Journey
                <Sparkles class="ml-2 h-5 w-5 transition-transform duration-200 group-hover:animate-pulse" />
              </a>
              <a
                href="#services"
                class="inline-flex items-center gap-2 px-6 py-3 text-text-base transition-colors duration-200 hover:text-violet focus-cosmic"
              >
                <span>Explore Services</span>
                <ChevronDown class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <DeckTeaser />
      <CompatibilityTeaser />

      <section
        id="zodiac"
        class="py-24 px-4 scroll-mt-[calc(var(--header-height,0px)+1.5rem)]"
      >
        <div class="container mx-auto">
          <SectionHeader
            subtitle="Your Cosmic Blueprint"
            title="Discover Your Zodiac Sign"
            description="Each sign holds unique wisdom and insight into your personality, relationships, and destiny."
            className="mb-16"
            titleGradient
          />

          <div class="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-6">
            <CardGloss
              v-for="sign in zodiacSigns"
              :key="sign.name"
              data-reveal
              class="group h-full opacity-0 motion-reduce:opacity-100 [&>div]:p-5 [&>div]:lg:p-6"
              :style="{ animationFillMode: 'forwards' }"
            >
              <div class="flex h-full flex-col items-center gap-5 text-center">
                <div class="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet via-magenta to-magenta/80 text-white shadow-[0_18px_38px_rgba(147,51,234,0.28)] transition-transform duration-500 ease-[var(--ease-cosmic)] group-hover:rotate-[8deg] group-hover:scale-110 motion-reduce:transform-none">
                  <component
                    :is="sign.Icon"
                    class="h-7 w-7 transition-transform duration-500 group-hover:scale-110"
                  />
                  <span class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div class="space-y-2.5">
                  <h3 class="font-heading text-lg font-semibold text-text-base">{{ sign.name }}</h3>
                  <p class="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-text-muted/60">{{ sign.dateRange }}</p>
                  <p class="text-sm leading-relaxed text-text-muted/90">{{ sign.description }}</p>
                </div>
              </div>
            </CardGloss>
          </div>
        </div>
      </section>

      <section id="services" class="py-24 px-4 scroll-mt-[calc(var(--header-height,0px)+1.5rem)]">
        <div class="container mx-auto">
          <SectionHeader
            subtitle="Cosmic Services"
            title="Your Journey to Self-Discovery"
            description="Choose from our range of personalized astrology services designed to guide you on your cosmic journey."
            className="mb-16"
          />
          <ServicesCarousel />
        </div>
      </section>

      <section id="cta" class="py-24 px-4 scroll-mt-[calc(var(--header-height,0px)+1.5rem)]">
        <div class="container mx-auto text-center">
          <GlowCard class="mx-auto max-w-2xl" hover3d glowIntensity="high">
            <div class="space-y-6">
              <div class="relative mx-auto h-16 w-16">
                <Star class="h-16 w-16 animate-pulse text-violet" fill="currentColor" />
                <div class="absolute inset-0 animate-spin" style="animation-duration: 20s">
                  <Star class="h-16 w-16 text-magenta opacity-30" />
                </div>
              </div>
              <div class="space-y-4">
                <h2 class="gradient-text font-heading text-3xl font-bold sm:text-4xl">
                  Ready to Begin Your Cosmic Journey?
                </h2>
                <p class="mx-auto max-w-xl leading-relaxed text-text-muted">
                  Get personalized insights that illuminate your path, reveal your potential, and guide you toward your highest purpose.
                </p>
              </div>
              <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#readings" class="btn-cosmic group inline-flex items-center">
                  Get My Reading
                  <ArrowRight class="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#about"
                  class="px-6 py-3 text-text-muted transition-colors duration-200 hover:text-violet focus-cosmic"
                >
                  Learn More
                </a>
              </div>
            </div>
          </GlowCard>
        </div>
      </section>
    </main>

    <footer id="about" class="relative z-10 border-t border-white/10 px-4 py-12 scroll-mt-[calc(var(--header-height,0px)+1.5rem)]">
      <div class="container mx-auto flex flex-col items-center justify-between gap-6 text-sm text-text-muted md:flex-row">
        <div class="flex items-center gap-2">
          <Star class="h-6 w-6 text-violet" fill="currentColor" />
          <span class="font-heading text-lg font-bold text-text-base">Cosmic</span>
        </div>
        <div class="flex items-center gap-6">
          <a href="#privacy" class="transition-colors duration-200 hover:text-violet">Privacy</a>
          <a href="#terms" class="transition-colors duration-200 hover:text-violet">Terms</a>
          <a href="#contact" class="transition-colors duration-200 hover:text-violet">Contact</a>
        </div>
        <p>© {{ new Date().getFullYear() }} Cosmic Astrology. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import CompatibilityTeaser from '@/components/CompatibilityTeaser.vue'
import DeckTeaser from '@/components/DeckTeaser.vue'
import GlowCard from '@/components/GlowCard.vue'
import CardGloss from '@/components/CardGloss.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import ServicesCarousel from '@/components/ServicesCarousel.vue'
import StarfieldCanvas from '@/components/StarfieldCanvas.vue'
import { ArrowRight, ChevronDown, Crown, Droplet, Heart, Moon, Shield, Sparkles, Star, Target, Wind, Zap } from 'lucide-vue-next'
import { useStaggeredReveal } from '@/composables/useStaggeredReveal'

const zodiacSigns = [
  { name: 'Aries', dateRange: 'Mar 21 - Apr 19', Icon: Star, description: 'Bold and pioneering spirit' },
  { name: 'Taurus', dateRange: 'Apr 20 - May 20', Icon: Shield, description: 'Grounded and determined nature' },
  { name: 'Gemini', dateRange: 'May 21 - Jun 20', Icon: Wind, description: 'Curious and adaptable mind' },
  { name: 'Cancer', dateRange: 'Jun 21 - Jul 22', Icon: Moon, description: 'Intuitive and nurturing soul' },
  { name: 'Leo', dateRange: 'Jul 23 - Aug 22', Icon: Crown, description: 'Confident and generous heart' },
  { name: 'Virgo', dateRange: 'Aug 23 - Sep 22', Icon: Target, description: 'Analytical and helpful spirit' },
  { name: 'Libra', dateRange: 'Sep 23 - Oct 22', Icon: Heart, description: 'Harmonious and diplomatic nature' },
  { name: 'Scorpio', dateRange: 'Oct 23 - Nov 21', Icon: Zap, description: 'Intense and transformative power' },
  { name: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', Icon: Target, description: 'Adventurous and philosophical mind' },
  { name: 'Capricorn', dateRange: 'Dec 22 - Jan 19', Icon: Shield, description: 'Ambitious and disciplined approach' },
  { name: 'Aquarius', dateRange: 'Jan 20 - Feb 18', Icon: Wind, description: 'Innovative and humanitarian vision' },
  { name: 'Pisces', dateRange: 'Feb 19 - Mar 20', Icon: Droplet, description: 'Compassionate and artistic soul' },
]

useStaggeredReveal('[data-reveal]', 100)

const parallaxElements = ref<HTMLElement[]>([])
let scrollHandler: (() => void) | null = null
let mediaQuery: MediaQueryList | null = null
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null
let rafId = 0
const prefersReducedMotion = ref(false)

const applyParallax = () => {
  if (prefersReducedMotion.value) return
  const scrollY = window.scrollY
  parallaxElements.value.forEach((element) => {
    const speed = parseFloat(element.dataset.parallax ?? '0.5')
    const offset = -(scrollY * speed)
    element.style.transform = `translate3d(0, ${offset}px, 0)`
  })
}

const scheduleParallax = () => {
  if (prefersReducedMotion.value) return
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
  rafId = requestAnimationFrame(applyParallax)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  parallaxElements.value = Array.from(document.querySelectorAll('[data-parallax]')) as HTMLElement[]
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  mediaQueryListener = (event: MediaQueryListEvent) => {
    prefersReducedMotion.value = event.matches
    if (prefersReducedMotion.value) {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
      parallaxElements.value.forEach((element) => {
        element.style.transform = ''
      })
    } else {
      scheduleParallax()
    }
  }
  mediaQuery.addEventListener('change', mediaQueryListener)
  scrollHandler = () => scheduleParallax()
  window.addEventListener('scroll', scrollHandler, { passive: true })
  scheduleParallax()
})

onBeforeUnmount(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  if (mediaQuery && mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener)
  }
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>
