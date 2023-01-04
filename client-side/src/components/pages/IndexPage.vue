<template>
  <div>
    <index-header></index-header>
    <landing-section></landing-section>
    <features-section></features-section>
    <packages-section></packages-section>
    <testimonials-section></testimonials-section>
    <index-footer></index-footer>
  </div>
</template>

<script>
import IndexHeader from "../headers/IndexHeader.vue";
import LandingSection from "../sections/index/LandingSection.vue";
import FeaturesSection from "../sections/index/FeaturesSection.vue";
import PackagesSection from "../sections/index/PackagesSection.vue";
import TestimonialsSection from "../sections/index/TestimonialsSection.vue";
import IndexFooter from "../footers/IndexFooter.vue";

export default {
  components: { IndexHeader, LandingSection, FeaturesSection, PackagesSection, TestimonialsSection, IndexFooter },
};
</script>

<style>
html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  color: #444;
  line-height: 1.9;
  background-color: #f3f3f3;
}

p {
  color: #666;
}

img {
  transition: filter 0.5s;
}

h1 {
  font-size: 5.5rem;
  line-height: 1.35;
}

h4 {
  font-size: 2rem;
  font-weight: 500;
}

.btn:hover {
  background-color: var(--color-primary-darker);
}

#text--explanation {
  padding-top: 10px;
}
</style>
