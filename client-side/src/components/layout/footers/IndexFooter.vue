<template>
  <footer class="footer">
    <ul class="footer__nav">
      <li class="footer__item">
        <a class="footer__link footer_menu" href="">Features</a>
      </li>
      <li class="footer__item">
        <a class="footer__link footer_menu" href="">Packages</a>
      </li>
      <li class="footer__item">
        <a class="footer__link footer_menu" href="">Testimonials</a>
      </li>
      <li class="footer__item">
        <a class="footer__link footer_menu" href="">FAQs</a>
      </li>
    </ul>
    <a href=""><img src="../../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard Logo" class="footer__logo" /></a>
    <p class="footer__copyright">
      &copy; Copyright by
      <a class="footer__link" target="_blank" href="https://github.com/DPM-team">DPM team</a> Comboard is the group thesis application of
      <a class="footer__link" target="_blank" href="https://www.linkedin.com/in/dionisis-lougaris/">Dionisis</a> -
      <a class="footer__link" target="_blank" href="https://www.linkedin.com/in/panagiotis-machairas-9263841b9/">Panos</a> -
      <a class="footer__link" target="_blank" href="https://www.linkedin.com/in/minas-theodoros-charakopoulos/">Minas</a>. Supervising professor:<a
        class="footer__link"
        target="_blank"
        href="https://www.linkedin.com/in/alexanderchatzigeorgiou/"
      >
        Alexander Chatzigeorgiou</a
      >
    </p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 20px 5px;
  background-color: white;
}

.footer__nav {
  list-style: none;
  display: flex;
  justify-content: center;
  margin-top: 2px;
  margin-bottom: 2px;
}

.footer__item {
  margin-right: 5px;
}

.footer_menu {
  padding: 7px 10px;
}

.footer__link {
  color: var(--color-primary);
  font-size: 15px;
  font-weight: 600;
  border-radius: 3px;
  text-decoration: none;
}
.footer__link:hover {
  color: var(--color-primary);
  transition: 0.5s;
}

.footer__logo {
  height: 100px;
  display: block;
  margin: 0 auto;
  /* margin-bottom: 5rem; */
}

.footer__copyright {
  font-size: 11px;
  color: var(--color-primary);
  text-align: center;
}

.footer__copyright .footer__link {
  font-size: 12px;
}
</style>
