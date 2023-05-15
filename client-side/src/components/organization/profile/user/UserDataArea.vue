<template>
  <div class="content">
    <ul class="profile-ul">
      <a v-if="phoneLink" :href="phoneLink">
        <font-awesome-icon class="icon" :icon="['fas', 'phone']" />
      </a>
      <a v-if="mailLink" :href="mailLink">
        <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
      </a>
      <a v-if="linkedinLink" :href="linkedinLink" target="_blank">
        <font-awesome-icon class="icon" :icon="['fab', 'linkedin']" />
      </a>
    </ul>
    <base-button @click="viewMyOrganization()">Organization Profile</base-button>
  </div>
</template>

<script>
export default {
  props: {
    phoneLink: {
      type: String,
      required: false,
      default: "",
    },
    mailLink: {
      type: String,
      required: false,
      default: "",
    },
    linkedinLink: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    viewMyOrganization() {
      this.$router.push("/organization/my-organization");
    },
  },
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
  cursor: pointer;
}

.profile-ul {
  list-style-type: none;
  margin: 0;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
}
</style>
