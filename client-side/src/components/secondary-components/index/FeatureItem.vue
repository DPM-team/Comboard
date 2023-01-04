<template>
  <section class="feature__item">
    <div class="column--section-features-with-image-left" id="feature-networking--photo">
      <img src="../../../assets/images/index/networking.jpg" data-src="public/resources/index/networking.jpg" alt="Networking inside your organization" class="features__img lazy-img" />
    </div>
    <div class="column--section-features-with-text-right" id="feature-networking--text">
      <div class="features__feature">
        <div class="features__icon">
          <img src="../../../assets/images/index/networking_icon.png" />
        </div>
        <h5 class="features__header">Networking</h5>
        <p>
          Networking inside your organization has never been easier.. Think about it as if all organization members are in the same building. Since that cannot happen, your only option is Comboard!
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature__item {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: start;
  justify-items: start;
  flex-wrap: wrap;
}

.column--section-features-with-image-left {
  flex: 40%;
  max-width: 40%;
  box-sizing: border-box;
  display: flex;
  justify-content: end;
  padding-left: 10rem;
  padding-top: 10rem;
}

.column--section-features-with-text-right {
  flex: 60%;
  max-width: 60%;
  box-sizing: border-box;
  text-align: start;
  justify-content: start;
  padding-left: 8rem;
  padding-right: 15rem;
  padding-top: 10rem;
}

.features__img {
  width: 80%;
}

.features__feature {
  align-self: center;
  justify-self: center;
  width: 70%;
  font-size: 1.5rem;
}

.features__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-opacity);
  height: 5.5rem;
  width: 5.5rem;
  border-radius: 50%;
  margin-bottom: 2rem;
}

.features__icon img {
  height: 2.5rem;
  width: 2.5rem;
  fill: var(--color-primary);
}

.features__header {
  font-size: 2rem;
  margin-bottom: 1rem;
}

/***** Add with JS later *****/
/* .lazy-img {
    filter: blur(20px);
  } */

@media screen and (max-width: 960px) {
  .column--section-features-with-image-left,
  .column--section-features-with-text-right {
    flex: 100%;
    max-width: 80%;
  }
}

@media screen and (max-width: 600px) {
  .column--section-features-with-image-left,
  .column--section-features-with-text-right {
    flex: 100%;
    max-width: 100%;
  }

  #feature-networking--photo {
    display: none;
  }

  #feature-networking--text {
    padding: 2rem;
    flex: 100%;
    width: 90%;
  }
}
</style>
