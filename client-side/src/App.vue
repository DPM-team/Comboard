<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Roboto font */
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

:root {
  --color-primary: #0a3c5f;
  --color-secondary: #1a75ff;
  --color-third: #0a3c5f;
  --color-fourth: #0c4771;
  --color-fifth: #add8f6;
  --color-sixth: #359349;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  font-family: "Roboto";
}
</style>
