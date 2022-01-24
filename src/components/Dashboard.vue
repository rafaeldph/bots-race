<template>
  <div class="dashboard">
    <h1>Bots race</h1>
    <div class="dashboard-content">
      <p v-if="!started">Elige la meta haciendo clic en cualquier punto del mapa</p>
      <div v-else v-for="(robot, i) in robots" :key="i"></div>
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
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
}

.dashboard-content {
  overflow-y: auto;
}

@media screen and (max-width: 992px) {
  .dashboard {
    width: 100%;
  }
}
</style>
