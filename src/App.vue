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
import { formatNumber } from './utils/numbers';
import { calculateAngle } from './utils/distances';

const DELTA = 0.1;
const MIN_BATTERY = 10;

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
      time: 0,
    };
  },
  methods: {
    initView({ x, y }) {
      this.setCenter({ x, y });
      this.setInitialBots();

      setInterval(this.updateView, 1000);
    },
    updateView() {
      for (const i of Object.keys(this.robots)) {
        let robot = this.robots[i];

        if (robot.chargingTime > 0) {
          this.robots[i].chargingTime -= 1;
          continue; 
        }

        if (battery < MIN_BATTERY) {
          this.robots[i].battery = 100;
          continue;
        }

        const batteryLoss = 10 + Math.random() * 20;
        let battery = robot.battery - batteryLoss;
        if (battery < 0) battery = 0;

        const distance = (50 + Math.random() * 50) * DELTA;
        const angle = calculateAngle(robot.current, this.center);

        this.robots[i] = {
          ...robot,
          current: {
            x: robot.current.x + Math.sin(angle) * distance,
            y: robot.current.y + Math.cos(angle) * distance,
          },
          battery,
        };
      }
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
        x: formatNumber(Math.random() * 100),
        y: formatNumber(Math.random() * 100),
      };
      
      this.robots.push({
        initial: point,
        current: point,
        battery: 100,
        chargingTime: 1,
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
