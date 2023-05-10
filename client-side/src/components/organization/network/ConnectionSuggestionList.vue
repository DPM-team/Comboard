<template>
  <base-spinner v-if="loadding && fellowOrgMembers.length === 0"></base-spinner>
  <div v-else-if="!loadding && fellowOrgMembers.length > 0" class="connection-sug-list">
    <h2>{{ title }}</h2>
    <ul>
      <connection-suggestion-item
        v-for="member in fellowOrgMembers"
        :key="member.id"
        :id="member.id"
        :firstname="member.name"
        :lastname="member.surname"
        :pictureLink="member.picturLink"
      ></connection-suggestion-item>
    </ul>
  </div>
</template>

<script>
import ConnectionSuggestionItem from "./ConnectionSuggestionItem.vue";
export default {
  components: { ConnectionSuggestionItem },
  async created() {
    this.loadding = true;
    await this.recommentedConnections();
    this.loadding = false;
  },
  data() {
    return {
      title: "Expand your network",
      fellowOrgMembers: [],
      loadding: false,
      error: null,
    };
  },
  methods: {
    async recommentedConnections() {
      try {
        this.fellowOrgMembers = await this.$store.dispatch("recommentedConnections", {
          orgID: this.$store.getters.selectedOrganizationID,
        });
        console.log(this.fellowOrgMembers);
        this.fellowOrgMembers.forEach((member) => {
          member.pictureLink = `/api/users/${member.id}/profilePhoto`;
        });
      } catch (e) {
        this.error = e;
      }
    },
  },
};
</script>

<style scoped>
.connection-sug-list {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  border-radius: 10px;
  width: 200px;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  /* height: calc(100% - 400px); */
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.connection-sug-list h2 {
  font-size: 18px;
  color: var(--color-primary);
  width: 100%;
  text-align: center;
  padding-bottom: 15px;
}

.connection-sug-list ul {
  list-style-type: none;
}
</style>
