<template>
  <div class="input-container">
    <input @change="input" :id="id" :type="type" :name="name" :placeholder="placeholder" :value="value" :min="minLength" :accept="accept" ref="inputField" :required="required" />
    <font-awesome-icon class="input-item-icon" :icon="['fas', 'user']" />
  </div>
</template>

<script>
export default {
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
  left: 28px;
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
</style>
