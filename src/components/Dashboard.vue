<template>
  <div class="dashboard">
    <div class="dashboard-title">
      <h1>Bots race</h1>
      <button v-if="started" @click="addBot">+</button>
    </div>
    <div class="dashboard-content">
      <p v-if="!started">Elige la meta haciendo clic en cualquier punto del mapa</p>
      <div 
        v-else 
        v-for="(robot, i) in robots" 
        :key="i" 
        :class="[
          'robot-info', 
          i === podium.farthest && 'farthest-robot', 
          i === podium.currentNearest && 'current-nearest-robot',
          i === podium.nearest && 'nearest-robot',
        ]"
      >
        <div class="robot-title">Robot {{ (i + 1) }}</div>
        <div>Batería: {{ robot.battery }}%</div>
        <div>Recorrido: {{ robot.traveled }}</div>
        <div>Restante: {{ robot.distance }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: ['robots', 'started', 'podium', 'addBot'],
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
  background-color: yellow;
}

.farthest-robot {
  background-color: red;
}
.current-nearest-robot {
  background-color: greenyellow;
}
.nearest-robot {
  background-color: green;
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
