<template>
  <section>
    <div class="section__title">
      <h2 class="section__description">Packages</h2>
      <h3 class="section__header">Choose the correct setup for your organization.</h3>
    </div>
    <div class="packages">
      <div class="packages__tab-container">
        <comboard-packages-button
          v-for="packageObj in packages"
          :key="packageObj.id"
          :btnID="packageObj.id"
          :btnText="packageObj.relatedButtonText"
          :isActive="packageIsActive(packageObj.id)"
          @toogle-active="toogleActive"
        ></comboard-packages-button>
      </div>
      <comboard-package-item
        v-for="packageObj in packages"
        :key="packageObj.id"
        :id="packageObj.id"
        :title="packageObj.title"
        :detailedDescription="packageObj.detailedDescription"
        :imageFileName="packageObj.imageFileName"
        :isActive="packageIsActive(packageObj.id)"
      ></comboard-package-item>
    </div>
  </section>
</template>

<script>
import ComboardPackagesButton from "../../../secondary-components/index/ComboardPackagesButton.vue";
import ComboardPackageItem from "../../../secondary-components/index/ComboardPackageItem.vue";

export default {
  components: {
    ComboardPackagesButton,
    ComboardPackageItem,
  },
  emits: ["toogle-active"],
  data() {
    return {
      packages: new Array(
        {
          id: "1",
          title: "Universities or large educational firms? This plan is for you!",
          detailedDescription:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          imageFileName: "school_icon.png",
          relatedButtonText: "Educational",
        },
        {
          id: "2",
          title: "Recommended for your organization's first steps into the Comboard universe.",
          detailedDescription:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          imageFileName: "basic_icon.png",
          relatedButtonText: "Basic",
        },
        {
          id: "3",
          title: "Already done your research? Start your professional organization!",
          detailedDescription:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          imageFileName: "professional_icon.png",
          relatedButtonText: "Professional",
        }
      ),
      activePackageID: "1",
    };
  },
  methods: {
    packageIsActive(packageID) {
      return this.activePackageID === packageID;
    },
    toogleActive(id) {
      this.activePackageID = String(id);
    },
  },
};
</script>

<style scoped>
.section__title {
  max-width: 80%;
  margin: 0 auto 50px auto;
  text-align: start;
}

.section__description {
  font-size: 26px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 10px;
}

.section__header {
  font-size: 38px;
  line-height: 1.3;
  font-weight: 500;
}

.packages__tab-container {
  display: flex;
  justify-content: center;
}

/* Responsiveness */

@media (max-width: 1100px) {
  .section__title {
    width: 90%;
  }
}

@media (max-width: 800px) {
  .section__description {
    font-size: 24px;
  }

  .section__header {
    font-size: 35px;
  }
}
@media (max-width: 750px) {
  .packages__tab-container {
    width: 90%;
    margin: 0 auto;
  }
}
@media (max-width: 570px) {
  .section__description {
    font-size: 20px;
  }

  .section__header {
    font-size: 30px;
  }
}
</style>
