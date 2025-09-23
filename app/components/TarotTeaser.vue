<template>
  <!-- A teaser section inviting users to draw a daily tarot card.  A
       small fan of cards is displayed with a subtle 3D rotation. -->
  <section class="py-16 px-4" id="tarot">
    <div class="container mx-auto max-w-4xl">
      <SectionHeader
        subtitle="Tarot Preview"
        title="Daily Cosmic Guidance"
        description="Draw wisdom from the ancient cards that reveal your path"
        class="mb-12"
      />
      <div class="flex flex-col items-center space-y-8">
        <!-- Card Fan -->
        <div
          class="relative perspective-1000"
          @mouseenter="pauseShuffle"
          @mouseleave="resumeShuffle"
          @focus="pauseShuffle"
          @blur="resumeShuffle"
        >
          <div class="flex items-center justify-center space-x-4">
            <div
              v-for="(card, index) in cards"
              :key="index"
              class="relative group focus-cosmic"
              :style="{
                transform: getCardTransform(index),
                zIndex: index === 1 ? 10 : 5 - Math.abs(index - 1)
              }"
            >
              <div
                class="w-24 h-36 glass-surface rounded-lg border border-amethyst/20 cursor-pointer transition-all duration-300 ease-cosmic transform-gpu hover:scale-110 hover:rotate-0 backface-hidden"
                :class="{
                  'animate-pulse': !motionReduced && isShuffling && !isPaused,
                  'hover:border-amethyst/50 hover:shadow-glow-violet': true
                }"
                @click="selectCard(index)"
              >
                <!-- Card Back Design -->
                <div class="w-full h-full p-2 flex flex-col items-center justify-center text-center">
                  <!-- Mystical Pattern -->
                  <div class="w-full h-full relative overflow-hidden rounded">
                    <div class="absolute inset-0 bg-gradient-to-br from-amethyst/10 to-aurora-teal/10" />
                    <div class="absolute inset-2 border border-amethyst/30 rounded flex items-center justify-center">
                      <component :is="StarIcon" :size="20" class="text-amethyst" />
                    </div>
                    <!-- Mystical corners -->
                    <div class="absolute top-1 left-1 w-2 h-2 border-t border-l border-amethyst/40" />
                    <div class="absolute top-1 right-1 w-2 h-2 border-t border-r border-amethyst/40" />
                    <div class="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-amethyst/40" />
                    <div class="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amethyst/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- CTA -->
        <div class="text-center">
          <a
            href="#tarot"
            class="inline-flex items-center gap-2 px-8 py-4 cta-button rounded-full font-medium text-white focus-cosmic text-lg"
            @click="drawCard"
          >
            <component :is="SparklesIcon" :size="20" />
            Draw Your Daily Card
          </a>
          <p class="text-text-muted text-sm mt-3 max-w-md mx-auto">
            Discover the cosmic message waiting for you in today's mystical draw
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Composable to detect reduced motion
const { reduced: motionReduced } = useMotion()
// Icons used in the card design and CTA
const StarIcon = resolveComponent('IconSparkles')
const SparklesIcon = resolveComponent('IconSparkles')

const cards = ref([
  { id: 1, selected: false },
  { id: 2, selected: false },
  { id: 3, selected: false }
])

const isShuffling = ref(true)
const isPaused = ref(false)
let shuffleInterval: ReturnType<typeof setInterval> | null = null

const getCardTransform = (index: number) => {
  if (motionReduced.value) {
    return `translateX(${(index - 1) * 8}px)`
  }
  const rotations = [-8, 0, 8]
  const translations = [-12, 0, 12]
  return `rotateY(${rotations[index]}deg) rotateZ(${rotations[index] / 2}deg) translateX(${translations[index]}px)`
}

const selectCard = (index: number) => {
  cards.value[index].selected = true
  // Additional logic could go here for selecting a card
}

const drawCard = () => {
  // Placeholder for navigation to tarot page
  console.log('Drawing daily card...')
}

const startShuffle = () => {
  if (motionReduced.value || isPaused.value) return
  stopShuffle()
  shuffleInterval = setInterval(() => {
    // The pulse animation is driven by CSS; nothing needed here
  }, 1000)
}

const stopShuffle = () => {
  if (shuffleInterval) {
    clearInterval(shuffleInterval)
    shuffleInterval = null
  }
}

const pauseShuffle = () => {
  isPaused.value = true
}

const resumeShuffle = () => {
  isPaused.value = false
}

onMounted(() => {
  if (!motionReduced.value) {
    startShuffle()
  }
})

onUnmounted(() => {
  stopShuffle()
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>