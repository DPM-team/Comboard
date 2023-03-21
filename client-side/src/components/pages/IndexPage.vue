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

<style></style>
