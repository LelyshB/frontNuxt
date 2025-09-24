<template>
  <section id="readings" class="py-16 px-4" aria-label="Tarot Preview — Deck Teaser">
    <div class="container mx-auto max-w-5xl">
      <SectionHeader
        subtitle="Tarot Preview"
        title="Deck Teaser"
        description="A quiet three-card fan — hover to flip, focus to pause."
        className="mb-10"
        titleGradient
      />

      <div
        class="group relative mx-auto flex w-full max-w-[520px] select-none items-center justify-center"
      >
        <div class="relative h-[260px] w-full [perspective:1200px]">
          <a
            v-for="card in cards"
            :key="card.id"
            href="/tarot"
            class="deck-card focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950 focus-visible:ring-violet/40"
            :aria-label="`Tarot card: ${card.title}`"
          >
            <GlowCard hover3d class="h-64 w-44">
              <div class="flex h-full w-full flex-col items-center justify-center space-y-3 rounded-xl text-center">
                <div class="h-10 w-10 rounded-full bg-gradient-to-br from-violet to-aurora-teal opacity-80" />
                <div class="font-heading text-lg font-semibold text-text-base">
                  {{ card.title }}
                </div>
                <div class="text-sm text-text-muted">
                  {{ card.hint }}
                </div>
              </div>
            </GlowCard>
          </a>
        </div>
      </div>

      <div class="mt-8 text-center">
        <a href="/tarot" class="btn-cosmic" aria-label="Draw a daily card">
          Draw a daily card
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GlowCard from '@/components/GlowCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'

const cards = [
  { id: 'left', title: 'Intuition', hint: 'Clarity emerges' },
  { id: 'mid', title: 'Focus', hint: 'A path reveals' },
  { id: 'right', title: 'Change', hint: 'Turn the page' },
]
</script>

<style scoped>
.deck-card {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  transform-style: preserve-3d;
  transform: translate(-50%, -50%) rotate(var(--deck-rotate)) translateX(var(--deck-offset));
  transition: transform 0.8s var(--ease-cosmic);
  animation: deck-wiggle 12s ease-in-out infinite;
}

.deck-card:nth-child(1) {
  --deck-rotate: -12deg;
  --deck-offset: -92px;
  --deck-tilt: 1.2deg;
  --deck-transform-hover: translate(-50%, -50%) rotate(-16deg) translateX(-120px);
}

.deck-card:nth-child(2) {
  --deck-rotate: -1deg;
  --deck-offset: 0px;
  --deck-tilt: 1.6deg;
  --deck-transform-hover: translate(-50%, -50%) rotate(-3deg) translateX(0px) rotateY(16deg);
}

.deck-card:nth-child(3) {
  --deck-rotate: 11deg;
  --deck-offset: 92px;
  --deck-tilt: 1.1deg;
  --deck-transform-hover: translate(-50%, -50%) rotate(15deg) translateX(120px);
}

.group:hover .deck-card,
.group:focus-within .deck-card {
  animation-play-state: paused;
}

.group:hover .deck-card {
  transform: var(--deck-transform-hover);
}

@keyframes deck-wiggle {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(var(--deck-rotate)) translateX(var(--deck-offset));
  }
  50% {
    transform: translate(-50%, calc(-50% - 6px)) rotate(calc(var(--deck-rotate) + var(--deck-tilt)))
      translateX(calc(var(--deck-offset) * 1.04));
  }
}

@media (prefers-reduced-motion: reduce) {
  .deck-card {
    animation: none;
    transform: translate(-50%, -50%) rotate(var(--deck-rotate)) translateX(var(--deck-offset));
  }
  .deck-card:nth-child(2) {
    --deck-transform-hover: translate(-50%, -50%) rotate(-2deg) translateX(0px);
  }
}
</style>
