<script setup lang="ts">
import { Sparkles, ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <section class="relative overflow-hidden" :style="{ paddingTop: 'var(--hero-pt)' }">
    <!-- мягкая аура сверху -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute left-1/2 top-[-20%] w-[1200px] h-[800px] -translate-x-1/2
                  rounded-[50%] blur-3xl opacity-70
                  bg-[radial-gradient(60%_45%_at_50%_30%,rgba(34,197,194,.25),transparent_60%)]" />
      <!-- дот-сетка -->
      <div class="absolute inset-0
                  bg-[radial-gradient(rgba(255,255,255,.06)_1px,transparent_1px)]
                  [background-size:24px_24px] [background-position:center]" />
    </div>

    <div class="container text-center text-white">
      <h1
        class="font-semibold tracking-tight"
        :style="{
          fontSize: 'var(--h1-mob)',
          lineHeight: 'var(--h1-lh)',
          letterSpacing: 'var(--h1-track)'
        }"
      >
        <span class="hidden md:inline text-[var(--h1-desk)]"></span>
        Unlock Your
        <span class="bg-clip-text text-transparent
                     bg-[linear-gradient(90deg,#7C5CFF,#52A7FF,#3EE5C3)]">
          Cosmic
        </span><br class="hidden md:block" />
        Destiny
      </h1>

      <p class="mt-6 text-[16px] leading-relaxed" :style="{ color: 'var(--lead)' }">
        Discover the ancient wisdom of the stars with personalized astrology
        readings that illuminate your path forward.
      </p>

      <div class="mt-10 flex items-center justify-center gap-6">
        <NuxtLink
          to="/astro"
          class="inline-flex items-center gap-2 rounded-2xl px-5 py-3
                 text-[14px] font-medium text-white transition hover:brightness-110 active:translate-y-px"
          :style="{ background: 'var(--cta-grad)', boxShadow: 'var(--cta-glow)' }"
        >
          <Sparkles class="w-4 h-4" />
          Start Your Journey
        </NuxtLink>

        <button
          type="button"
          class="inline-flex items-center gap-2 text-[14px] text-white/80 transition hover:text-white"
        >
          Explore Services
          <ChevronDown class="w-4 h-4" />
        </button>
      </div>
    </div>
  </section>
</template>