<template>
  <div class="container">
    <Map :robots="robots" :center="center" :setCenter="setCenter" />
    <Dashboard :robots="robots" />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import Dashboard from './components/Dashboard.vue';

export default {
  name: 'App',
  components: {
    Map,
    Dashboard,
  },
  data() {
    return {
      robots: [],
      center: null,
    };
  },
  methods: {
    setCenter({ x, y }) {
      this.center = { x, y };
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
}
</style>
