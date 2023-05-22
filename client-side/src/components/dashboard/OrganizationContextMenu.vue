<template>
  <div class="context-menu" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
    <ul>
      <li @click="removeOrganization">Remove</li>
      <li @click="deleteOrganization">Delete</li>
      <li @click="viewOrganization">View</li>
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
    removeOrganization() {
      console.log(this.organizationID);
    },
    deleteOrganization() {},
    viewOrganization() {},
  },
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  padding: 5px;
  z-index: 9999;
}

.context-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.context-menu ul li {
  cursor: pointer;
  padding: 5px;
}

.context-menu ul li:hover {
  background-color: #eee;
}
</style>
