<template>
  <div class="box">
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<style scoped>
form {
  margin-top: 10px;
}

.box {
  display: block;
  margin: auto;
  margin-top: auto;
  margin-bottom: auto;
  width: 25%;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}

button {
  padding: 0.75rem;
  display: block;
  cursor: pointer;
  background-color: var(--primary-color);
  color: var(--primary-bright-color);
  text-align: center;
  border-radius: 0.25rem;
  border: 2px solid var(--primary-dark-color);
  transition-duration: 0.4s;
  font-weight: bold;
}

@media screen and (max-width: 1283.2px) {
  .box {
    width: 30%;
  }
}

@media screen and (max-width: 1100px) {
  .box {
    width: 35%;
  }
}

@media screen and (max-width: 1000px) {
  .box {
    width: 40%;
  }
}

@media screen and (max-width: 900px) {
  .box {
    width: 45%;
  }
}

@media screen and (max-width: 850px) {
  .box {
    width: 50%;
  }
}

@media screen and (max-width: 750px) {
  .box {
    width: 55%;
  }
}

@media screen and (max-width: 700px) {
  .box {
    width: 65%;
  }
}

@media screen and (max-width: 650.4px) {
  .box {
    width: 80%;
  }
}

@media screen and (max-width: 550px) {
  .box {
    width: 90%;
  }
}
</style>
