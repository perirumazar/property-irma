(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");

  const closeNav = () => {
    if (!toggle || !links) return;
    toggle.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  const openNav = () => {
    if (!toggle || !links) return;
    toggle.setAttribute("aria-expanded", "true");
    links.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });

    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeNav());
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("nav-open")) return;
      const t = e.target;
      if (!links.contains(t) && !toggle.contains(t)) closeNav();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) closeNav();
    });
  }

  const form = document.querySelector("form.form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form placeholder: quando vuoi lo colleghiamo a email/WhatsApp 🙂");
    });
  }

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const enableAOS = () => {
    document.documentElement.classList.add("aos-on");
    window.AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
    });
  };

  if (!reduceMotion && window.AOS) {
    try {
      enableAOS();
    } catch (_) {
      document.documentElement.classList.remove("aos-on");
    }
  }

  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    try {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const href = a.getAttribute("href");
          const target = href && document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          closeNav();
          lenis.scrollTo(target, { offset: -88 });
        });
      });
    } catch (_) {}
  }

  const forceVisible = (sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  };

  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    try {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".hero-tile", {
        y: 18,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.from(".hero-card", {
        y: 14,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.utils.toArray(".card").forEach((card) => {
        gsap.from(card, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });

      gsap.to(".blob-a", { y: -18, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".blob-b", { y: 14, duration: 3.1, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".blob-c", { y: -10, duration: 2.9, ease: "sine.inOut", yoyo: true, repeat: -1 });
    } catch (_) {
      forceVisible(".hero-tile, .hero-card, .card");
    }
  }
})();
