<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
const rail = ref<HTMLDivElement | null>(null)
const scrollBy = (dx: number) => rail.value?.scrollBy({ left: dx, behavior: 'smooth' })

const items = Array.from({ length: 8 }, (_, i) => ({
  title: `Сервис ${i+1}`, desc: 'Короткое описание', href: '/astro'
}))

// авто-прокрутка (мягко)
let t: number | null = null
onMounted(() => {
  t = window.setInterval(() => scrollBy(280), 3500)
})
</script>

<template>
  <section class="py-10">
    <div class="container">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold">Сервисы</h3>
        <div class="flex gap-2">
          <button class="size-9 grid place-items-center rounded-full border hover:bg-gray-100" @click="scrollBy(-320)">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button class="size-9 grid place-items-center rounded-full border hover:bg-gray-100" @click="scrollBy(320)">
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref="rail"
        class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2
               [-ms-overflow-style:none] [scrollbar-width:none]"
        style="-webkit-overflow-scrolling:touch">
        <div v-for="it in items" :key="it.title" class="min-w-[280px] snap-start">
          <UiGlowCard>
            <div class="text-base font-medium">{{ it.title }}</div>
            <div class="opacity-70 text-sm mt-1">{{ it.desc }}</div>
            <NuxtLink :to="it.href" class="inline-block mt-3 text-sm text-gray-900 underline-offset-4 hover:underline">
              Перейти
            </NuxtLink>
          </UiGlowCard>
        </div>
      </div>
    </div>
  </section>
</template>