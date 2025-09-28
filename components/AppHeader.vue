<template>
  <header ref="headerEl" :class="headerClasses">
    <nav class="container mx-auto px-4">
      <div :class="pillClasses">
        <a href="#hero" class="flex items-center gap-3 text-text-base focus-cosmic">
          <span class="sr-only">Cosmic home</span>
          <div class="relative flex h-10 w-10 items-center justify-center">
            <Star class="h-8 w-8 text-violet" fill="currentColor" />
            <div class="absolute inset-0 animate-pulse">
              <Star class="h-8 w-8 text-magenta opacity-50" />
            </div>
          </div>
          <span class="font-heading text-xl font-bold">Cosmic</span>
        </a>

        <div class="hidden items-center space-x-6 md:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.name"
            class="relative group rounded-full px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-200 ease-[var(--ease-cosmic)] hover:text-text-base focus-cosmic"
            :class="{ 'text-text-base': activeSection === item.href }"
            :to="item.href"
            :aria-current="activeSection === item.href ? 'page' : undefined"
            @click="handleNavSelect(item.href)"
          >
            <span>{{ item.name }}</span>
            <span
              class="pointer-events-none absolute -bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 origin-center rounded-full bg-gradient-to-r from-violet via-magenta to-magenta opacity-0 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-300 ease-[var(--ease-cosmic)] group-hover:left-0 group-hover:w-full group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:left-0 group-focus-visible:w-full group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              :class="{ 'left-0 w-full translate-x-0 opacity-100': activeSection === item.href }"
            />
          </NuxtLink>
        </div>

        <div class="hidden md:block">
          <a href="#readings" class="btn-cosmic text-sm">
            Get Reading
          </a>
        </div>

        <button
          @click="toggleMenu"
          class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass-surface glass-hover focus-cosmic transition-transform duration-200 hover:scale-110"
          aria-label="Toggle menu"
        >
          <component :is="isMenuOpen ? XIcon : MenuIcon" class="h-5 w-5 text-text-base" />
        </button>
      </div>

      <transition name="fade">
        <div
          v-if="isMenuOpen"
          class="md:hidden mt-4 rounded-2xl glass-surface p-6 backdrop-blur-xl shadow-glass"
        >
          <nav class="space-y-4">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              class="block rounded-lg px-4 py-3 text-text-base transition-colors duration-200 hover:bg-surface/60 hover:text-white focus-cosmic"
              @click="handleNavSelect(item.href)"
            >
              {{ item.name }}
            </a>
            <div class="border-t border-white/10 pt-4">
              <a href="#readings" class="btn-cosmic w-full" @click="closeMenu">
                Get Reading
              </a>
            </div>
          </nav>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Menu as MenuIcon, Star, X as XIcon } from 'lucide-vue-next'

const navItems = [
  { name: 'Readings', href: '#readings' },
  { name: 'Zodiac', href: '#zodiac' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
]

const headerEl = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref<string | null>(null)
let scrollHandler: (() => void) | null = null
let sectionObserver: IntersectionObserver | null = null
let resizeHandler: (() => void) | null = null

const headerClasses = computed(() => [
  'fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ease-[var(--ease-cosmic)]',
  isScrolled.value ? 'py-3' : 'py-5',
])

const pillClasses = computed(() => [
  'glass-hover flex items-center justify-between gap-4 rounded-full border border-white/10 px-6 transition-[padding,box-shadow,background-color,filter,ring-color] duration-300 ease-[var(--ease-cosmic)] backdrop-blur-xl supports-[backdrop-filter:none]:backdrop-blur-0 supports-[backdrop-filter:none]:bg-[color:hsl(var(--surface)/0.88)] ring-1 ring-transparent',
  isScrolled.value
    ? 'bg-[color:hsl(var(--surface)/0.72)] py-2 shadow-[0_18px_45px_rgba(14,16,26,0.32)] ring-white/5'
    : 'bg-[color:hsl(var(--surface)/0.55)] py-4 shadow-none ring-transparent',
])

const setHeaderHeight = () => {
  if (typeof window === 'undefined') return
  requestAnimationFrame(() => {
    const height = headerEl.value?.offsetHeight ?? 0
    document.documentElement.style.setProperty('--header-height', `${height}px`)
  })
}

function isSectionEntry(
  entry: IntersectionObserverEntry,
): entry is IntersectionObserverEntry & { target: HTMLElement } {
  return entry.target instanceof HTMLElement
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function handleNavSelect(href: string) {
  activeSection.value = href
  closeMenu()
}

watch(isMenuOpen, () => setHeaderHeight())

onMounted(() => {
  if (typeof window === 'undefined') return

  const onScroll = () => {
    isScrolled.value = window.scrollY > 20
    setHeaderHeight()
  }
  scrollHandler = onScroll
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  setHeaderHeight()
  resizeHandler = () => setHeaderHeight()
  window.addEventListener('resize', resizeHandler)

  const initialHash = window.location.hash
  if (initialHash && navItems.some((item) => item.href === initialHash)) {
    activeSection.value = initialHash
  }

  const sections = navItems
    .map((item) => {
      const target = document.querySelector(item.href)
      return target instanceof HTMLElement ? target : null
    })
    .filter((section): section is HTMLElement => Boolean(section))

  if (sections.length) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        if (window.scrollY <= 20) {
          activeSection.value = null
          return
        }
        const visible = entries
          .filter(isSectionEntry)
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const [topEntry] = visible
          if (topEntry) {
            activeSection.value = `#${topEntry.target.id}`
          }
        } else if (window.scrollY <= 20) {
          activeSection.value = null
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.2, 0.4, 0.6] },
    )
    sections.forEach((section) => sectionObserver?.observe(section))
  }
})

onBeforeUnmount(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  sectionObserver?.disconnect()
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--header-height')
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
