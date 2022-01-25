<template>
  <div class="dashboard">
    <h1>Bots race</h1>
    <div class="dashboard-content">
      <p v-if="!started">Elige la meta haciendo clic en cualquier punto del mapa</p>
      <div v-else v-for="(robot, i) in robots" :key="i" class="robot-info">
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
  props: ['robots', 'started'],
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
