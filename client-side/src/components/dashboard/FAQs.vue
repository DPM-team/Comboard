<template>
  <div class="help-page-container">
    <div class="external-container">
      <h2>Frequently asked questions</h2>
      <p>Need to take a look into our source code? <a class="link" target="blank" href="https://github.com/DPM-team/Comboard">Click here</a></p>
      <div class="container-in">
        <div class="accordion">
          <question-item v-for="question in questions" :key="question.id" :id="question.id" :title="question.title" :answer="question.answer"></question-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionItem from "./QuestionItem.vue";

export default {
  components: { QuestionItem },
  data() {
    return {
      questions: [
        {
          id: 1,
          title: "first",
          answer: "answer of first",
        },
        {
          id: 2,
          title: "2",
          answer: "answer of 2",
        },
        {
          id: 3,
          title: "3",
          answer: "answer of 3",
        },
        {
          id: 4,
          title: "4",
          answer: "answer of 4",
        },
        {
          id: 5,
          title: "5",
          answer: "answer of 5",
        },
        {
          id: 6,
          title: "6",
          answer: "answer of 6",
        },
      ],
    };
  },
};
</script>

<style scoped>
.help-page-container {
  width: 100%;
  padding: 2rem 0;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-behavior: smooth;
  transition: 0.5s;
}
.external-container {
  text-align: center;
  /* padding: 2rem; */
  width: 100%;
}
.external-container h2 {
  font-size: 40px;
  font-weight: 600;
  /* padding-top: 10px; */
  color: var(--color-primary);
}
.external-container p {
  font-weight: 300;
  color: var(--color-primary);
  padding-top: 7px;
  padding-bottom: 4rem;
}
.link {
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.1rem;
}
.container-in {
  width: 100%;
  /* max-width: 80rem; */
  margin: 0 auto;
  padding: 0 1.5rem;
}
.accordion {
  width: 80%;
  margin: 0 auto;
}
</style>
