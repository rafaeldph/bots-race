<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div class="dashboard-title">
        <h1>Bots race</h1>
        <div class="subtitle" v-if="started">
          <p class="time-subtitle">{{ formatTime(time) }}</p>
          <button v-if="!finished" class="control-button" @click="togglePause">&#9199;</button>
        </div>
      </div>
      <div class="header-buttons">
        <button 
          v-if="started && !finished" 
          class="header-button" 
          @click="addBot"
          title="Añadir robot"
        >+</button>
        <button 
          v-if="started" 
          class="header-button" 
          @click="restart"
          title="Iniciar una nueva carrera"
        >&#8635;</button>
      </div>
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
  props: [
    'robots', 
    'time', 
    'started', 
    'finished', 
    'podium', 
    'togglePause',
    'addBot',
    'restart',
  ],
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

.dashboard-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.dashboard-title h1, .dashboard-title p {
  margin: 0;
}

.subtitle {
  display: flex;
  flex-direction: row;
}

.time-subtitle {
  color: #444;
}

.control-button {
  font-size: 14px;
  margin-left: 5px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.header-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.header-button {
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
  height: 36px;
}

.header-button:not(:last-child) {
  margin-right: 5px;
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
