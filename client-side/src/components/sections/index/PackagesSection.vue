<template>
  <section class="section" id="section--packages">
    <div class="section__title">
      <h2 class="section__description">Packages</h2>
      <h3 class="section__header">Choose the correct setup for your organization.</h3>
    </div>
    <div class="packages">
      <div class="packages__tab-container">
        <button class="btn packages__tab packages__tab--1 packages__tab--active" data-tab="1"><span>01</span>Educational</button>
        <button class="btn packages__tab packages__tab--2" data-tab="2"><span>02</span>Basic</button>
        <button class="btn packages__tab packages__tab--3" data-tab="3"><span>03</span>Professional</button>
      </div>
      <div class="packages__content packages__content--1 packages__content--active">
        <div class="packages__icon packages__icon--1">
          <img src="../../../assets/images/index/school_icon.png" />
        </div>
        <br />
        <h5 class="packages__header">Universities or large educational firms? This plan is for you!</h5>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <button class="btn--text-packages">Get started &RightArrow;</button>
      </div>

      <div class="packages__content packages__content--2">
        <div class="packages__icon packages__icon--2">
          <img src="../../../assets/images/index/basic_icon.png" />
        </div>
        <br />
        <h5 class="packages__header">Recommended for your organization's first steps into the Comboard universe.</h5>
        <br />
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
        <button class="btn--text-packages">Get started &RightArrow;</button>
      </div>
      <div class="packages__content packages__content--3">
        <div class="packages__icon packages__icon--3">
          <img src="../../../assets/images/index/professional_icon.png" />
        </div>
        <br />
        <h5 class="packages__header">Already done your research? Start your professional organization!</h5>
        <br />
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <button class="btn--text-packages">Get started &RightArrow;</button>
      </div>
    </div>
  </section>
</template>
