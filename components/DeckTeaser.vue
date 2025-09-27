<template>
  <section
    id="readings"
    class="py-16 px-4 scroll-mt-[calc(var(--header-height,0px)+1.5rem)]"
    aria-label="Tarot Preview — Deck Teaser"
  >
    <div class="container mx-auto max-w-5xl">
      <SectionHeader
        subtitle="Tarot Preview"
        title="Deck Teaser"
        description="A quiet three-card fan — hover to flip, focus to pause."
        className="mb-10"
        titleGradient
      />

      <div
        class="group relative mx-auto flex w-full max-w-[720px] select-none items-center justify-center"
      >
        <div class="relative h-[320px] w-full [perspective:1400px]">
          <a
            v-for="card in cards"
            :key="card.id"
            href="/tarot"
            class="deck-card focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950 focus-visible:ring-violet/40"
            :aria-label="`Tarot card: ${card.title}`"
            :style="{
              '--deck-rotate': card.rotate,
              '--deck-offset': card.offset,
              '--deck-tilt': card.tilt,
              '--deck-transform-hover': card.hover,
              '--deck-z': card.zIndex,
            }"
          >
            <GlowCard hover3d class="h-72 w-48 md:h-80 md:w-52">
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
  {
    id: 'far-left',
    title: 'Intuition',
    hint: 'Clarity emerges',
    rotate: '-28deg',
    offset: '-220px',
    tilt: '1.6deg',
    hover: 'translate(-50%, -50%) rotate(-32deg) translateX(-260px)',
    zIndex: '1',
  },
  {
    id: 'left',
    title: 'Focus',
    hint: 'A path reveals',
    rotate: '-18deg',
    offset: '-150px',
    tilt: '1.5deg',
    hover: 'translate(-50%, -50%) rotate(-22deg) translateX(-190px)',
    zIndex: '2',
  },
  {
    id: 'left-mid',
    title: 'Insight',
    hint: 'Truth finds you',
    rotate: '-8deg',
    offset: '-60px',
    tilt: '1.4deg',
    hover: 'translate(-50%, -50%) rotate(-10deg) translateX(-90px) rotateY(-12deg)',
    zIndex: '3',
  },
  {
    id: 'right-mid',
    title: 'Harmony',
    hint: 'Balance is restored',
    rotate: '8deg',
    offset: '60px',
    tilt: '1.4deg',
    hover: 'translate(-50%, -50%) rotate(10deg) translateX(90px) rotateY(12deg)',
    zIndex: '3',
  },
  {
    id: 'right',
    title: 'Destiny',
    hint: 'Your call awaits',
    rotate: '18deg',
    offset: '150px',
    tilt: '1.5deg',
    hover: 'translate(-50%, -50%) rotate(22deg) translateX(190px)',
    zIndex: '2',
  },
  {
    id: 'far-right',
    title: 'Vision',
    hint: 'See beyond now',
    rotate: '28deg',
    offset: '220px',
    tilt: '1.6deg',
    hover: 'translate(-50%, -50%) rotate(32deg) translateX(260px)',
    zIndex: '1',
  },
]
</script>

<style scoped>
.deck-card {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  transform-style: preserve-3d;
  transform: translate(-50%, -50%) rotate(var(--deck-rotate, 0deg)) translateX(var(--deck-offset, 0px));
  transition: transform 0.8s var(--ease-cosmic);
  animation: deck-wiggle 12s ease-in-out infinite;
  z-index: var(--deck-z, 1);
}

.group:hover .deck-card,
.group:focus-within .deck-card {
  animation-play-state: paused;
}

.group:hover .deck-card {
  transform: var(--deck-transform-hover, translate(-50%, -50%) rotate(var(--deck-rotate, 0deg)) translateX(var(--deck-offset, 0px)));
}

@keyframes deck-wiggle {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(var(--deck-rotate, 0deg)) translateX(var(--deck-offset, 0px));
  }
  50% {
    transform: translate(-50%, calc(-50% - 6px)) rotate(calc(var(--deck-rotate, 0deg) + var(--deck-tilt, 0deg)))
      translateX(calc(var(--deck-offset, 0px) * 1.04));
  }
}

@media (prefers-reduced-motion: reduce) {
  .deck-card {
    animation: none;
    transform: translate(-50%, -50%) rotate(var(--deck-rotate, 0deg)) translateX(var(--deck-offset, 0px));
    --deck-transform-hover: translate(-50%, -50%) rotate(var(--deck-rotate, 0deg)) translateX(var(--deck-offset, 0px));
  }
}
</style>
