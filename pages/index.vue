<template>
  <!--
    The home page of the Nuxt application.  It mirrors the structure of
    the original React implementation, complete with a canvas
    starfield, hero section, zodiac grid, services carousel and a
    call‑to‑action.  The header and footer are also replicated.
  -->
  <div class="relative overflow-hidden min-h-screen flex flex-col bg-bg-950 text-text-base">
    <!-- Animated starfield canvas -->
    <StarfieldCanvas class="pointer-events-none z-0" />
    <!-- Static starfield pattern overlay -->
    <div class="starfield-static absolute inset-0 z-0" />
    <!-- Header -->
    <AppHeader class="z-20" />
    <!-- Main content -->
    <main class="flex-1 relative z-10 pt-24">
      <!-- Hero section -->
      <section class="container mx-auto text-center py-24" id="hero">
        <h1 class="gradient-text mb-4">Unlock Your Cosmic Destiny</h1>
        <p class="max-w-2xl mx-auto text-text-muted mb-8">
          Discover the ancient wisdom of the stars with personalized astrology
          readings that illuminate your path forward.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#readings" class="btn-cosmic group inline-flex items-center justify-center">
            <span>Start Your Journey</span>
            <Sparkles class="ml-2 h-5 w-5 transition-transform duration-200 group-hover:animate-pulse" />
          </a>
          <a href="#services" class="btn-cosmic">Explore Services</a>
        </div>
      </section>
      <!-- Zodiac preview grid -->
      <section id="zodiac" class="container mx-auto py-16">
        <SectionHeader
          title="Zodiac Signs"
          subtitle="Discover your sign"
          description="Explore the unique traits and cosmic energies associated with each zodiac sign."
        />
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          ref="zodiacRef"
        >
          <ZodiacBadge
            v-for="(sign, index) in zodiacSigns"
            :key="index"
            :name="sign.name"
            :dateRange="sign.dateRange"
            :description="sign.description"
          >
            <template #icon>
              <OrbitIcon :icon="sign.Icon" size="lg" class="mx-auto" />
            </template>
          </ZodiacBadge>
        </div>
      </section>
      <!-- Services carousel -->
      <section id="services" class="container mx-auto py-16">
        <SectionHeader
          title="Our Services"
          subtitle="What we offer"
          description="From personal readings to compatibility analysis, our range of services helps you connect with the cosmos."
        />
        <ServicesCarousel />
      </section>
      <!-- Call to action -->
      <section id="cta" class="container mx-auto py-24">
        <GlowCard class="mx-auto max-w-2xl text-center" hover3d glowIntensity="high">
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
              <p class="mx-auto max-w-xl text-text-muted leading-relaxed">
                Get personalized insights that illuminate your path, reveal your
                potential, and guide you toward your highest purpose.
              </p>
            </div>
            <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#readings" class="btn-cosmic group inline-flex items-center justify-center">
                <span>Get My Reading</span>
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
      </section>
    </main>
    <!-- Footer -->
    <footer class="relative z-10 bg-bg-900/80 backdrop-blur-md border-t border-border-default py-6">
      <div
        class="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-text-muted"
      >
        <span class="mb-4 md:mb-0">
          © {{ new Date().getFullYear() }} Cosmic Astrology. All rights reserved.
        </span>
        <div class="space-x-4">
          <a href="#privacy" class="hover:text-white">Privacy</a>
          <a href="#terms" class="hover:text-white">Terms</a>
          <a href="#contact" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import StarfieldCanvas from '@/components/StarfieldCanvas.vue'
import AppHeader from '@/components/AppHeader.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import ServicesCarousel from '@/components/ServicesCarousel.vue'
import ZodiacBadge from '@/components/ZodiacBadge.vue'
import GlowCard from '@/components/GlowCard.vue'
import OrbitIcon from '@/components/OrbitIcon.vue'
import {
  Star,
  Shield,
  Wind,
  Moon,
  Crown,
  Target,
  Heart,
  Zap,
  Users,
  BookOpen,
  Sparkles,
  Droplet,
  ArrowRight,
} from 'lucide-vue-next'

// Define the list of zodiac signs.  Each entry includes a name,
// date range, a corresponding icon component and a short description.
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

// Reference to the zodiac grid for staggered reveal animation
const zodiacRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // IntersectionObserver for fade‑in effect on zodiac cards
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up')
      }
    })
  }, observerOptions)
  // Observe each card with a staggered delay
  if (zodiacRef.value) {
    const cards = zodiacRef.value.querySelectorAll('[data-zodiac-card]')
    cards.forEach((card, index) => {
      setTimeout(() => {
        observer.observe(card)
      }, index * 100)
    })
  }
  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>