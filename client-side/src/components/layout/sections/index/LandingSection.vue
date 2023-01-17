<template>
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
      <img src="../../../../assets/images/index/people-in-the-office.png" class="header__img" alt="People in the office sketch." />
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
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
  padding-left: 40px;
  padding-top: 5px;
}
.column--section-welcome-right {
  flex: 50%;
  max-width: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  padding-left: 5px;
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
