<template>
  <div
      ref="mapContainer"
      class="relative overflow-hidden border shadow-md rounded-lg w-full h-[600px] mt-10 bg-white"
  >
    <svg
        ref="svgMap"
        viewBox="0 0 2048 1952"
        class="w-full h-full"
    >

      <rect class="non-interactive" id="hall1"
            x="1226" y="25" width="797" height="931" />
      <rect class="non-interactive" id="hall2"
            x="1226" y="989" width="797" height="931" />


      <template v-for="stand in standsStore.stands"
      >
        <rect :class="['interactive', getStandStyle(stand.type)]"
            :x="stand.x"
            :y="stand.y"
            :width="stand.width"
            :height="stand.height"></rect>
        <text class="label"
              :x="stand.x + stand.width / 2"
              :y="stand.y + stand.height / 2"
              :font-size="getFontSize(stand.height, stand.type)">{{ stand.name }}</text>


      </template>
<!--            &lt;!&ndash; ========== CINÉMAS ========== &ndash;&gt;-->
<!--            <rect class="interactive cinema"-->
<!--                  x="25" y="32" width="481" height="620"-->
<!--                  @click="openPage('cinema-1')" />-->
<!--            <text class="label"-->
<!--                  :x="25 + 481/2"-->
<!--                  :y="32 + 620/2"-->
<!--                  :font-size="getFontSize(620, 'cinema')">-->
<!--              Cinéma 1-->
<!--            </text>-->

      <!--      <rect class="interactive cinema"-->
      <!--            x="25" y="670" width="481" height="620"-->
      <!--            @click="openPage('cinema-2')" />-->
      <!--      <text class="label"-->
      <!--            :x="25 + 481/2"-->
      <!--            :y="670 + 620/2"-->
      <!--            :font-size="getFontSize(620, 'cinema')">-->
      <!--        Cinéma 2-->
      <!--      </text>-->

      <!--      <rect class="interactive cinema"-->
      <!--            x="25" y="1303" width="481" height="620"-->
      <!--            @click="openPage('cinema-3')" />-->
      <!--      <text class="label"-->
      <!--            :x="25 + 481/2"-->
      <!--            :y="1303 + 620/2"-->
      <!--            :font-size="getFontSize(620, 'cinema')">-->
      <!--        Cinéma 3-->
      <!--      </text>-->


      <!--      &lt;!&ndash; ========== SCÈNE ========== &ndash;&gt;-->
      <!--      <rect class="interactive scene"-->
      <!--            x="1281" y="69" width="692" height="145"-->
      <!--            @click="openPage('scene')" />-->
      <!--      <text class="label"-->
      <!--            :x="1281 + 692/2"-->
      <!--            :y="69 + 145/2"-->
      <!--            :font-size="getFontSize(145, 'scene')">-->
      <!--        Scène-->
      <!--      </text>-->


      <!--      &lt;!&ndash; ========== GRANDS STANDS (deviennent "Stand") ========== &ndash;&gt;-->
      <!--      <rect class="interactive standXL"-->
      <!--            x="886" y="348" width="65" height="164"-->
      <!--            @click="openPage('stand-big-1')" />-->
      <!--      <text class="label"-->
      <!--            :x="886 + 65/2"-->
      <!--            :y="348 + 164/2"-->
      <!--            :font-size="getFontSize(164, 'standXL')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive standXL"-->
      <!--            x="781" y="348" width="65" height="164"-->
      <!--            @click="openPage('stand-big-2')" />-->
      <!--      <text class="label"-->
      <!--            :x="781 + 65/2"-->
      <!--            :y="348 + 164/2"-->
      <!--            :font-size="getFontSize(164, 'standXL')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive standXL"-->
      <!--            x="886" y="1002" width="65" height="164"-->
      <!--            @click="openPage('stand-big-3')" />-->
      <!--      <text class="label"-->
      <!--            :x="886 + 65/2"-->
      <!--            :y="1002 + 164/2"-->
      <!--            :font-size="getFontSize(164, 'standXL')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive standXL"-->
      <!--            x="781" y="1002" width="65" height="164"-->
      <!--            @click="openPage('stand-big-4')" />-->
      <!--      <text class="label"-->
      <!--            :x="781 + 65/2"-->
      <!--            :y="1002 + 164/2"-->
      <!--            :font-size="getFontSize(164, 'standXL')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive standXL"-->
      <!--            x="1892" y="1230" width="65" height="164"-->
      <!--            @click="openPage('stand-big-5')" />-->
      <!--      <text class="label"-->
      <!--            :x="1892 + 65/2"-->
      <!--            :y="1230 + 164/2"-->
      <!--            :font-size="getFontSize(164, 'standXL')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive standXL"-->
      <!--            x="1892" y="1427" width="65" height="164"-->
      <!--            @click="openPage('stand-big-6')" />-->
      <!--      <text class="label"-->
      <!--            :x="1892 + 65/2"-->
      <!--            :y="1427 + 164/2"-->
      <!--            :font-size="getFontSize(164, 'standXL')">-->
      <!--        Stand-->
      <!--      </text>-->


      <!--      &lt;!&ndash; ========== PETITS STANDS (Stand) ========== &ndash;&gt;-->
      <!--      &lt;!&ndash; colonne centrale &ndash;&gt;-->
      <!--      <rect class="interactive stand"-->
      <!--            x="781" y="202" width="65" height="92"-->
      <!--            @click="openPage('stand-1')" />-->
      <!--      <text class="label"-->
      <!--            :x="781 + 65/2"-->
      <!--            :y="202 + 92/2"-->
      <!--            :font-size="getFontSize(92, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="886" y="202" width="65" height="92"-->
      <!--            @click="openPage('stand-2')" />-->
      <!--      <text class="label"-->
      <!--            :x="886 + 65/2"-->
      <!--            :y="202 + 92/2"-->
      <!--            :font-size="getFontSize(92, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="781" y="563" width="65" height="92"-->
      <!--            @click="openPage('stand-3')" />-->
      <!--      <text class="label"-->
      <!--            :x="781 + 65/2"-->
      <!--            :y="563 + 92/2"-->
      <!--            :font-size="getFontSize(92, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="886" y="563" width="65" height="92"-->
      <!--            @click="openPage('stand-4')" />-->
      <!--      <text class="label"-->
      <!--            :x="886 + 65/2"-->
      <!--            :y="563 + 92/2"-->
      <!--            :font-size="getFontSize(92, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="781" y="860" width="65" height="92"-->
      <!--            @click="openPage('stand-10')" />-->
      <!--      <text class="label"-->
      <!--            :x="781 + 65/2"-->
      <!--            :y="860 + 92/2"-->
      <!--            :font-size="getFontSize(92, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="886" y="860" width="65" height="92"-->
      <!--            @click="openPage('stand-11')" />-->
      <!--      <text class="label"-->
      <!--            :x="886 + 65/2"-->
      <!--            :y="860 + 92/2"-->
      <!--            :font-size="getFontSize(92, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="787" y="1220" width="65" height="92"-->
      <!--            @click="openPage('stand-17')" />-->
      <!--      <text class="label"-->
      <!--            :x="787 + 65/2"-->
      <!--            :y="1220 + 92/2"-->
      <!--            :font-size="getFontSize(92, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="893" y="1221" width="65" height="92"-->
      <!--            @click="openPage('stand-18')" />-->
      <!--      <text class="label"-->
      <!--            :x="893 + 65/2"-->
      <!--            :y="1221 + 92/2"-->
      <!--            :font-size="getFontSize(92, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->


      <!--      &lt;!&ndash; stands dans le hall (haut) &ndash;&gt;-->
      <!--      <rect class="interactive stand"-->
      <!--            x="1729" y="842" width="92" height="65"-->
      <!--            @click="openPage('stand-5')" />-->
      <!--      <text class="label"-->
      <!--            :x="1729 + 92/2"-->
      <!--            :y="842 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1595" y="842" width="92" height="65"-->
      <!--            @click="openPage('stand-6')" />-->
      <!--      <text class="label"-->
      <!--            :x="1595 + 92/2"-->
      <!--            :y="842 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1860" y="842" width="92" height="65"-->
      <!--            @click="openPage('stand-7')" />-->
      <!--      <text class="label"-->
      <!--            :x="1860 + 92/2"-->
      <!--            :y="842 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1458" y="842" width="92" height="65"-->
      <!--            @click="openPage('stand-8')" />-->
      <!--      <text class="label"-->
      <!--            :x="1458 + 92/2"-->
      <!--            :y="842 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1311" y="842" width="92" height="65"-->
      <!--            @click="openPage('stand-9')" />-->
      <!--      <text class="label"-->
      <!--            :x="1311 + 92/2"-->
      <!--            :y="842 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->


      <!--      &lt;!&ndash; stands median &ndash;&gt;-->
      <!--      <rect class="interactive stand"-->
      <!--            x="1720" y="1038" width="92" height="65"-->
      <!--            @click="openPage('stand-12')" />-->
      <!--      <text class="label"-->
      <!--            :x="1720 + 92/2"-->
      <!--            :y="1038 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1586" y="1038" width="92" height="65"-->
      <!--            @click="openPage('stand-13')" />-->
      <!--      <text class="label"-->
      <!--            :x="1586 + 92/2"-->
      <!--            :y="1038 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1851" y="1038" width="92" height="65"-->
      <!--            @click="openPage('stand-14')" />-->
      <!--      <text class="label"-->
      <!--            :x="1851 + 92/2"-->
      <!--            :y="1038 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1449" y="1038" width="92" height="65"-->
      <!--            @click="openPage('stand-15')" />-->
      <!--      <text class="label"-->
      <!--            :x="1449 + 92/2"-->
      <!--            :y="1038 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1302" y="1038" width="92" height="65"-->
      <!--            @click="openPage('stand-16')" />-->
      <!--      <text class="label"-->
      <!--            :x="1302 + 92/2"-->
      <!--            :y="1038 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->


      <!--      &lt;!&ndash; stands bas du hall &ndash;&gt;-->
      <!--      <rect class="interactive stand"-->
      <!--            x="1724" y="1784" width="92" height="65"-->
      <!--            @click="openPage('stand-19')" />-->
      <!--      <text class="label"-->
      <!--            :x="1724 + 92/2"-->
      <!--            :y="1784 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1591" y="1784" width="92" height="65"-->
      <!--            @click="openPage('stand-20')" />-->
      <!--      <text class="label"-->
      <!--            :x="1591 + 92/2"-->
      <!--            :y="1784 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1855" y="1784" width="92" height="65"-->
      <!--            @click="openPage('stand-21')" />-->
      <!--      <text class="label"-->
      <!--            :x="1855 + 92/2"-->
      <!--            :y="1784 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1453" y="1784" width="92" height="65"-->
      <!--            @click="openPage('stand-22')" />-->
      <!--      <text class="label"-->
      <!--            :x="1453 + 92/2"-->
      <!--            :y="1784 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->

      <!--      <rect class="interactive stand"-->
      <!--            x="1306" y="1784" width="92" height="65"-->
      <!--            @click="openPage('stand-23')" />-->
      <!--      <text class="label"-->
      <!--            :x="1306 + 92/2"-->
      <!--            :y="1784 + 65/2"-->
      <!--            :font-size="getFontSize(65, 'stand')">-->
      <!--        Stand-->
      <!--      </text>-->


      <!--      &lt;!&ndash; Entrée (pas de texte) &ndash;&gt;-->
      <!--      <rect class="non-interactive"-->
      <!--            id="entrance1"-->
      <!--            x="620" y="1586" width="502" height="37" />-->
    </svg>
  </div>

