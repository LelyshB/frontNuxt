<script setup lang="ts">
import { Star } from 'lucide-vue-next'

const nav = [
  { to: '/readings', label: 'Readings' },
  { to: '/zodiac',   label: 'Zodiac' },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About' },
]
</script>

<template>
  <header class="pt-6">
    <div class="container">
      <div class="sticky top-6 z-50">
        <div class="mx-auto px-4">
          <div
            class="mx-auto rounded-full border shadow flex items-center justify-between"
            :style="{
              height: 'var(--hdr-h)',
              maxWidth: 'var(--hdr-max)',
              background: 'var(--hdr-bg)',
              borderColor: 'var(--hdr-ring)',
              boxShadow: 'var(--hdr-shadow)'
            }"
          >
            <!-- Лого -->
            <NuxtLink to="/" class="flex items-center gap-2 pl-4 pr-2">
              <Star size="18" class="text-purple-400" />
              <span class="text-[15px] font-semibold text-white/90">Cosmic</span>
            </NuxtLink>

            <!-- Нав -->
            <nav class="flex-1 flex justify-center">
              <ul class="flex items-center gap-[var(--hdr-gap)]">
                <li v-for="item in nav" :key="item.to">
                  <NuxtLink
                    :to="item.to"
                    class="text-[15px] text-white/80 hover:text-white transition-colors"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>

            <!-- CTA справа -->
            <div class="pr-4 pl-2">
              <NuxtLink
                to="/readings"
                class="inline-flex h-9 items-center rounded-full px-4 text-[14px] font-medium text-white"
                style="
                  background: linear-gradient(90deg,#8B5CF6,#D946EF,#EC4899);
                  box-shadow: 0 12px 30px -12px rgba(217,70,239,.55);
                "
              >
                Get Reading
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
