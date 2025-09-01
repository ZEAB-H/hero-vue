<!-- HeroApp.vue -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import HeroModel from './components/HeroModel.vue'
import HeroCard from './components/HeroCard.vue'
import { useHeroes, type Hero } from './composables/useHeroes'

const {
  heroes,
  loading,
  error,
  heroCount,
  averageAge,
  youngestHero,
  fetchHeroes,
  deleteHero: deleteHeroApi,
  createHero,
  updateHero,
  clearError,
} = useHeroes()

const showModal = ref(false)
const selectedHero = ref<Hero | null>(null)
const searchQuery = ref('')

const deleteHero = async (id: number) => {
  const success = await deleteHeroApi(id)
  if (!success) {
    alert('Failed to delete hero')
  }
}

const handleSave = async (hero: Hero) => {
  let success = false

  if (selectedHero.value?.id) {
    // Update existing hero
    const result = await updateHero(selectedHero.value.id, {
      name: hero.name,
      age: hero.age,
      secret_name: hero.secret_name,
    })
    success = !!result
  } else {
    // Create new hero
    const result = await createHero({
      name: hero.name,
      age: hero.age,
      secret_name: hero.secret_name,
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

onMounted(fetchHeroes)
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <header
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-indigo-700">🦸 Heroes CRUD</h1>
        <div class="text-sm text-gray-600 mt-1">
          {{ heroCount }} heroes total
          <span v-if="averageAge > 0"> • Average age: {{ averageAge }}</span>
          <span v-if="youngestHero"> • Youngest: {{ youngestHero.name }}</span>
        </div>
      </div>
      <button
        @click="
          () => {
            selectedHero = null
            showModal = true
          }
        "
        class="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition-colors"
      >
        + Add Hero
      </button>
    </header>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search heroes by name or secret identity..."
        class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- Error Toast -->
    <div
      v-if="error"
      class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex justify-between items-center"
    >
      <span>{{ error }}</span>
      <button @click="clearError" class="text-red-800 hover:text-red-900">✕</button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
      ></div>
      <p class="text-gray-500 mt-2">Loading heroes...</p>
    </div>

    <!-- Heroes Grid -->
    <div
      v-else-if="filteredHeroes.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <HeroCard
        v-for="hero in filteredHeroes"
        :key="hero.id"
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

    <!-- Empty State -->
    <div v-else-if="!loading" class="text-center py-12">
      <div class="text-6xl mb-4">🦸‍♂️</div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">
        {{ searchQuery ? 'No heroes found' : 'No heroes yet' }}
      </h3>
      <p class="text-gray-500 mb-4">
        {{ searchQuery ? 'Try a different search term' : 'Add your first hero to get started' }}
      </p>
      <button
        v-if="!searchQuery"
        @click="
          () => {
            selectedHero = null
            showModal = true
          }
        "
        class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Add Your First Hero
      </button>
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

<style scoped></style>
