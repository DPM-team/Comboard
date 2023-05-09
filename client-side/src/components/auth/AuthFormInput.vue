<template>
  <div class="input-container">
    <input @change="input" :id="id" :type="type" :name="name" :placeholder="placeholder" :value="value" :min="minLength" :accept="accept" ref="inputField" :required="required" />
    <font-awesome-icon v-if="type != 'submit'" class="input-item-icon" :icon="['fas', `${phdIcon}`]" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    minLength: {
      type: Number,
      required: false,
    },
    accept: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    phdIcon: { type: String, required: true, default: "pen" },
  },
  methods: {
    input() {
      if (this.$refs.inputField.type !== "file") {
        this.$emit("data", this.$refs.inputField.value);
      } else {
        this.$emit("data", this.$refs.inputField);
      }
    },
  },
};
</script>

<style scoped>
.input-container {
  position: relative;
}
.input-item-icon {
  position: absolute;

  top: 12px;
  color: gray;
}

:root {
  --primary-blue-color: #50a3c5;
  --secondary-bright-color: #ccc;
}

input {
  display: block;
  width: 75%;
  padding: 0.75rem;
  border: 1.5px solid #ccc;
  border-color: #1e306084;
  /* border-radius: 0.25rem; */
  background: no-repeat left;
  padding-left: 35px;
  margin: 1rem auto;
}

input[type="submit"],
input[type="button"] {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 15px;
}
input[type="file"] {
  background-color: var(--color-primary);
  color: white;
  font-size: 12px;
  border: 1px solid black;
  display: block;
  cursor: pointer;
  text-align: center;
  border-radius: 15px;
  transition-duration: 0.4s;
  /* font-weight: bold; */
  height: 30px;
  width: 60px;
  margin-left: 35px;
}

input[type="button"]:hover,
input[type="submit"]:hover {
  filter: brightness(0.8);
}
@media (min-width: 1700px) {
  .input-item-icon {
    left: 45px;
  }
}
@media (max-width: 1700px) {
  .input-item-icon {
    left: 32px;
  }
}
@media (max-width: 1500px) {
  .input-item-icon {
    left: 28px;
  }
}
@media (max-width: 1350px) {
  .input-item-icon {
    left: 26px;
  }
}
@media (max-width: 650px) {
  .input-item-icon {
    left: 38px;
  }
}
@media (max-width: 600px) {
  .input-item-icon {
    left: 30px;
  }
}
@media (max-width: 480px) {
  .input-item-icon {
    left: 26px;
  }
}
@media (max-width: 430px) {
  .input-item-icon {
    left: 22px;
  }
}
@media (max-width: 400px) {
  .input-item-icon {
    left: 18px;
  }
}
</style>
