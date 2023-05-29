<template>
  <li>
    <div class="team-item">
      <header>
        <h3>{{ teamName }}</h3>
        <nav>
          <router-link :to="'/organization/team-public/' + teamID">View Team</router-link>
          <router-link :to="'/organization/team-private/' + teamID">Edit Team</router-link>
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
}

a:hover,
a:active {
  color: var(--color-third);
}
</style>
