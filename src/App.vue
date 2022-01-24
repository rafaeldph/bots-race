<template>
  <div class="container">
    <Map 
      :robots="robots" 
      :center="center" 
      :setCenter="initView"
    />
    <Dashboard 
      :robots="robots" 
      :started="center !== null" 
      :addBot="addBot"
    />
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
    initView({ x, y }) {
      this.setCenter({ x, y });
      this.setInitialBots();
    },
    setCenter({ x, y }) {
      this.center = { x, y };
    },
    setInitialBots() {
      for (let i = 0; i < 5 + Math.random() * 5; i++) {
        this.addBot();
      }
    },
    addBot() {
      const point = {
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      
      this.robots.push({
        initial: point,
        current: point,
      });
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
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

@media screen and (max-width: 992px) {
  .container {
    flex-direction: column;
  }
}
</style>
