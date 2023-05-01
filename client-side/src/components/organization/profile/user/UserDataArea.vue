<template>
  <div class="content">
    <ul class="profile-ul">
      <a :href="phoneLink"><font-awesome-icon class="icon" :icon="['fas', 'phone']" /></a>
      <a :href="mailLink"><font-awesome-icon class="icon" :icon="['fas', 'envelope']" /></a>
      <a :href="linkedinLink" target="_blank"> <font-awesome-icon class="icon" :icon="['fab', 'linkedin']" /></a>
    </ul>
    <base-button>Organization Profile</base-button>
  </div>
</template>
<script>
export default {
  props: ["phoneLink", "mailLink", "linkedinLink"],
};
</script>

<style scoped>
.content ul {
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}
.content ul li {
  display: flex;
}
.icon {
  color: var(--color-primary);
  font-size: 19px;
}
.profile-ul {
  list-style-type: none;
  margin: 0;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
}
</style>
