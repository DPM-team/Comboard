<template>
  <li>
    <div class="project-item">
      <header>
        <h3>{{ projectName }}</h3>
        <nav>
          <router-link :to="'/organization/project-public/' + projectID">View Project</router-link>
          <router-link :to="'/organization/project-private/' + projectID">Edit Project</router-link>
        </nav>
      </header>
      <p>{{ projectDescription }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    projectID: {
      type: String,
      required: true,
    },
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
.project-item {
  width: 90%;
  background: white;
  padding: 15px;
  margin-top: 5px;
}
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
  margin-left: 5px;
}

a:hover,
a:active {
  color: var(--color-third);
}
@media (max-width: 480px) {
  a {
    font-size: 12px;
  }
}
</style>
