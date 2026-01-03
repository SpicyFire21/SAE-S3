<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  values: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "line" // line | bar | pie | doughnut
  }
})

const canvas = ref(null)
let chart = null

function render() {
  if (chart) chart.destroy()

  chart = new Chart(canvas.value, {
    type: props.type,
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          data: props.values,
          borderWidth: 2,
          tension: 0.4
        }
      ]
    }
  })
}

onMounted(render)

watch(() => [props.labels, props.values, props.type], render, {
  deep: true
})

onBeforeUnmount(() => chart?.destroy())
</script>
