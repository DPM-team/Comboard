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
  font-size: 14px;
  font-family: inherit;
  font-weight: 500;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.packages__tab {
  margin-right: 2.5rem;
  transform: translateY(20%);
}

.packages__tab span {
  margin-right: 1rem;
  font-weight: 600;
  display: inline-block;
}

.packages__tab--1 {
  background-color: var(--color-third);
}

.packages__tab--1:hover {
  opacity: 0.9;
  scale: 1.02;
}

.packages__tab--2 {
  background-color: var(--color-sixth);
}

.packages__tab--2:hover {
  opacity: 0.9;
  scale: 1.02;
}

.packages__tab--3 {
  background-color: var(--color-secondary);
  margin: 0;
}

.packages__tab--3:hover {
  opacity: 0.9;
  scale: 1.02;
}

.packages__tab--active {
  transform: translateY(5%);
}

/* Responsiveness */
@media (max-width: 800px) {
  .packages__tab {
    margin-right: 1.5rem;
  }
  .btn {
    font-size: 13px;
    padding: 12px 32px;
  }
  .packages__tab span {
    margin-right: 0.6rem;
  }
}
@media (max-width: 600px) {
  .packages__tab span {
    display: none;
  }
  .btn {
    box-sizing: border-box;
    font-size: 12px;
    padding: 10px 20px;
    margin-right: 15px;
  }
}
</style>
