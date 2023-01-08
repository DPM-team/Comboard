<template>
  <div class="column--33perc">
    <div class="organization">
      <img :src="formatImagePath" />
      <div class="title">{{ title }}</div>
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
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  justify-content: center;
}
.organization img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
}
.title {
  font-size: 17px;
}
</style>
