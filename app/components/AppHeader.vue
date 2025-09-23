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
    <div class="px-[24px]">
      <div
        class="mx-auto h-[64px] max-w-[1180px] flex items-center rounded-full
               border border-white/10 bg-[rgba(20,21,26,.80)] backdrop-blur
               shadow-[0_12px_28px_rgba(0,0,0,.45),_inset_0_1px_0_rgba(255,255,255,.06)]">
        <NuxtLink to="/" class="flex items-center gap-2 pl-4 pr-3 py-2">
          <Star class="w-4 h-4 text-violet-300"/>
          <span class="text-[16px] font-semibold text-white/95">Cosmic</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center mx-6 gap-[40px] text-[16px] text-white/80">
          <NuxtLink v-for="i in nav" :key="i.to" :to="i.to"
            class="hover:text-white transition-colors" active-class="text-white">{{ i.label }}</NuxtLink>
        </nav>

        <div class="ml-auto pr-3">
          <NuxtLink to="/get"
            class="inline-flex items-center rounded-full px-6 py-2.5 text-[15px] font-semibold text-white
                   transition hover:brightness-110 active:translate-y-px
                   bg-[linear-gradient(90deg,#8B5CF6,#9E5AF6,#EC4899)]
                   shadow-[0_22px_44px_-16px_rgba(236,72,153,.45)]">
            Get Reading
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
