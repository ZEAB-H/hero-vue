<script setup lang="ts">
defineProps<{
  hero: { id: number; name: string; age?: number; secret_name: string }
}>()

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="p-4 border rounded-lg shadow hover:shadow-md transition">
    <h2 class="text-xl font-semibold">{{ hero.name }}</h2>
    <p class="text-sm text-gray-600">Secret: {{ hero.secret_name }}</p>
    <p class="text-sm text-gray-500">Age: {{ hero.age || 'N/A' }}</p>
    <div class="flex gap-2 mt-4">
      <button
        @click="emit('edit', hero)"
        class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        @click="emit('delete', hero.id)"
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>
