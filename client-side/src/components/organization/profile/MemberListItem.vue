<template>
  <li>
    <div class="member-item">
      <h1>{{ firstname }} {{ lastname }}</h1>
      <button>Remove</button><button>View</button>
    </div>
  </li>
</template>
<script>
export default {
  props: ["firstname", "lastname"],
};
</script>
<style scoped>
.member-item {
  margin-top: 10px;
}
.member-item h1 {
  font-size: 17px;
}
</style>
