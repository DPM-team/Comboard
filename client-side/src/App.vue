<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("tryAutoLogin");
    this.$store.dispatch("tryAutoOrganizationLoad");
  },
};
</script>

<style>
/* Roboto font */
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

:root {
  --color-primary: #0a3c5f;
  --color-secondary: #1a75ff;
  --color-third: #0f5d94;
  --color-fourth: #0c4771;
  --color-fifth: #bfe2fa;
  --color-sixth: #168630;
  --gradient-primary: linear-gradient(#ffffff, var(--color-secondary));
  --gradient-team: linear-gradient(#ffffff, rgb(70, 78, 239));
  --gradient-project: linear-gradient(#ffffff, rgb(255, 255, 93));
  --tab-grey-background: rgba(212, 212, 212, 0.551);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  font-family: "Roboto" !important;
}

.no-scrolling {
  overflow: hidden;
}

.required--input {
  color: red;
}
</style>
