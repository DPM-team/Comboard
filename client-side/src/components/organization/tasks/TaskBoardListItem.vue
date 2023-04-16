<template>
  <div class="task-container">
    <div class="task">
      <h1 class="task-title">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.task-container {
  flex: 33.33%;
  text-align: center;
  max-width: 33.33%;
  box-sizing: border-box;
  padding: 15px;
}
.task {
  background: var(--tab-grey-background);
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.445);
  padding: 25px 50px;
  display: inline-block;
  justify-content: center;
  text-align: center;
}
.task:hover {
  cursor: pointer;
  scale: 1.05;
  transition: 0.2s;
}

.task-title {
  padding-top: 15px;
  font-size: 20px;
  color: var(--color-primary);
}

a {
  text-decoration: none;
}

@media (max-width: 1150px) {
  .task-container {
    flex: 50%;
    max-width: 50%;
  }
}
@media (max-width: 800px) {
  .task {
    padding: 17px 35px;
  }

  .task-title {
    padding-top: 5px;
    font-size: 14px;
  }
}

@media (max-width: 620px) {
  .task-container {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
