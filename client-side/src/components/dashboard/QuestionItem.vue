<template>
  <div class="accordion-item" :id="id" @click="showAnswer()">
    <a class="accordion-link" :href="questionLink">
      {{ title }}
      <!-- <font-awesome-icon :icon="['fas', 'angle-down']" /> -->
    </a>
    <div class="answer">
      <p>
        {{ answer }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "title", "answer"],
  computed: {
    questionLink() {
      return `#question${this.id}`;
    },
  },
};
</script>

<style scoped>
.accordion-item {
  background-color: var(--color-primary);
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 0 2.5em rgba(0, 0, 0, 0.15);
  width: 90%;
}

.accordion-link {
  font-size: 1.6rem;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}
.accordion-link:hover {
  background: transparent;
}

.answer {
  position: relative;
  background-color: var(--color-fourth);
  /* max-height: 0; */
  overflow: hidden;
  transition: max-height 400ms;
}

.answer::before {
  content: "";
  position: absolute;
  width: 0.6rem;
  height: 90%;
  /* background-color: #8fc460; */
  background-color: white;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.answer p {
  color: white;
  font-size: 0.9rem;
  padding: 1.4rem;
}

.accordion-item:target .answer {
  max-height: 12rem;
}
</style>
