<template>
  <div class="members-container">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 v-else-if="!isLoading && message">{{ message }}</h4>
    <h4 v-else v-for="member in members" :key="member.id" :memberID="member.id" :memberName="member.name"></h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.members-container {
  display: inline-block;
}

@media (max-width: 900px) {
  .members-container {
    display: block;
    margin: 0 auto;
  }
}
</style>
