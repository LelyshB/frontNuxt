<script setup lang="ts">
import { Sparkles, ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Фон: дымка + доты -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 opacity-60"
           style="background: radial-gradient(60% 45% at 50% 0%, var(--aura), transparent 60%);" />
      <div class="absolute inset-0"
           style="
             background-image: radial-gradient(var(--dot) 1px, transparent 1px);
             background-size: var(--dot-size) var(--dot-size);
             background-position: center;
           " />
    </div>

    <div class="container">
      <div class="py-28 text-center text-white/90 max-w-3xl mx-auto">
        <h1 class="font-semibold"
            :style="{ fontSize: 'var(--h1-size)', letterSpacing:'var(--h1-kerning)', lineHeight:'var(--h1-leading)' }">
          Unlock Your
          <span class="bg-clip-text text-transparent"
                style="background: linear-gradient(90deg,#a78bfa,#5eead4,#38bdf8)">
            Cosmic
          </span><br/>
          Destiny
        </h1>

        <p class="mt-6 text-lg leading-relaxed" style="color: var(--subtle)">
          Discover the ancient wisdom of the stars with personalized astrology
          readings that illuminate your path forward.
        </p>

        <div class="mt-10 flex items-center justify-center gap-6">
          <NuxtLink to="/readings"
            class="inline-flex items-center gap-2 text-[15px] font-medium text-white px-6 py-3 rounded-full transition"
            style="background: linear-gradient(90deg,var(--grad-from),var(--grad-via),var(--grad-to)); box-shadow: var(--grad-shadow);">
            <Sparkles class="w-4.5 h-4.5" />
            Start Your Journey
          </NuxtLink>

          <NuxtLink to="/services"
            class="inline-flex items-center gap-2 text-[15px] text-white/80 hover:text-white transition">
            Explore Services
            <ChevronDown class="w-4.5 h-4.5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
