<script setup lang="ts">
const nav = [
  { label: 'Readings', to: '/astro' },
  { label: 'Zodiac',   to: '/lunar' },
  { label: 'Services', to: '/tarot' },
  { label: 'About',    to: '/about' },
]
</script>

<template>
  <!-- «пилюля» фиксирована сверху по центру -->
  <header class="fixed left-1/2 top-4 z-50 -translate-x-1/2">
    <div
      class="flex h-14 items-center gap-6 rounded-full
             border border-white/10 bg-[#14151a]/80 px-4 pl-3 pr-2
             shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_8px_24px_rgba(0,0,0,.45)]
             backdrop-blur-xl">
      <!-- логотип -->
      <NuxtLink to="/" class="flex items-center gap-2 rounded-full px-2 py-1">
        <span class="i-lucide-sparkles h-4 w-4 text-violet-400"></span>
        <span class="text-sm font-medium tracking-wide text-white/90">Cosmic</span>
      </NuxtLink>

      <!-- навигация -->
      <nav class="hidden md:flex items-center gap-6 text-[13px] text-white/80">
        <NuxtLink
          v-for="item in nav" :key="item.to" :to="item.to"
          class="transition hover:text-white/95"
          active-class="text-white"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="grow"></div>

      <!-- CTA -->
      <NuxtLink
        to="/astro"
        class="rounded-full px-4 py-2 text-sm font-medium text-white
               bg-gradient-to-r from-[#845EF7] via-[#A15CF7] to-[#FF7AB3]
               shadow-[0_6px_22px_rgba(168,78,255,.35)]
               transition hover:brightness-110 active:translate-y-px"
      >
        Get Reading
      </NuxtLink>
    </div>
  </header>
</template>