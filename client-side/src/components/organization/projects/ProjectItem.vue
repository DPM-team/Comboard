<template>
  <li>
    <base-card width="90%" bgColor="white">
      <header>
        <h3>{{ projectName }}</h3>
        <nav>
          <a :href="''">View Project</a>
        </nav>
      </header>
      <p>{{ projectDescription }}</p>
    </base-card>
  </li>
</template>

<script>
export default {
  props: {
    projectName: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
  margin: auto;
  max-width: 40rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: var(--color-primary);
}

a:hover,
a:active {
  color: var(--color-third);
}
</style>
