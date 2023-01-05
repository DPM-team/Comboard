<template>
  <button :class="buttonClasses" :data-tab="btnID" @click.prevent="toogleActive">
    <span>{{ btnID }}</span>
    {{ btnText }}
  </button>
</template>

<script>
export default {
  props: {
    btnID: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    buttonClasses() {
      if (this.isActive) {
        return `btn packages__tab packages__tab--${this.btnID} packages__tab--active`;
      }

      return `btn packages__tab packages__tab--${this.btnID}`;
    },
  },
  methods: {
    toogleActive() {
      this.$emit("toogle-active", this.btnID);
    },
  },
};
</script>

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
</style>