</template>


<script setup>
import panzoom from "panzoom";
import {useStandsStore} from "@/stores/modules/stands.js";
import {onMounted} from "vue";

const standsStore = useStandsStore()

onMounted(async () => {
  await standsStore.getStands();
});

const getFontSize = (h, type) => {
  switch (type) {

    case 'cinema':
      return h * 0.12; // Gros texte

    case 'scene':
      return h * 0.40; // Très visible

    case 'standXL':
      return h * 0.22; // ex-grand stand

    case 'stand':
      return h * 0.28; // petits stands

    default:
      return h * 0.20;
  }
}

const getStandStyle = (type) => {
  switch (type) {
    case 'cinema': return "cinema";
    case 'scene': return "scene";
    case 'standXL': return "standXL";
    case 'stand': return "stand";
    default: return "";
  }
}



// export default {
//   mounted() {
//     panzoom(this.$refs.svgMap, {
//       smoothScroll: false,
//       zoomSpeed: 0.065,
//       maxZoom: 3,
//       minZoom: 0.5,
//     });
//
//
//
//   },
//
//   methods: {
//     openPage(name) {
//       console.log("Zone cliquée :", name);
//     },
//
//   }
// };
</script>


<style scoped>
.label {
  fill: black;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
  user-select: none;
  font-weight: 700;
}

/* Non-interactifs */
.non-interactive {
  fill: #e5e5e5;
  stroke: #b3b3b3;
  stroke-width: 2;
}

/* Interactifs */
.interactive {
  stroke: #000000;
  stroke-width: 2;
  cursor: pointer;
  transition: 0.2s;
}

.interactive:hover {
  opacity: 0.50;
  stroke-width: 4;
}

/* Couleurs */
.cinema { fill: #c0392b; }
.standXL { fill: #3ab0e7; }
.stand { fill: #2ecc71; }
.scene { fill: #f5a6c5; }

</style>