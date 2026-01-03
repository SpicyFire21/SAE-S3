<template>
  <div class="flex gap-2 mb-2">
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'font-bold': editor.isActive('bold') }">B</button>
    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'italic': editor.isActive('italic') }">I</button>
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'line-through': editor.isActive('strike') }">S</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({ editor: Object });
const editor = props.editor;
</script>

<style>


</style>
