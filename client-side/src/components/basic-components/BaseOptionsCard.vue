<template>
  <div class="packages">
    <div class="packages__tab-container">
      <button class="btn packages__tab packages__tab--1 packages__tab--active" data-tab="1"><span>01</span>Educational</button>
      <button class="btn packages__tab packages__tab--2" data-tab="2"><span>02</span>Basic</button>
      <button class="btn packages__tab packages__tab--3" data-tab="3"><span>03</span>Professional</button>
    </div>
    <div class="packages__content packages__content--1 packages__content--active">
      <div class="packages__icon packages__icon--1">
        <img src="../../assets/images/index/school_icon.png" />
      </div>
      <br />
      <h5 class="packages__header">Universities or large educational firms? This plan is for you!</h5>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </p>
      <button class="btn--text-packages">Get started &RightArrow;</button>
    </div>

    <div class="packages__content packages__content--2">
      <div class="packages__icon packages__icon--2">
        <img src="../../assets/images/index/basic_icon.png" />
      </div>
      <br />
      <h5 class="packages__header">Recommended for your organization's first steps into the Comboard universe.</h5>
      <br />
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.
      </p>
      <button class="btn--text-packages">Get started &RightArrow;</button>
    </div>
    <div class="packages__content packages__content--3">
      <div class="packages__icon packages__icon--3">
        <img src="../../assets/images/index/professional_icon.png" />
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
</template>

<style scoped>
.btn {
  display: inline-block;
  background-color: var(--color-primary);
  font-size: 1.6rem;
  font-family: inherit;
  font-weight: 500;
  border: none;
  padding: 1.25rem 4.5rem;
  border-radius: 10rem;
  cursor: pointer;
  transition: all 0.3s;
}

.packages {
  max-width: 100rem;
  margin: 12rem auto 0 auto;
  background-color: rgb(255, 255, 255);
}

.packages__tab-container {
  display: flex;
  justify-content: center;
}

.packages__tab {
  margin-right: 2.5rem;
  transform: translateY(-50%);
}

.packages__tab span {
  margin-right: 1rem;
  font-weight: 600;
  display: inline-block;
}

.packages__tab--1 {
  background-color: var(--color-secondary);
}

.packages__tab--1:hover {
  background-color: var(--color-secondary-darker);
}

.packages__tab--3 {
  background-color: var(--color-tertiary);
  margin: 0;
}

.packages__tab--3:hover {
  background-color: var(--color-tertiary-darker);
}

.packages__tab--active {
  transform: translateY(-66%);
}

.packages__content {
  display: none;

  /* JUST PRESENTATIONAL */
  font-size: 1.7rem;
  padding: 2.5rem 7rem 6.5rem 7rem;
}

.packages__content--active {
  display: block;
}

.packages__header {
  font-size: 2.25rem;
  font-weight: 500;
  align-self: center;
}

.packages__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
}

.packages__icon img {
  height: 2.75rem;
  width: 2.75rem;
}

.packages__icon--1 {
  background-color: var(--color-secondary);
}
.packages__icon--2 {
  background-color: var(--color-primary);
}
.packages__icon--3 {
  background-color: var(--color-tertiary);
}
.btn--text-packages {
  float: right;
  background: none;
  font-size: 1.7rem;
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
</style>
