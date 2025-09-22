<script setup lang="ts">
import { Rocket } from 'lucide-vue-next'
</script>

<template>
  <section class="relative overflow-hidden py-24">
    <!-- мягкие цветовые пятна -->
    <div class="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
      <div class="absolute -top-40 -left-40 size-[50rem] rounded-full bg-gradient-to-tr from-indigo-500/25 to-teal-400/25 blur-3xl"></div>
      <div class="absolute -bottom-40 -right-40 size-[50rem] rounded-full bg-gradient-to-tr from-fuchsia-500/25 to-sky-400/25 blur-3xl"></div>
    </div>
    <StarfieldCanvas class="absolute inset-0 -z-10 opacity-30" />

    <div class="container">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 420 } }"
        class="mx-auto max-w-3xl text-center"
      >
        <div class="mx-auto mb-6 w-14 h-14 grid place-items-center rounded-2xl border bg-white/70 backdrop-blur">
          <Rocket class="w-6 h-6" />
        </div>

        <h1 class="relative inline-block text-4xl font-semibold tracking-tight">
          Nuxt 4 стартовал
          <!-- движущаяся «подчёркивающая» полоса -->
          <span
            aria-hidden="true"
            class="absolute left-1/2 -bottom-2 h-1 w-[220px] -translate-x-1/2 rounded-full
                   [background:repeating-linear-gradient(90deg,theme(colors.indigo.500),theme(colors.teal.400)_50%,theme(colors.fuchsia.500)_100%)]
                   animate-[stripe_6s_linear_infinite]"
          />
        </h1>

        <p class="opacity-70 mt-3">Tailwind и анимации уже на месте.</p>

        <div class="mt-8 flex items-center justify-center gap-3">
          <NuxtLink to="/astro" class="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition">Астропрогноз</NuxtLink>
          <NuxtLink to="/tarot" class="px-4 py-2 rounded-xl border hover:bg-gray-100 transition">Таро</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes stripe {
  from { background-position: 0 0; }
  to   { background-position: 100% 0; }
}
</style>