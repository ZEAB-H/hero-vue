import { ref, computed } from 'vue'

export interface Hero {
  id: number
  name: string
  age?: number
  secret_name: string
  imageUrl?: string
  createdAt: number
  updatedAt: number
}

export interface CreateHeroPayload {
  name: string
  age?: number
  secret_name: string
  imageUrl?: string
}

const STORAGE_KEY = 'heroVault_heroes'

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

  const oldestHero = computed(() => {
    return heroes.value
      .filter((h) => h.age)
      .reduce(
        (oldest, current) => (!oldest || current.age! > oldest.age! ? current : oldest),
        null as Hero | null,
      )
  })

  // Local Storage Methods
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(heroes.value))
    } catch (err) {
      console.error('Failed to save heroes to localStorage:', err)
      error.value = 'Failed to save data locally'
    }
  }

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        heroes.value = JSON.parse(stored)
      }
    } catch (err) {
      console.error('Failed to load heroes from localStorage:', err)
      error.value = 'Failed to load saved data'
    }
  }

  // CRUD Methods with local storage
  const fetchHeroes = async (): Promise<void> => {
    loading.value = true
    error.value = ''

    try {
      // Simulate network delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))
      loadFromStorage()
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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const now = Date.now()
      const newHero: Hero = {
        id: now, // Use timestamp as ID
        name: payload.name,
        age: payload.age,
        secret_name: payload.secret_name,
        imageUrl: payload.imageUrl,
        createdAt: now,
        updatedAt: now,
      }

      heroes.value.push(newHero)
      saveToStorage()
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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const index = heroes.value.findIndex((h) => h.id === id)
      if (index === -1) {
        throw new Error('Hero not found')
      }

      const updatedHero: Hero = {
        ...heroes.value[index],
        name: payload.name,
        age: payload.age,
        secret_name: payload.secret_name,
        imageUrl: payload.imageUrl,
        updatedAt: Date.now(),
      }

      heroes.value[index] = updatedHero
      saveToStorage()
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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 200))

      const initialLength = heroes.value.length
      heroes.value = heroes.value.filter((h) => h.id !== id)

      if (heroes.value.length === initialLength) {
        throw new Error('Hero not found')
      }

      saveToStorage()
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

  const clearAllHeroes = () => {
    heroes.value = []
    saveToStorage()
  }

  // Add some sample heroes for demo
  const addSampleHeroes = async () => {
    const sampleHeroes: CreateHeroPayload[] = [
      {
        name: 'Superman',
        age: 35,
        secret_name: 'Clark Kent',
      },
      {
        name: 'Wonder Woman',
        age: 3000,
        secret_name: 'Diana Prince',
      },
      {
        name: 'Batman',
        age: 42,
        secret_name: 'Bruce Wayne',
      },
    ]

    for (const hero of sampleHeroes) {
      await createHero(hero)
    }
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
    oldestHero,

    // Methods
    fetchHeroes,
    createHero,
    updateHero,
    deleteHero,
    findHeroById,
    searchHeroes,
    clearError,
    clearAllHeroes,
    addSampleHeroes,
  }
}
