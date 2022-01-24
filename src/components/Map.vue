<template>
  <div class="map">
    <img src="../assets/map.png" />
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: ['robots', 'center'],
}
</script>

<style scoped>
.map {
  position: relative;
}

.map > img {
  max-width: 100%;
}
</style>
