<template>
  <div class="testimonials" id="section--testimonials">
    <div class="inner">
      <div class="section__title">
        <h2 class="section__description">Testimonials</h2>
        <h3 class="section__header">What's all the fuss about?</h3>
      </div>
      <div class="row">
        <div class="column--33perc">
          <div class="testimonial">
            <img src="../../../assets/images/index/p1.png" alt="" />
            <div class="name">Full name</div>
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
          </div>
        </div>
        <div class="column--33perc">
          <div class="testimonial">
            <img src="../../../assets/images/index/p2.png" alt="" />
            <div class="name">Full name</div>
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
            </div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
          </div>
        </div>
        <div class="column--33perc">
          <div class="testimonial">
            <img src="../../../assets/images/index/p3.png" alt="" />
            <div class="name">Full name</div>
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
            </div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.testimonials {
  padding-top: 40px;
  padding-bottom: 80px;
  background: #f1f1f1;
  color: #434343;
  text-align: center;
}

.inner {
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
  padding: 0 20px;
}

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

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.column--33perc {
  flex: 33.33%;
  max-width: 33.33%;
  box-sizing: border-box;
  padding: 15px;
}

.testimonial {
  background: #fff;
  padding: 30px;
}

.testimonial img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.name {
  font-size: 20px;
  text-transform: uppercase;
  margin: 20px 0;
}

.stars {
  color: #6ab04c;
  margin-bottom: 20px;
}
</style>
