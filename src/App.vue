<template>
  <div class="container">
    <Map 
      :robots="robots" 
      :center="center" 
      :delta="delta"
      :setCenter="initView"
    />
    <Dashboard 
      :robots="formattedRobots" 
      :started="center !== null" 
      :addBot="addBot"
    />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import Dashboard from './components/Dashboard.vue';
import { formatNumber } from './utils/numbers';
import { calculateAngle, calculateDistance } from './utils/distances';

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
      delta: 0.05,
    };
  },
  computed: {
    formattedRobots() {
      return this.robots.map(({ initial, current, battery }) => ({
        battery: formatNumber(battery),
        traveled: formatNumber(calculateDistance(initial, current) / this.delta),
        distance: formatNumber(calculateDistance(current, this.center) / this.delta),
      }));
    }
  },
  methods: {
    initView({ x, y }) {
      this.setCenter({ x, y });
      this.setInitialBots();

      setInterval(this.updateView, 1000);
    },
    updateView() {
      this.time++;

      this.robots = this.robots.map((robot) => {
        const distance = calculateDistance(robot.current, this.center);
        if (!distance) {
          return robot;
        }

        if (robot.chargingTime > 0) {
          return {
            ...robot,
            chargingTime: robot.chargingTime - 1,
          }
        }

        if (robot.battery < MIN_BATTERY) {
          return { 
            ...robot, 
            battery: 100,
          };
        }

        const angle = calculateAngle(robot.current, this.center);
        let move = (50 + Math.random() * 50) * this.delta;
        if (move > distance) {
          move = distance;
        }

        let { chargingTime } = robot;
        const batteryLoss = MIN_BATTERY + Math.random() * 20;
        let battery = robot.battery - batteryLoss;
        if (battery < 0) {
          battery = 0;
          chargingTime = 5;
        }

        return {
          ...robot,
          current: {
            x: robot.current.x + Math.sin(angle) * move,
            y: robot.current.y + Math.cos(angle) * move,
          },
          battery,
          chargingTime,
        };
      });
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
        chargingTime: 0,
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
