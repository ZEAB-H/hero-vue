import { ref, computed } from 'vue'

export interface Hero {
  id: number
  name: string
  age?: number
  secret_name: string
}

export interface CreateHeroPayload {
  name: string
  age?: number
  secret_name: string
}

const BASE_URL = 'http://localhost:8000'

export function useHeroes() {
  const heroes = ref<Hero[]>([])
  const loading = ref(false)
  const error = ref('')

  // Computed properties for enhanced functionality
  const heroCount = computed(() => heroes.value.length)
  const averageAge = computed(() => {
    const heroesWithAge = heroes.value.filter((h) => h.age)
    if (heroesWithAge.length === 0) return 0
    return Math.round(
      heroesWithAge.reduce((sum, h) => sum + (h.age || 0), 0) / heroesWithAge.length,
    )
  })

  const youngestHero = computed(() => {
    return heroes.value
      .filter((h) => h.age)
      .reduce(
        (youngest, current) => (!youngest || current.age! < youngest.age! ? current : youngest),
        null as Hero | null,
      )
  })

  // API Methods with better error handling
  const fetchHeroes = async (): Promise<void> => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${BASE_URL}/heroes/`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      heroes.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch heroes'
      console.error('Fetch heroes error:', err)
    } finally {
      loading.value = false
    }
  }

  const createHero = async (payload: CreateHeroPayload): Promise<Hero | null> => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${BASE_URL}/heroes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Failed to create hero: ${response.statusText}`)
      }

      const newHero = await response.json()
      heroes.value.push(newHero)
      return newHero
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create hero'
      console.error('Create hero error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const updateHero = async (id: number, payload: CreateHeroPayload): Promise<Hero | null> => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${BASE_URL}/heroes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Failed to update hero: ${response.statusText}`)
      }

      const updatedHero = await response.json()
      const index = heroes.value.findIndex((h) => h.id === id)
      if (index !== -1) {
        heroes.value[index] = updatedHero
      }
      return updatedHero
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update hero'
      console.error('Update hero error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteHero = async (id: number): Promise<boolean> => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${BASE_URL}/heroes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete hero: ${response.statusText}`)
      }

      heroes.value = heroes.value.filter((h) => h.id !== id)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete hero'
      console.error('Delete hero error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Utility methods
  const findHeroById = (id: number): Hero | undefined => {
    return heroes.value.find((h) => h.id === id)
  }

  const searchHeroes = (query: string): Hero[] => {
    if (!query.trim()) return heroes.value

    const lowercaseQuery = query.toLowerCase()
    return heroes.value.filter(
      (hero) =>
        hero.name.toLowerCase().includes(lowercaseQuery) ||
        hero.secret_name.toLowerCase().includes(lowercaseQuery),
    )
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    // State
    heroes,
    loading,
    error,

    // Computed
    heroCount,
    averageAge,
    youngestHero,

    // Methods
    fetchHeroes,
    createHero,
    updateHero,
    deleteHero,
    findHeroById,
    searchHeroes,
    clearError,
  }
}
