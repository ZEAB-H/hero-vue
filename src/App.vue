<!-- HeroApp.vue -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import HeroModel from './components/HeroModel.vue'
import HeroCard from './components/HeroCard.vue'
import LandingPage from './components/LandingPage.vue'
import { useHeroes, type Hero } from './composables/useHeroes'
import { useTheme } from './composables/useTheme'
import { useHeroImages } from './composables/useHeroImages'

const {
  heroes,
  loading,
  error,
  heroCount,
  averageAge,
  youngestHero,
  oldestHero,
  fetchHeroes,
  deleteHero: deleteHeroApi,
  createHero,
  updateHero,
  clearError,
  addSampleHeroes,
} = useHeroes()

const { isDark, toggleTheme } = useTheme()
const { clearAllImages } = useHeroImages()

const currentView = ref<'landing' | 'app'>('landing')
const showModal = ref(false)
const selectedHero = ref<Hero | null>(null)
const searchQuery = ref('')

const deleteHero = async (id: number) => {
  if (confirm('Are you sure you want to delete this hero?')) {
    const success = await deleteHeroApi(id)
    if (!success) {
      alert('Failed to delete hero')
    }
  }
}

const handleSave = async (hero: Hero) => {
  let success = false

  if (hero.id && selectedHero.value?.id) {
    // Update existing hero
    const result = await updateHero(hero.id, {
      name: hero.name,
      age: hero.age,
      secret_name: hero.secret_name,
      imageUrl: hero.imageUrl,
    })
    success = !!result
  } else {
    // Create new hero
    const result = await createHero({
      name: hero.name,
      age: hero.age,
      secret_name: hero.secret_name,
      imageUrl: hero.imageUrl,
    })
    success = !!result
  }

  if (success) {
    showModal.value = false
    selectedHero.value = null
  } else {
    alert('Failed to save hero')
  }
}

const filteredHeroes = computed(() => {
  if (!searchQuery.value.trim()) return heroes.value

  const query = searchQuery.value.toLowerCase()
  return heroes.value.filter(
    (hero) =>
      hero.name.toLowerCase().includes(query) || hero.secret_name.toLowerCase().includes(query),
  )
})

const enterApp = () => {
  currentView.value = 'app'
  fetchHeroes()
}

const goToLanding = () => {
  currentView.value = 'landing'
  clearAllImages() // Clear cached images when leaving app
}

const addSampleData = () => {
  addSampleHeroes()
}

// Initialize app
onMounted(() => {
  // App will start on landing page
})
</script>

<template>
  <!-- Landing Page -->
  <LandingPage v-if="currentView === 'landing'" @enter-app="enterApp" />

  <!-- Main App -->
  <div v-else class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
    <!-- Navigation -->
    <nav
      class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
    >
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              @click="goToLanding"
              class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span class="font-medium">Back to Home</span>
            </button>

            <div class="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            <div class="flex items-center space-x-2">
              <div class="text-2xl">🦸‍♂️</div>
              <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400">HeroVault</span>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Stats -->
            <div
              class="hidden md:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300"
            >
              <span class="flex items-center space-x-1">
                <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{
                  heroCount
                }}</span>
                <span>Heroes</span>
              </span>
              <span v-if="averageAge > 0" class="flex items-center space-x-1">
                <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{
                  averageAge
                }}</span>
                <span>Avg Age</span>
              </span>
            </div>

            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <svg
                v-if="isDark"
                class="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>

            <!-- Add Hero Button -->
            <button
              @click="
                () => {
                  selectedHero = null
                  showModal = true
                }
              "
              class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span class="hidden sm:inline">Add Hero</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative max-w-md mx-auto">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              class="h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search heroes by name or secret identity..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          />
          <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              @click="searchQuery = ''"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Error Toast -->
      <div v-if="error" class="mb-6 max-w-md mx-auto">
        <div
          class="p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 rounded-xl flex justify-between items-center"
        >
          <span>{{ error }}</span>
          <button
            @click="clearError"
            class="text-red-800 dark:text-red-300 hover:text-red-900 dark:hover:text-red-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"
        ></div>
        <p class="text-gray-600 dark:text-gray-300 mt-4 text-lg">Loading your heroes...</p>
      </div>

      <!-- Heroes Grid -->
      <div
        v-else-if="filteredHeroes.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="(hero, index) in filteredHeroes"
          :key="hero.id"
          class="animate-fade-in-up"
          :style="`animation-delay: ${index * 50}ms`"
        >
          <HeroCard
            :hero="hero"
            @edit="
              (h) => {
                selectedHero = h
                showModal = true
              }
            "
            @delete="deleteHero"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-8xl mb-6">🦸‍♂️</div>
        <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {{ searchQuery ? 'No heroes found' : 'No heroes yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {{
            searchQuery
              ? 'Try searching with different keywords or clear your search.'
              : 'Ready to assemble your superhero team? Add your first hero to get started!'
          }}
        </p>
        <div class="space-y-4">
          <button
            v-if="!searchQuery"
            @click="
              () => {
                selectedHero = null
                showModal = true
              }
            "
            class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Your First Hero</span>
            </span>
          </button>
          <button
            v-else
            @click="searchQuery = ''"
            class="px-6 py-3 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <HeroModel
      v-if="showModal"
      :hero="selectedHero"
      @close="
        () => {
          showModal = false
          selectedHero = null
        }
      "
      @saved="handleSave"
    />
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
