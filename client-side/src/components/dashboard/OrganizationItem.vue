<template>
  <div class="organization-container">
    <router-link @click="setOrganization" to="organization" class="organization">
      <img :src="formatImagePath" />
      <h1 class="organization-name">{{ name }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    organizationFileName: {
      type: String,
      required: false,
      default: "pamak.png",
    },
  },
  methods: {
    setOrganization() {
      this.$store.dispatch("selectOrganization", { organizationID: this.id });
    },
  },
  computed: {
    formatImagePath() {
      return require("../../assets/images/dashboard/organizations/" + this.organizationFileName);
    },
  },
};
</script>

<style scoped>
.organization-container {
  flex: 33.33%;
  text-align: center;
  max-width: 33.33%;
  box-sizing: border-box;
  padding: 15px;
}
.organization {
  background: var(--tab-grey-background);
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.445);
  padding: 25px 50px;
  display: inline-block;
  justify-content: center;
  text-align: center;
}
.organization:hover {
  cursor: pointer;
  scale: 1.05;
  transition: 0.2s;
}
.organization img {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  margin: 0 auto;
  border: 3px solid var(--color-primary);
}
.organization-name {
  padding-top: 15px;
  font-size: 20px;
  color: var(--color-primary);
}

a {
  text-decoration: none;
}

@media (max-width: 1000px) {
  .organization-container {
    flex: 50%;
    max-width: 50%;
  }
}
@media (max-width: 800px) {
  .organization {
    padding: 17px 35px;
  }
  .organization img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: 0 auto;
  }
  .organization-name {
    padding-top: 5px;
    font-size: 14px;
  }
}

@media (max-width: 620px) {
  .organization-container {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
