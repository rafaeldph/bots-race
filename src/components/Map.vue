<template>
  <div class="map" @click="onSelectCenter">
    <img src="../assets/map.png" />
    <div v-if="center !== null" class="map-center" :style="{ top: `${center.y}%`, left: `${center.x}%` }">C</div>
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

.map > img {
  max-width: 100%;
}

.map-center {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: darkred;
  color: white;
  font-weight: 700;
  border: 3px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
}
</style>
