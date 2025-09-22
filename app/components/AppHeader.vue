<script setup lang="ts">
import { Star } from 'lucide-vue-next'

const nav = [
  { to:'/astro',    label:'Readings' },
  { to:'/zodiac',   label:'Zodiac'   },
  { to:'/services', label:'Services' },
  { to:'/about',    label:'About'    },
]
</script>

<template>
  <header class="sticky top-6 z-50">
    <div class="container">
      <div
        class="mx-auto flex items-center rounded-full border border-white/10
               bg-[rgba(20,21,26,.80)] backdrop-blur"
        :style="{height:'var(--hdr-h)',maxWidth:'var(--hdr-max)',boxShadow:'var(--hdr-shadow)'}"
      >
        <!-- бренд -->
        <NuxtLink to="/" class="flex items-center gap-2 pl-4 pr-3 py-2">
          <Star class="w-4 h-4 text-violet-300"/>
          <span class="text-[16px] font-semibold text-white/95">Cosmic</span>
        </NuxtLink>

        <!-- меню по центру -->
        <nav class="hidden md:flex items-center mx-6 text-white/80 text-[16px]" :style="{gap:'var(--hdr-gap)'}">
          <NuxtLink v-for="i in nav" :key="i.to" :to="i.to"
            class="hover:text-white transition-colors" active-class="text-white">{{ i.label }}</NuxtLink>
        </nav>

        <div class="ml-auto pr-3">
          <NuxtLink to="/get"
            class="inline-flex items-center rounded-full px-6 py-2.5 text-[15px] font-semibold text-white
                   transition hover:brightness-110 active:translate-y-px"
            :style="{background:'var(--cta-grad)',boxShadow:'var(--cta-glow)'}">
            Get Reading
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>