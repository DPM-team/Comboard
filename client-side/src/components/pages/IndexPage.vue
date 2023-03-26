<template>
  <div>
    <index-header></index-header>
    <section class="landing-section-container">
      <div class="column--section-welcome-left" id="welcome__text">
        <h1 class="welcome-title">
          When
          <!-- Blue highlight effect -->
          <span class="highlight">Communication</span>
          meets
          <span class="highlight">simplicity.</span>
        </h1>
        <div class="text-button-container">
          <h4 id="text--explanation">A simpler way of communicating for all your work related activites.</h4>
          <button class="btn--text-welcome btn--scroll-to">Learn more &DownArrow;</button>
        </div>
      </div>
      <div class="column--section-welcome-right">
        <img src="../../assets/images/index/people-in-the-office.png" class="header__img" alt="People in the office sketch." />
      </div>
    </section>
    <features-section-col-style></features-section-col-style>
    <section class="packages-section-container">
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
    <section class="testimonial-section-container">
      <div class="section__title">
        <h2 class="section__description">Testimonials</h2>
        <h3 class="section__header">What's all the fuss about?</h3>
      </div>
      <div class="testimonials--row">
        <testimonial-item
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :authorName="testimonial.authorName"
          :authorImageFileName="testimonial.authorImageFileName"
          :testimonialContent="testimonial.testimonialContent"
          :positiveRating="testimonial.positiveRating"
        ></testimonial-item>
      </div>
    </section>
    <index-footer></index-footer>
  </div>
</template>

<script>
import IndexHeader from "../layout/headers/IndexHeader.vue";
import FeaturesSectionColStyle from "../layout/sections/index/FeaturesSectionColStyle.vue";
import ComboardPackagesButton from "../secondary-components/index/ComboardPackagesButton.vue";
import ComboardPackageItem from "../secondary-components/index/ComboardPackageItem.vue";
import TestimonialItem from "../secondary-components/index/TestimonialItem.vue";
import IndexFooter from "../layout/footers/IndexFooter.vue";

export default {
  components: { IndexHeader, FeaturesSectionColStyle, IndexFooter, TestimonialItem, ComboardPackagesButton, ComboardPackageItem },
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
      testimonials: new Array(
        {
          id: "1",
          authorName: "Full name",
          authorImageFileName: "p1.png",
          testimonialContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          positiveRating: 5,
        },
        {
          id: "2",
          authorName: "Full name",
          authorImageFileName: "p2.png",
          testimonialContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          positiveRating: 3,
        },
        {
          id: "3",
          authorName: "Full name",
          authorImageFileName: "p3.png",
          testimonialContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          positiveRating: 4,
        }
      ),
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

<style>
.landing-section-container {
  padding-top: 120px;
  padding-right: 10px;
  padding-bottom: 40px;
  padding-left: 40px;
  border-top: 1px solid #ddd;
  transition: transform 1s, opacity 1s;
  display: flex;
  flex-wrap: wrap;
}
.column--section-welcome-left {
  flex: 50%;
  max-width: 50%;
  box-sizing: border-box;
  text-align: start;
  justify-content: center;
  padding-left: 50px;
  padding-top: 5px;
}
.column--section-welcome-right {
  flex: 50%;
  max-width: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  padding-left: 5px;
  padding-right: 20px;
}

.welcome-title {
  font-size: 58px;
  line-height: 1.35;
  margin-top: 40px;
}

.btn--text-welcome {
  float: left;
  background: none;
  font-size: 17px;
  font-family: inherit;
  font-weight: 500;
  color: var(--color-primary);
  border: none;
  border-bottom: 1px solid currentColor;
  padding-top: 15px;
  padding-bottom: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

#text--explanation {
  padding-top: 20px;
  font-size: 20px;
  font-weight: 400;
}

.highlight {
  position: relative;
}

.highlight::after {
  display: block;
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.7;
  transform: scale(1.07, 1.05) skewX(-15deg);
  background-image: var(--gradient-primary);
}

.header__img {
  width: 100%;
  transform: translateY(-20%);
}

.packages-section-container {
  padding-top: 70px;
  padding-bottom: 60px;
}

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

.testimonial-section-container {
  padding-top: 70px;
  padding-bottom: 60px;
}
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

.testimonials--row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
}

/* Responsiveness */

@media (max-width: 1100px) {
  .section__title {
    width: 90%;
  }
  .testimonials--row {
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

@media (max-width: 570px) {
  .section__description {
    font-size: 20px;
  }

  .section__header {
    font-size: 30px;
  }
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

/* Responsiveness */

@media screen and (max-width: 1050px) {
  .landing-section-container {
    padding-top: 40px;
  }
  .column--section-welcome-left,
  .column--section-welcome-right {
    flex: 100%;
    max-width: 100%;
    text-align: center;
    justify-content: center;
    padding-top: 40px;
    padding-left: 0;
  }
  .welcome-title {
    font-size: 50px;
    line-height: 1.35;
    padding: 10px;
    margin-top: 20px;
  }
  .header__img {
    width: 70%;
    /* transform: translateY(-20%); */
  }
  .text-button-container {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .btn--text-welcome {
    margin-top: 6px;
    font-size: 14px;
    padding-left: 4px;
  }
  #text--explanation {
    font-size: 17px;
  }
}

@media screen and (max-width: 750px) {
  .landing-section-container {
    padding-top: 0;
  }
  .column--section-welcome-right {
    display: none;
  }
  .welcome-title {
    font-size: 45px;
    /* line-height: 1.35; */
    padding: 10px;
    margin-top: 10px;
  }

  .text-button-container {
    display: inline-block;
    justify-content: center;
    padding: 20px;
  }
  .btn--text-welcome {
    margin-top: 5px;
    font-size: 14px;
    padding-left: 4px;
  }
  #text--explanation {
    font-size: 16px;
  }
}
@media screen and (max-width: 420px) {
  .welcome-title {
    font-size: 40px;
    /* line-height: 1.35; */
    padding: 8px;
    margin-top: 0px;
  }

  .text-button-container {
    padding: 17px;
  }
  .btn--text-welcome {
    margin-top: 5px;
    font-size: 13px;
    padding-left: 4px;
  }
  #text--explanation {
    font-size: 15px;
  }
}
</style>
