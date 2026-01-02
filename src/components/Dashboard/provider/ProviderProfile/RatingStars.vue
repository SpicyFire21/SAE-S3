<template>
  <div class="flex items-center justify-center">
    <template v-for="i in 5" :key="i">
      <svg
          v-if="i <= Math.floor(average)"
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
      >
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"
        />
      </svg>

      <svg
          v-else-if="i === Math.ceil(average) && average % 1 !== 0"
          class="w-5 h-5"
          viewBox="0 0 20 20"
      >
        <defs>
          <linearGradient id="half-grad">
            <stop offset="50%" stop-color="#FACC15" />
            <stop offset="50%" stop-color="#D1D5DB" />
          </linearGradient>
        </defs>
        <path
            fill="url(#half-grad)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"
        />
      </svg>

      <svg
          v-else
          class="w-5 h-5 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
      >
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"
        />
      </svg>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/index.js";

const props = defineProps({
  userId: {
    type: [String, Number],
    required: true,
  },
});

const userStore = useUserStore();

const average = computed(() => {
  const userNotes = userStore.notes.filter(n => n.userId === props.userId);
  if (!userNotes.length) return 0;
  const sum = userNotes.reduce((acc, n) => acc + Number(n.value), 0);
  return sum / userNotes.length;
});
</script>
