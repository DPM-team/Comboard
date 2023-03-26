<template>
  <div class="column">
    <div class="features-card">
      <div class="icon">
        <font-awesome-icon class="icon-item" :icon="icon" />
      </div>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.column {
  padding: 10px;
  width: 33.33%;

  /* flex: 33.33%; */
  /* display: inline-block; */
}

.features-card {
  /* box-sizing: border-box; */
  padding: 25px 20px;
  text-align: center;
  background: linear-gradient(0deg, var(--color-third) 10px, transparent 10px);
  background-repeat: no-repeat;
  background-position: 0 0.62em;
  box-shadow: 0 0 2.5em rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  transition: 0.5s;
  min-height: 300px;
}

.features-card .icon {
  font-size: 30px;
  height: 50px;
  width: 50px;
  margin: auto;
  background-color: var(--color-third);
  display: grid;
  place-items: center;
  /* justify-items: center;
  align-items: center; */
  border-radius: 50%;
  /* color: white; */
}

.icon-item {
  color: white;
  font-size: 25px;
}

.icon :before {
  /* position: absolute; */
  content: "";
  height: 50px;
  width: 50px;
  border: 0.12em solid var(--color-third);
  border-radius: 50%;
  transition: 0.5s;
}

.features-card h3 {
  font-size: 22px;
  margin: 12px 0 12px 0;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--color-primary);
}

.features-card p {
  line-height: 25px;
  color: #505664;
}

.features-card:hover {
  background-position: 0;
}

.features-card:hover .icon :before {
  height: 60px;
  width: 60px;
}

/* Responsiveness */
@media (max-width: 800px) {
  .features-card h3 {
    font-size: 20px;
  }

  .features-card p {
    line-height: 22px;
  }
}

@media (max-width: 750px) {
  .column {
    width: 100%;
  }
}
</style>
