<template>
  <footer class="footer">
    <a href=""><img src="../../../assets/comboard-logo/logo-white.png" alt="Comboard Logo" class="footer__logo" /></a>
    <p class="footer__copyright">
      &copy; Copyright by
      <a class="footer__link" target="_blank" href="https://github.com/DPM-team">DPM team</a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1rem 0.2rem;
  background-color: #1576bb;
  border-top: solid 1px white;
}
.footer__link {
  color: var(--color-seventh);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 7px 10px;
  border-radius: 3px;
  text-decoration: none;
}
.footer__link:hover {
  background: var(--color-eighth);
  color: var(--color-seventh);
  transition: 0.5s;
}

.footer__logo {
  height: 6rem;
  display: block;
  margin: 0 auto;
  /* margin-bottom: 5rem; */
}

.footer__copyright {
  font-size: 0.6rem;
  color: white;
  text-align: center;
}

.footer__copyright .footer__link {
  font-size: 0.7rem;
}
</style>
