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
  padding: 10px 5px;
  background-color: var(--color-primary);
  border-top: solid 1px white;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.footer__link:hover {
  color: white;
  transition: 0.5s;
}

.footer__logo {
  height: 100px;
  display: inline-block;
  margin-bottom: -12px;
}

.footer__copyright {
  font-size: 12px;
  color: white;
  text-align: center;
}

.footer__copyright .footer__link {
  font-size: 12px;
  color: var(--color-fifth);
  font-weight: 600;
  text-decoration: none;
}

/* Responsiveness */
@media (max-width: 420px) {
  .footer__copyright {
    font-size: 9px;
  }

  .footer__copyright .footer__link {
    font-size: 10px;
  }
}
</style>
