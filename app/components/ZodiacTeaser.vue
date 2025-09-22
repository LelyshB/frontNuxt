<script setup lang="ts">
import { Sun, Moon, Star, Sparkles, Telescope } from 'lucide-vue-next'

type Teaser = { icon: any; title: string; desc: string }
const items: Teaser[] = [
  { icon: Sun,       title: 'Ежедневный прогноз', desc: 'Коротко и по делу для твоего знака' },
  { icon: Moon,      title: 'Лунный ритм',        desc: 'Фазы и влияние на настроение' },
  { icon: Star,      title: 'Совместимость',      desc: 'Быстрая проверка пары' },
  { icon: Sparkles,  title: 'Таро-тизер',         desc: '1-карта на день, аккуратно' },
  { icon: Telescope, title: 'Гороскоп недели',    desc: 'Куда движется тренд' },
]
const enterFor = (i: number) => ({ opacity: 1, y: 0, transition: { delay: 70*i, duration: 280, easing: 'ease-out' }})
</script>

<template>
  <section class="py-14">
    <div class="container">
      <h2 class="text-[28px] font-semibold tracking-tight">Выбери направление</h2>
      <p class="opacity-70 mt-2">Лёгкий пролог вместо сета всех знаков на главной.</p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <UiGlowCard v-for="(it, i) in items" :key="it.title"
          v-motion :initial="{ opacity: 0, y: 18 }" :enter="enterFor(i)">
          <div class="flex items-start gap-4">
            <component :is="it.icon" class="w-6 h-6 mt-1 shrink-0" />
            <div>
              <div class="text-lg font-medium">{{ it.title }}</div>
              <div class="opacity-70 text-sm mt-1">{{ it.desc }}</div>
            </div>
          </div>

          <!-- «выползающие» иконки-ярлыки -->
          <div class="mt-4 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
            <span class="px-2 py-0.5 text-xs rounded-full bg-gray-100">Сегодня</span>
            <span class="px-2 py-0.5 text-xs rounded-full bg-gray-100">Неделя</span>
            <span class="px-2 py-0.5 text-xs rounded-full bg-gray-100">Совместимость</span>
          </div>
        </UiGlowCard>
      </div>
    </div>
  </section>
</template>