<script setup lang="ts">
import { Sparkles, ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <section class="relative overflow-hidden pb-28 pt-[140px]">
    <!-- фон -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute left-1/2 top-[-120px] -translate-x-1/2 w-[920px] h-[620px]
                  rounded-[50%] blur-3xl opacity-80
                  bg-[radial-gradient(60%_45%_at_50%_35%,rgba(16,185,129,.28),transparent_60%)]"></div>
      <div class="absolute inset-0 opacity-[.28]
                  bg-[radial-gradient(rgba(255,255,255,.06)_1px,transparent_1px)]
                  [background-size:24px_24px] [background-position:center]"></div>
    </div>

    <div class="container">
      <!-- центрируем блок относительно экрана минуя высоту шапки -->
      <div class="grid min-h-[calc(100svh-64px-80px)] place-items-center">
        <div class="mx-auto max-w-[980px] text-center">
          <h1 class="font-semibold tracking-[-0.02em] leading-[1.10]
                     text-[clamp(40px,6.2vw,88px)]">
            Unlock Your
            <span class="bg-clip-text text-transparent
                         bg-[linear-gradient(90deg,#7C5CFF,#52A7FF,#3EE5C3)]">
              Cosmic
            </span><br/>Destiny
          </h1>

          <p class="mt-7 text-[clamp(16px,1.6vw,20px)] leading-relaxed text-white/70">
            Discover the ancient wisdom of the stars with personalized astrology
            readings that illuminate your path forward.
          </p>

          <div class="mt-10 flex items-center justify-center gap-10">
            <NuxtLink to="/start"
              class="inline-flex items-center gap-2 px-7 h-[56px] md:h-[68px]
                     rounded-[28px] md:rounded-[34px] text-[15px] md:text-[16px]
                     font-semibold text-white transition hover:brightness-110 active:translate-y-px
                     bg-[linear-gradient(90deg,#8B5CF6,#9E5AF6,#EC4899)]
                     shadow-[0_22px_44px_-16px_rgba(236,72,153,.45)]">
              <Sparkles class="w-5 h-5"/>
              Start Your Journey
            </NuxtLink>

            <button type="button" class="inline-flex items-center gap-2 text-[16px] text-white/80 hover:text-white">
              Explore Services
              <ChevronDown class="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
