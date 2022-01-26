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
    <div class="dashboard-header" v-if="started">
      <p>Ordenar por:</p>
      <select class="sort-select" v-model="sortCriteria">
        <option v-for="({ title }, i) in sortCriterias" :key="i" :value="i">{{ title }}</option>
      </select>
    </div>
    <div class="dashboard-content">
      <p v-if="!started">Elige la meta haciendo clic en cualquier punto del mapa</p>
      <div 
        v-else 
        v-for="robot in sortedRobots" 
        :key="robot.index" 
        :class="[
          'robot-info', 
          robot.distance !== 0 && 'walking-robot',
          robot.index === podium.farthest && 'farthest-robot', 
          robot.index === podium.nearest && 'nearest-robot',
        ]"
      >
        <div class="robot-current-info">
          <div class="robot-title">Robot {{ (robot.index + 1) }}</div>
          <div>Recorrido: {{ robot.traveled }}m</div>
          <div v-if="robot.distance > 0">Restante: {{ robot.distance }}m</div>
          <div v-if="robot.distance > 0">Batería: {{ robot.battery }}%</div>
          <div v-if="robot.distance === 0">Tiempo en llegar a la meta: {{ robot.finishedTimestamp }}s</div>
        </div>
        <div class="robot-goal-info" v-if="robot.distance === 0">
          #{{ (1 + robots.map(({ finishedTimestamp }) => finishedTimestamp).filter(t => t > 0).sort((a, b) => a - b).findIndex(t => t === robot.finishedTimestamp)) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '../utils/formats';

const SORTED_CRITERIAS = [
  {
    title: 'Por defecto',
    action: () => true,
  },
  {
    title: 'Más cercano a la meta',
    action: (a, b) => {
      if (a.distance === 0 && b.distance === 0) {
        return a.finishedTime - b.finishedTime;
      }
      return a.distance - b.distance;
    },
  },
  {
    title: 'Mayor distancia recorrida',
    action: (a, b) => {
      return b.traveled - a.traveled;
    },
  },
];

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
  data() {
    return {
      sortCriteria: 0,
    };
  },
  computed: {
    formatTime() {
      return formatTime;
    },
    sortCriterias() {
      return SORTED_CRITERIAS;
    },
    sortedRobots() {
      return [...this.robots].sort(SORTED_CRITERIAS[this.sortCriteria].action);
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
  margin-bottom: 10px;
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

.sort-select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: none;
}

.dashboard-content {
  width: 100%;
  overflow-y: auto;
}

.robot-info {
  margin: 5px 10px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color);
}

.robot-goal-info {
  padding: 5px;
  border-radius: 4px;
  background-color: black;
  color: white;
  font-weight: 700;
}

.walking-robot {
  --background-color: rgba(255, 255, 0, 0.7);
}
.farthest-robot {
  --background-color: rgba(200, 20, 20, 0.5);
}
.nearest-robot {
  --background-color: rgba(20, 200, 20, 0.5);
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
