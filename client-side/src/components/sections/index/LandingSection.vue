<template>
  <base-section :classNames="'section__welcome'">
    <div class="column--section-welcome-left" id="welcome__text">
      <h1>
        When&nbsp;
        <!-- Blue highlight effect -->
        <span class="highlight">Communication</span>
        meets
        <span class="highlight">simplicity.</span>
      </h1>
      <h4 id="text--explanation">A simpler way of communicating for all your work related activites.</h4>
      <button class="btn--text-welcome btn--scroll-to">Learn more &DownArrow;</button>
    </div>
    <div class="column--section-welcome-right">
      <img src="../../../assets/images/index/people-in-the-office.png" class="header__img" alt="People in the office sketch." />
    </div>
  </base-section>
</template>

<script>
import BaseSection from "../../basic-components/ui/BaseSection.vue";

export default {
  components: { BaseSection },
};
</script>

<style scoped>
.column--section-welcome-left {
  flex: 40%;
  max-width: 40%;
  box-sizing: border-box;
  text-align: start;
  justify-content: center;
  padding-left: 10rem;
  padding-top: 5rem;
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

#text--explanation {
  padding-top: 10px;
}

.column--section-welcome-right {
  flex: 60%;
  max-width: 60%;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  padding-left: 10rem;
}

.header__img {
  width: 90%;
  transform: translateY(-10rem);
}

@media screen and (max-width: 960px) {
  .column--section-welcome-left,
  .column--section-welcome-right {
    flex: 100%;
    max-width: 80%;
  }
}

@media screen and (max-width: 600px) {
  .column--section-welcome-left,
  .column--section-welcome-right {
    flex: 100%;
    max-width: 100%;
  }

  #welcome__text {
    padding: 2rem;
    flex: 100%;
    width: 90%;
  }
}
</style>
