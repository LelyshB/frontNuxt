<script setup lang="ts">
import { Star } from 'lucide-vue-next'

const nav = [
  { to: '/readings', label: 'Readings' },
  { to: '/zodiac',   label: 'Zodiac'   },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About'    },
]
</script>

<template>
  <header class="pt-6">
    <div class="container">
      <div
        class="mx-auto rounded-full border shadow
               flex items-center justify-between px-4"
        style="
          height: var(--header-h);
          background: var(--header-bg);
          border-color: var(--header-ring);
          border-width: 1px;
          box-shadow: 0 10px 30px -15px rgba(0,0,0,.60);
        "
      >
        <!-- Бренд слева -->
        <NuxtLink to="/" class="flex items-center gap-2 text-white/90">
          <span class="inline-grid place-items-center w-6 h-6 rounded-full"
                style="background: rgba(139,92,246,.25)">
            <Star class="w-3.5 h-3.5" style="color:#c4b5fd" />
          </span>
          <span class="font-semibold">Cosmic</span>
        </NuxtLink>

        <!-- Центр: навигация -->
        <nav class="hidden md:flex items-center gap-8 text-[15px] text-white/70">
          <NuxtLink v-for="i in nav" :key="i.to" :to="i.to"
                    class="hover:text-white transition">{{ i.label }}</NuxtLink>
        </nav>

        <!-- Справа: CTA -->
        <NuxtLink to="/readings"
          class="text-sm font-medium text-white px-5 py-2 rounded-full transition"
          style="
            background: linear-gradient(90deg,var(--grad-from),var(--grad-via),var(--grad-to));
            box-shadow: var(--grad-shadow);
          ">
          Get Reading
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
