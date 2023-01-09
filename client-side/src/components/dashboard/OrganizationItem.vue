<template>
  <div class="column--33perc">
    <div class="organization">
      <img :src="formatImagePath" />
      <h1 class="organization-title">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    organizationFileName: {
      type: String,
      required: true,
    },
    organizationLink: {
      type: String,
      required: false,
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
.column--33perc {
  flex: 33.33%;
  max-width: 33.33%;
  box-sizing: border-box;
  padding: 15px;
}
.organization {
  background: rgb(199, 241, 252);
  border-radius: 10px;
  padding: 30px 50px;
  display: inline-block;
  justify-content: center;
  text-align: center;
  margin-left: 5px;
}
.organization img {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  margin: 0 auto;
}
.organization-title {
  padding-top: 5px;
  font-size: 17px;
}
</style>
