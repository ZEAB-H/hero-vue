<script setup lang="ts">
defineProps<{
  hero: { id: number; name: string; age?: number; secret_name: string }
}>()

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div
    class="group p-4 border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:scale-105"
  >
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-2">
        <div
          class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
        >
          {{ hero.name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2
            class="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors"
          >
            {{ hero.name }}
          </h2>
          <p class="text-xs text-gray-500">ID: #{{ hero.id }}</p>
        </div>
      </div>
      <div class="text-right">
        <div class="text-sm font-medium text-indigo-600">🎩 {{ hero.secret_name }}</div>
        <div class="text-xs text-gray-500 mt-1">🎂 {{ hero.age || 'Unknown' }} years</div>
      </div>
    </div>

    <div class="flex gap-2 mt-4 pt-3 border-t border-gray-100">
      <button
        @click="emit('edit', hero)"
        class="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
      >
        ✏️ Edit
      </button>
      <button
        @click="emit('delete', hero.id)"
        class="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
      >
        🗑️ Delete
      </button>
    </div>
  </div>
</template>
