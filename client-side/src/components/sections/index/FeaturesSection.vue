<template>
  <base-section>
    <div class="section__title">
      <h2 class="section__description">Features</h2>
      <h3 class="section__header">Every tool you need in order to do your job, lies inside the Comboard universe.</h3>
    </div>
    <feature-item
      v-for="feature in features"
      :key="feature.title"
      :title="feature.title"
      :description="feature.description"
      :mainImageFileName="feature.mainImageFileName"
      :secondaryIconFileName="feature.secondaryIconFileName"
    ></feature-item>
  </base-section>
</template>

<script>
import FeatureItem from "../../secondary-components/index/FeatureItem.vue";
import BaseSection from "../../basic-components/ui/BaseSection.vue";

export default {
  components: {
    FeatureItem,
    BaseSection,
  },
  data() {
    return {
      features: new Array(
        {
          title: "Networking",
          description:
            "Networking inside your organization has never been easier...Think about it as if all organization members are in the same building. Since that cannot happen, your only option is Comboard!",
          mainImageFileName: "networking.jpg",
          secondaryIconFileName: "networking_icon.png",
        },
        {
          title: "Communication",
          description:
            "We would probably guess that by now you are tired of using lots of different application for your everyday communication (Chatting, Online Meetings etc.) with your organization members. So, why not do all that with a single application?",
          mainImageFileName: "communication.jpg",
          secondaryIconFileName: "communication_icon.png",
        },
        {
          title: "Organizing",
          description: "Keep your schedule organized and clean, have easy access to all your organization related tasks and much more.",
          mainImageFileName: "organizing.jpg",
          secondaryIconFileName: "organizing_icon.png",
        }
      ),
    };
  },
};
</script>

<style>
.section__title {
  max-width: 80rem;
  margin: 0 auto 8rem auto;
  text-align: start;
}

.section__description {
  font-size: 1.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.section__header {
  font-size: 4rem;
  line-height: 1.3;
  font-weight: 500;
}
</style>
