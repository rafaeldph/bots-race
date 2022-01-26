<template>
  <div class="map" @click="onSelectCenter">
    <img 
      src="../assets/map.png" 
      :class="['map-img', center === null && 'clickable-img']" 
    />

    <img 
      v-if="center !== null" 
      src="../assets/target-sign.png"
      class="map-icon target-icon" 
      :style="{ top: `${center.y}%`, left: `${center.x}%` }"
    />

    <img
      v-for="({ current: { x, y }, distance, index }) in robots"
      :key="index"
      src="../assets/robot.png"
      :class="[
        'map-icon', 
        index === podium.farthest && 'last-robot', 
        index === podium.nearest && 'first-robot',
        distance === 0 && 'hidden-icon',
      ]"
      :style="{ top: `${y}%`, left: `${x}%` }"
    />

    <div class="measure-container" :style="{ width: `${(this.delta * 500)}%` }">
      <div class="measure">
        <div class="line"></div>
      </div>
      <div class="measure-title">500m</div>
    </div>
  </div>
</template>

<script>
import { formatNumber } from '../utils/formats';

export default {
  name: 'Map',
  props: ['robots', 'center', 'delta', 'setCenter', 'podium'],
  methods: {
    onSelectCenter({ offsetX, offsetY, target: { width, height } }) {
      if (this.center !== null) return;

      this.setCenter({
        x: formatNumber(offsetX / width * 100),
        y: formatNumber(offsetY / height * 100),
      });
    },
  },
};
</script>

<style scoped>
.map {
  position: relative;
}

.map-img {
  max-width: 100%;
  opacity: 0.75;
}

.clickable-img {
  cursor: pointer;
}

.map-icon {
  position: absolute;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
}

.target-icon {
  z-index: 2;
}

.hidden-icon {
  display: none;
}

.last-robot {
  --border-color: red;
}
.first-robot {
  --border-color: green;
}
.first-robot, .last-robot {
  border: 2px solid var(--border-color);
  border-radius: 4px;
}

.measure-container {
  position: absolute;
  bottom: 2.5%;
  right: 2.5%;
}

.measure {
  padding: 3px 0;
  height: 9px;
  border-left: 3px solid black;
  border-right: 3px solid black;
}

.measure > .line {
  width: 100%;
  height: 100%;
  background-color: black;
}

.measure-title {
  text-align: center;
}
</style>
