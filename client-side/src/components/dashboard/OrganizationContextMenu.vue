<template>
  <div class="context-menu" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
    <ul>
      <li @click="viewOrganization()">View</li>
      <li class="warning" @click="leaveOrganization()">Leave</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      required: true,
    },
    organizationID: {
      type: String,
      required: true,
    },
  },
  methods: {
    viewOrganization() {
      this.$store.dispatch("selectOrganization", { organizationID: this.organizationID });
      this.$router.push("/organization");
    },
    leaveOrganization() {
      console.log("Leave");
    },
  },
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  z-index: 9999;
}

.context-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.context-menu ul li {
  cursor: pointer;
  padding: 8px 15px 8px 15px;
  width: 80px;
}

.context-menu ul li:hover {
  background-color: #eee;
}

.warning {
  color: red;
}
</style>
