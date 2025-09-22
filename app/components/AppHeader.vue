<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next' // иконки как Vue-компоненты (tree-shakable) :contentReference[oaicite:2]{index=2}

const nav = [
  { label: 'Cosmic',   to: '/' },
  { label: 'Readings', to: '/astro' },
  { label: 'Zodiac',   to: '/lunar' },
  { label: 'Services', to: '/tarot' },
  { label: 'About',    to: '/about' },
]
</script>

<template>
  <!-- фиксированная пилюля по центру -->
  <header class="fixed left-1/2 top-4 z-50 -translate-x-1/2">
    <div
      class="flex items-center rounded-full border backdrop-blur-xl"
      :style="{
        height: 'var(--hdr-h)',
        background: 'var(--hdr-bg)',
        borderColor: 'var(--hdr-ring)',
        paddingInline: 'var(--hdr-pad-x)',
        boxShadow: 'var(--hdr-shadow)'
      }"
    >
      <!-- бренд -->
      <NuxtLink to="/" class="flex items-center gap-2 px-2 py-1 text-white/90">
        <Sparkles class="w-4 h-4 text-violet-300" />
        <span class="text-[14px] font-semibold tracking-wide">Cosmic</span>
      </NuxtLink>

      <!-- навигация по центру -->
      <nav class="hidden md:flex items-center mx-4" :style="{ gap: 'var(--hdr-gap)' }">
        <NuxtLink
          v-for="i in nav" :key="i.to" :to="i.to"
          class="text-[14px] text-white/75 hover:text-white transition"
          active-class="text-white"
        >
          {{ i.label }}
        </NuxtLink>
      </nav>

      <!-- разделитель и CTA справа -->
      <div class="grow"></div>
      <NuxtLink
        to="/astro"
        class="rounded-full px-4 py-2 text-[14px] font-medium text-white transition hover:brightness-110 active:translate-y-px"
        :style="{ background: 'var(--cta-grad)', boxShadow: 'var(--cta-glow)' }"
      >
        Get Reading
      </NuxtLink>
    </div>
  </header>
</template>