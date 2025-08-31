<!-- HeroApp.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroModel from './components/HeroModel.vue'
import HeroCard from './components/HeroCard.vue'

interface Hero {
  id: number
  name: string
  age?: number
  secret_name: string
}

const heroes = ref<Hero[]>([])
const loading = ref(false)
const error = ref('')
const showModal = ref(false)
const selectedHero = ref<Hero | null>(null)

const fetchHeroes = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:8000/heroes/')
    if (!res.ok) throw new Error('Failed to fetch heroes')
    heroes.value = await res.json()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const deleteHero = async (id: number) => {
  try {
    await fetch(`http://localhost:8000/heroes/${id}`, { method: 'DELETE' })
    heroes.value = heroes.value.filter((h) => h.id !== id)
  } catch (err) {
    error.value = 'Failed to delete hero'
  }
}

const handleSave = (hero: Hero) => {
  if (selectedHero.value) {
    const index = heroes.value.findIndex((h) => h.id === hero.id)
    if (index !== -1) heroes.value[index] = hero
  } else {
    heroes.value.push(hero)
  }
  showModal.value = false
  selectedHero.value = null
}

onMounted(fetchHeroes)
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-indigo-700">🦸 Heroes CRUD</h1>
      <button
        @click="
          () => {
            selectedHero = null
            showModal = true
          }
        "
        class="bg-indigo-600 text-white px-4 py-2 rounded shadow"
      >
        + Add Hero
      </button>
    </header>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <HeroCard
        v-for="hero in heroes"
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
