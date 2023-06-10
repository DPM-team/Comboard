<template>
  <li>
    <div class="team-item">
      <header>
        <h3>{{ teamName }}</h3>
        <nav>
          <router-link class="view-team--link" :to="'/organization/team-public/' + teamID">View Team</router-link>
          <router-link v-if="accessToEdit()" class="edit-team--link" :to="'/organization/team-private/' + teamID">Edit Team</router-link>
        </nav>
      </header>
      <p>{{ teamDescription }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    teamID: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    teamDescription: {
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
.team-item {
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

.edit-team--link {
  color: rgb(255, 180, 40);
}

.view-team--link {
  color: var(--color-primary);
}

.edit-team--link:hover {
  opacity: 0.7;
}

.view-team--link:hover {
  opacity: 0.7;
}
</style>
