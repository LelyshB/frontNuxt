<template>
  <!--
    A simplified carousel for the services section.  It cycles
    through three cards with a fade/scale effect and supports auto
    progression as well as manual navigation via arrows and dots.
  -->
  <div class="relative w-full overflow-hidden">
    <!-- Slides wrapper -->
    <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        v-for="(service, index) in services"
        :key="service.id"
        class="w-full flex-shrink-0 px-4"
      >
        <div
          class="glass-surface rounded-2xl p-8 text-center h-full flex flex-col items-center justify-between"
        >
          <component :is="service.Icon" class="w-8 h-8 text-amethyst mb-4" />
          <h3 class="text-lg font-semibold mb-2">{{ service.title }}</h3>
          <p class="text-sm text-text-muted mb-4">{{ service.description }}</p>
          <a href="#" class="inline-flex items-center text-aurora-teal hover:text-amethyst transition-colors text-sm focus-cosmic">
            Learn more
            <ArrowRight class="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
    <!-- Navigation arrows -->
    <button
      class="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full glass-surface glass-hover focus-cosmic transform-gpu hover:scale-110"
      @click="prevSlide"
      aria-label="Previous slide"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>
    <button
      class="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full glass-surface glass-hover focus-cosmic transform-gpu hover:scale-110"
      @click="nextSlide"
      aria-label="Next slide"
    >
      <ChevronRight class="w-5 h-5" />
    </button>
    <!-- Dots indicator -->
    <div class="flex justify-center space-x-2 mt-4">
      <button
        v-for="(s, index) in services"
        :key="s.id"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full focus-cosmic transition-all duration-200"
        :class="index === currentIndex ? 'bg-gradient-to-r from-amethyst to-aurora-teal shadow-glow-violet scale-125' : 'bg-white/20 hover:bg-white/40'"
        aria-label="Go to slide"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Sparkles,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-vue-next'

interface Service {
  id: string
  title: string
  description: string
  Icon: any
}

const services: Service[] = [
  {
    id: '1',
    title: 'Personal Readings',
    description: 'Deep insights into your cosmic blueprint',
    Icon: Sparkles,
  },
  {
    id: '2',
    title: 'Relationship Analysis',
    description: 'Compatibility and connection guidance',
    Icon: Users,
  },
  {
    id: '3',
    title: 'Cosmic Education',
    description: 'Learn the ancient art of astrology',
    Icon: BookOpen,
  },
]

const currentIndex = ref(1) // start from the middle card
const isAutoPlaying = ref(true)
let timer: number | undefined

function nextSlide() {
  goToSlide((currentIndex.value + 1) % services.length)
}

function prevSlide() {
  goToSlide((currentIndex.value - 1 + services.length) % services.length)
}

function goToSlide(index: number) {
  currentIndex.value = index
  // pause auto-play for 2 seconds after manual navigation
  isAutoPlaying.value = false
  setTimeout(() => {
    isAutoPlaying.value = true
  }, 2000)
}

onMounted(() => {
  timer = window.setInterval(() => {
    if (isAutoPlaying.value) {
      nextSlide()
    }
  }, 4000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>