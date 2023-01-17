<template>
  <div>
    <index-header></index-header>
    <landing-section></landing-section>
    <features-section-col-style></features-section-col-style>
    <packages-section></packages-section>
    <testimonials-section></testimonials-section>
    <index-footer></index-footer>
  </div>
</template>

<script>
import IndexHeader from "../layout/headers/IndexHeader.vue";
import LandingSection from "../layout/sections/index/LandingSection.vue";
import FeaturesSectionColStyle from "../layout/sections/index/FeaturesSectionColStyle.vue";
import PackagesSection from "../layout/sections/index/PackagesSection.vue";
import TestimonialsSection from "../layout/sections/index/TestimonialsSection.vue";
import IndexFooter from "../layout/footers/IndexFooter.vue";

export default {
  components: { IndexHeader, LandingSection, FeaturesSectionColStyle, PackagesSection, TestimonialsSection, IndexFooter },
};
</script>

<style>
/* html {
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
 */
</style>
