<script setup lang="ts">
import { Sparkles, ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <section class="relative overflow-hidden py-28 md:py-36">
    <!-- мягкая «аура» -->
    <div class="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
      <div class="absolute left-1/2 top-0 size-[56rem] -translate-x-1/2 rounded-full
                  bg-[radial-gradient(ellipse_at_center,_rgba(67,97,238,.35),_transparent_60%)] blur-3xl"></div>
    </div>

    <!-- мелкие точки фона (если нужен StarfieldCanvas — просто раскомментируй)
    <StarfieldCanvas class="absolute inset-0 -z-10 opacity-25" />
    -->

    <div class="container">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="text-[44px] leading-tight font-semibold tracking-tight md:text-[64px]">
          Unlock Your
          <span
            class="bg-gradient-to-r from-[#7C5CFF] via-[#52A7FF] to-[#3EE5C3]
                   bg-clip-text text-transparent"
          >
            Cosmic
          </span>
          <br class="hidden md:block" />
          Destiny
        </h1>

        <p class="mt-5 text-white/70">
          Discover the ancient wisdom of the stars with personalized astrology
          readings that illuminate your path forward.
        </p>

        <div class="mt-10 flex items-center justify-center gap-6">
          <NuxtLink
            to="/astro"
            class="group inline-flex items-center gap-2 rounded-2xl px-5 py-3
                   text-sm font-medium text-white
                   bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]
                   shadow-[0_10px_30px_rgba(236,72,153,.3)]
                   transition hover:brightness-110 active:translate-y-px"
          >
            <Sparkles class="h-4 w-4" />
            Start Your Journey
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            Explore Services
            <ChevronDown class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>