<template>
  <div class="map" @click="onSelectCenter">
    <img 
      src="../assets/map.png" 
      :class="['map-img', center === null && 'clickable-img']" 
    />

    <img 
      v-if="center !== null" 
      src="../assets/target-sign.png"
      class="map-icon" 
      :style="{ top: `${center.y}%`, left: `${center.x}%` }"
    />

    <img
      v-for="({ current: { x, y } }, i) in robots"
      :Key="i"
      src="../assets/robot.png"
      class="map-icon"
      :style="{ top: `${y}%`, left: `${x}%` }"
    />
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: ['robots', 'center', 'setCenter'],
  methods: {
    onSelectCenter({ offsetX, offsetY, target: { width, height } }) {
      if (this.center !== null) return;

      this.setCenter({
        x: (offsetX / width) * 100,
        y: (offsetY / height) * 100,
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
</style>
