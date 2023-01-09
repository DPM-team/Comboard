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
  padding: 20px 10px;
  background-color: var(--color-primary);
  border-top: solid 1px white;
}
.footer__link {
  color: var(--color-secondary);
  font-size: 0.8rem;
  font-weight: 600;

  border-radius: 3px;
  text-decoration: none;
}
.footer__link:hover {
  color: white;
  transition: 0.5s;
}

.footer__logo {
  height: 120px;
  display: block;
  margin: 0 auto;
}

.footer__copyright {
  font-size: 12px;
  color: white;
  text-align: center;
}

.footer__copyright .footer__link {
  font-size: 12px;
}
</style>
