<template>
  <section class="features-section-container">
    <div class="section__title">
      <h2 class="section__description">Features</h2>
      <h3 class="section__header">Every tool you need in order to do your job, lies inside the Comboard universe.</h3>
    </div>
    <div class="row">
      <!-- Column One -->
      <div class="column">
        <div class="features-card">
          <div class="icon">
            <i class="fa-solid fa-people-group"></i>
          </div>
          <h3>Networking</h3>
          <p>
            Networking inside your organization has never been easier...Think about it as if all organization members are in the same building. Since that cannot happen, your only option is Comboard!
          </p>
        </div>
      </div>
      <!-- Column Two -->
      <div class="column">
        <div class="features-card">
          <div class="icon">
            <i class="fa-solid fa-messages"></i>
          </div>
          <h3>Communication</h3>
          <p>
            We would probably guess that by now you are tired of using lots of different application for your everyday communication (Chatting, Online Meetings etc.) with your organization members.
            So, why not do all that with a single application?
          </p>
        </div>
      </div>
      <!-- Column Three -->
      <div class="column">
        <div class="features-card">
          <div class="icon">
            <i class="fa-solid fa-list-check"></i>
          </div>
          <h3>Organizing</h3>
          <p>Keep your schedule organized and clean, have easy access to all your organization related tasks and much more.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section-container {
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
.row {
  display: flex;
  /* flex-wrap: wrap; */
  padding-bottom: 20px;
  width: 80%;
  margin: 0 auto;
}

.column {
  padding: 10px;
  width: 33.33%;

  /* flex: 33.33%; */
  /* display: inline-block; */
}

.features-card {
  /* box-sizing: border-box; */
  padding: 25px 20px;
  text-align: center;
  background: linear-gradient(0deg, var(--color-third) 10px, transparent 10px);
  background-repeat: no-repeat;
  background-position: 0 0.62em;
  box-shadow: 0 0 2.5em rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  transition: 0.5s;
  min-height: 30vh;
}

.features-card .icon {
  font-size: 30px;
  height: 50px;
  width: 50px;
  margin: auto;
  background-color: var(--color-third);
  display: grid;
  place-items: center;
  /* justify-items: center;
  align-items: center; */
  border-radius: 50%;
  /* color: white; */
}

.icon :before {
  /* position: absolute; */
  content: "";
  height: 50px;
  width: 50px;
  border: 0.12em solid var(--color-third);
  border-radius: 50%;
  transition: 0.5s;
}

.features-card h3 {
  font-size: 22px;
  margin: 12px 0 12px 0;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--color-primary);
}

.features-card p {
  line-height: 25px;
  color: #505664;
}

.features-card:hover {
  background-position: 0;
}

.features-card:hover .icon:before {
  height: 60px;
  width: 60px;
}

/* Responsiveness */

@media (max-width: 1100px) {
  .section__title {
    width: 90%;
  }
  .row {
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

  .features-card h3 {
    font-size: 20px;
  }

  .features-card p {
    line-height: 22px;
  }
}
@media (max-width: 750px) {
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
  }
  .column {
    width: 100%;
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
