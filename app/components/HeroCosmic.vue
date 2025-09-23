<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
</script>

<template>
  <section class="relative">
    <!-- мягкая бирюзовая аура -->
    <div
      class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[520px] w-[920px] rounded-[520px] blur-[80px]"
      style="background: radial-gradient(closest-side, rgba(16,196,172,.22), rgba(16,196,172,0));"
    />

    <div class="container pt-[var(--hero-pt)] pb-20">
      <div class="max-w-[920px] mx-auto text-center">
        <!-- H1 -->
        <h1 class="text-white font-extrabold leading-[var(--h1-lh)] tracking-[-0.02em] text-[var(--h1)]">
          Unlock Your
          <span
            class="bg-gradient-to-r from-[#8b5cf6] via-[#6b8efb] to-[#22d3ee] bg-clip-text text-transparent"
          >Cosmic</span>
          <br />
          Destiny
        </h1>

        <!-- Lead -->
        <p class="mt-6 text-lg text-white/70">
          Discover the ancient wisdom of the stars with personalized astrology
          readings that illuminate your path forward.
        </p>

        <!-- CTA row -->
        <div class="mt-10 flex items-center justify-center gap-6">
          <NuxtLink
            to="/readings"
            class="inline-flex items-center gap-2 rounded-full px-7 h-[56px] text-[15px] font-semibold text-white"
            style="background: var(--cta-grad); box-shadow: var(--cta-glow);"
          >
            <Sparkles size="18" />
            Start Your Journey
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors text-[15px]"
          >
            Explore Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="opacity-80"><path d="M8 10l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
