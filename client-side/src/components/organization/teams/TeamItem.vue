<template>
  <li>
    <base-card width="90%" bgColor="white">
      <header>
        <h3>{{ teamName }}</h3>
        <nav>
          <a :href="''">View Team</a>
        </nav>
      </header>
      <p>{{ teamDescription }}</p>
    </base-card>
  </li>
</template>

<script>
export default {
  props: {
    teamName: {
      type: String,
      required: true,
    },
    teamDescription: {
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
  max-width: 50rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.4rem;
  margin: 10px;
}

p {
  margin: 10px;
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
