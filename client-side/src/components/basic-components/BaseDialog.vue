<template>
  <teleport to="body">
    <div @click="closeModal()"></div>
    <dialog open>
      <header>
        <button class="close-modal" @click="$emit('close')">&times;</button>
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section>
        <slot name="main"></slot>
      </section>
      <!-- If we want to add all the buttons at the bottom -->
      <menu>
        <slot name="actions"></slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    title: {
      type: String,
      required: false,
    },
    overlay: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    handleKeyDown(event) {
      // For esc
      if (event.keyCode === 27) {
        this.$emit("close");
      }
    },
    closeModal() {
      if (this.overlay) {
        this.$emit("close");
      }
    },
  },
  mounted() {
    // Add event listener for 'Esc' key press on window object
    window.addEventListener("keydown", this.handleKeyDown);
  },
  unmounted() {
    // Remove event listener on component destruction
    window.removeEventListener("keydown", this.handleKeyDown);
  },
};
</script>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 10vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  /* border-radius: 12px; */
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

header {
  background-color: var(--color-primary);
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.close-modal {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  border: none;
  background: none;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
