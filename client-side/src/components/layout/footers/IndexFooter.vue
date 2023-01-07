<template>
  <footer class="footer">
    <ul class="footer__nav">
      <li class="footer__item">
        <a class="footer__link" href="">Features</a>
      </li>
      <li class="footer__item">
        <a class="footer__link" href="">Packages</a>
      </li>
      <li class="footer__item">
        <a class="footer__link" href="">Testimonials</a>
      </li>
      <li class="footer__item">
        <a class="footer__link" href="">FAQs</a>
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
  padding: 1rem 0.2rem;
  background-color: var(--color-sixth);
}

.footer__nav {
  list-style: none;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.footer__item {
  margin-right: 1rem;
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
  color: var(--color-seventh);
  text-align: center;
}

.footer__copyright .footer__link {
  font-size: 0.7rem;
}
</style>
