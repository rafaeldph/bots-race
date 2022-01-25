<template>
  <div class="dashboard">
    <div class="dashboard-title">
      <div>
        <h1>Bots race</h1>
        <p v-if="started">{{ formatTime(time) }}</p>
      </div>
      <button class="title-button" v-if="started" @click="addBot">+</button>
    </div>
    <div class="dashboard-content">
      <p v-if="!started">Elige la meta haciendo clic en cualquier punto del mapa</p>
      <div 
        v-else 
        v-for="(robot, i) in robots" 
        :key="i" 
        :class="[
          'robot-info', 
          robot.distance !== 0 && 'walking-robot',
          i === podium.farthest && 'farthest-robot', 
          i === podium.nearest && 'nearest-robot',
        ]"
      >
        <div class="robot-title">Robot {{ (i + 1) }}</div>
        <div>Recorrido: {{ robot.traveled }}</div>
        <div>Restante: {{ robot.distance }}</div>
        <div v-if="robot.distance > 0">Batería: {{ robot.battery }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '../utils/formats';

export default {
  name: 'Dashboard',
  props: ['robots', 'time', 'started', 'podium', 'addBot'],
  computed: {
    formatTime() {
      return formatTime;
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 400px;
  max-height: 850px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
}

.dashboard-title {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.dashboard-title > h1 {
  margin: 0;
}

.title-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 5px 15px;
  font-size: 18px;
  font-weight: 700;
}

.dashboard-content {
  width: 100%;
  overflow-y: auto;
}

.robot-info {
  margin: 5px 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: var(--background-color);
}

.walking-robot {
  --background-color: yellow;
}
.farthest-robot {
  --background-color: red;
}
.nearest-robot {
  --background-color: green;
}

.robot-title {
  margin-bottom: 5px;
  font-weight: 700;
}

@media screen and (max-width: 992px) {
  .dashboard {
    width: 100%;
    max-height: unset;
  }
}
</style>
