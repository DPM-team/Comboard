<template>
  <li>
    <div class="project-item">
      <header>
        <h3>{{ projectName }}</h3>
        <nav>
          <router-link class="view-project--link" :to="'/organization/project-public/' + projectID">View Project</router-link>
          <router-link v-if="accessToEdit()" class="edit-project--link" :to="'/organization/project-private/' + projectID">Edit Project</router-link>
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
    supervisorID: {
      type: String,
      required: true,
    },
  },
  methods: {
    accessToEdit() {
      return this.supervisorID === this.$store.getters.loggedUserID;
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
  margin-left: 10px;
}

.edit-project--link {
  color: rgb(255, 180, 40);
}

.view-project--link {
  color: var(--color-primary);
}

.edit-project--link:hover {
  opacity: 0.7;
}

.view-project--link:hover {
  opacity: 0.7;
}
</style>
