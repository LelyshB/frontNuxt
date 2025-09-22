<script setup lang="ts">
import { Sparkles, ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <section class="relative overflow-hidden pb-28" :style="{paddingTop:'var(--hero-pt)'}">
    <!-- зелёная «аура» и сетка точек -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute left-1/2 top-[-120px] w-[920px] h-[620px] -translate-x-1/2 rounded-[50%] blur-3xl opacity-80
                  bg-[radial-gradient(60%_45%_at_50%_35%,rgba(16,185,129,.28),transparent_60%)]"></div>
      <div class="absolute inset-0 opacity-[.28]
                  bg-[radial-gradient(rgba(255,255,255,.06)_1px,transparent_1px)]
                  [background-size:24px_24px] [background-position:center]"></div>
    </div>

    <div class="container">
      <div class="mx-auto max-w-[980px] text-center text-white">
        <h1 class="font-semibold tracking-tight"
            :style="{fontSize:'var(--h1)',lineHeight:'var(--h1-lh)',letterSpacing:'var(--h1-track)'}">
          Unlock Your
          <span class="bg-clip-text text-transparent
                       bg-[linear-gradient(90deg,#7C5CFF,#52A7FF,#3EE5C3)]">
            Cosmic
          </span><br/>
          Destiny
        </h1>

        <p class="mt-7 text-[20px] leading-relaxed text-white/70 max-w-[920px] mx-auto"
           :style="{color:'var(--lead)'}">
          Discover the ancient wisdom of the stars with personalized astrology readings that illuminate your path forward.
        </p>

        <div class="mt-10 flex items-center justify-center gap-10">
          <NuxtLink to="/start"
            class="inline-flex h-[68px] items-center gap-2 rounded-[34px] px-8 text-[16px] font-semibold text-white
                   transition hover:brightness-110 active:translate-y-px"
            :style="{background:'var(--cta-grad)',boxShadow:'var(--cta-glow)'}">
            <Sparkles class="w-5 h-5"/>
            Start Your Journey
          </NuxtLink>

          <button type="button"
                  class="inline-flex items-center gap-2 text-[16px] text-white/80 hover:text-white">
            Explore Services
            <ChevronDown class="w-4 h-4"/>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>