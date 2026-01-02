<template>
  <div class="w-full">
    <editor-menu-bar v-if="editor" :editor="editor" class="mb-4"/>
    <editor-content class="border border-gray-200 p-4 rounded-lg shadow-inner min-h-[150px]" :editor="editor"/>

    <div class="mt-4 flex justify-end gap-3">
      <button @click="cancelEdit" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition">Annuler</button>
      <button @click="saveProfile" class="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">Sauvegarder</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { defineEmits, defineProps } from "vue";
import EditorMenuBar from './EditorMenuBar.vue';

const props = defineProps({
  initialContent: { type: String, default: '' }
});
const emit = defineEmits(['saved', 'cancel']);

const editor = ref(new Editor({
  extensions: [StarterKit],
  content: props.initialContent,
}));

const saveProfile = () => {
  emit('saved', editor.value.getHTML());
};

const cancelEdit = () => {
  editor.value.commands.setContent(props.initialContent);
  emit('cancel');
};

onBeforeUnmount(() => editor.value.destroy());

watch(() => props.initialContent, (newVal) => {
  if (editor.value) editor.value.commands.setContent(newVal);
});
</script>

<style>
.editor-content {
  min-height: 150px;
}
</style>
