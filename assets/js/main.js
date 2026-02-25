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
      alert("Grazie! Messaggio ricevuto. Ti ricontattero presto.");
    });
  }

  const initAlloggioGallery = () => {
    const alloggioRoot = document.querySelector("[data-alloggio-folder]");
    if (!alloggioRoot) return;

    const folder = alloggioRoot.getAttribute("data-alloggio-folder");
    if (!folder) return;

    const heroEl = document.querySelector("[data-alloggio-hero]");
    const track = document.querySelector("[data-alloggio-carousel-track]");
    const thumbs = document.querySelector("[data-alloggio-thumbs]");
    const dots = document.querySelector("[data-alloggio-dots]");
    const prevBtn = document.querySelector("[data-alloggio-prev]");
    const nextBtn = document.querySelector("[data-alloggio-next]");
    if (!track || !thumbs || !prevBtn || !nextBtn) return;

    const basePath = `assets/img/${folder}/`;
    const exts = ["avif"];

    const testImage = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });

    const findFirstAvailable = async (names) => {
      for (const name of names) {
        for (const ext of exts) {
          const url = `${basePath}${name}.${ext}`;
          // eslint-disable-next-line no-await-in-loop
          if (await testImage(url)) return url;
        }
      }
      return null;
    };

    const loadGalleryImages = async () => {
      const found = [];
      for (let i = 1; i <= 20; i += 1) {
        const pad = String(i).padStart(2, "0");
        // eslint-disable-next-line no-await-in-loop
        const hit = await findFirstAvailable([pad, `foto-${pad}`, `foto${i}`, String(i)]);
        if (!hit) {
          if (i > 4 && found.length > 0) break;
          continue;
        }
        found.push(hit);
      }
      if (found.length === 0) {
        const fallback = await findFirstAvailable(["cover", "copertina", "hero"]);
        if (fallback) found.push(fallback);
      }
      return found;
    };

    const openLightbox = (images, startAt) => {
      let modal = document.querySelector("[data-media-lightbox]");
      if (!modal) {
        modal = document.createElement("div");
        modal.className = "media-lightbox";
        modal.setAttribute("data-media-lightbox", "true");
        modal.innerHTML = `
          <button class="media-lightbox-close" type="button" aria-label="Chiudi">×</button>
          <button class="media-lightbox-nav media-lightbox-prev" type="button" aria-label="Foto precedente">‹</button>
          <img class="media-lightbox-img" alt="Foto alloggio" />
          <button class="media-lightbox-nav media-lightbox-next" type="button" aria-label="Foto successiva">›</button>
        `;
        document.body.appendChild(modal);
      }

      const imgEl = modal.querySelector(".media-lightbox-img");
      const btnClose = modal.querySelector(".media-lightbox-close");
      const btnPrev = modal.querySelector(".media-lightbox-prev");
      const btnNext = modal.querySelector(".media-lightbox-next");

      let current = startAt;
      const update = () => {
        imgEl.src = images[current];
      };

      const close = () => {
        modal.classList.remove("is-open");
        document.body.classList.remove("media-lightbox-open");
        if (modal._keyHandler) {
          document.removeEventListener("keydown", modal._keyHandler);
          modal._keyHandler = null;
        }
      };

      btnClose.onclick = close;
      btnPrev.onclick = () => {
        current = (current - 1 + images.length) % images.length;
        update();
      };
      btnNext.onclick = () => {
        current = (current + 1) % images.length;
        update();
      };
      modal.onclick = (e) => {
        if (e.target === modal) close();
      };

      modal._keyHandler = (e) => {
        if (!modal.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") btnPrev.click();
        if (e.key === "ArrowRight") btnNext.click();
      };
      document.addEventListener("keydown", modal._keyHandler);

      update();
      modal.classList.add("is-open");
      document.body.classList.add("media-lightbox-open");
    };

    const buildCarousel = async () => {
      const cover = await findFirstAvailable(["cover", "copertina", "hero"]);
      if (heroEl && cover) {
        heroEl.style.backgroundImage = `linear-gradient(130deg, rgba(16,12,9,.62) 0%, rgba(16,12,9,.28) 55%, rgba(16,12,9,.5) 100%), url('${cover}')`;
      }

      const images = await loadGalleryImages();
      if (images.length === 0) return;

      let current = 0;
      track.innerHTML = "";
      thumbs.innerHTML = "";
      if (dots) dots.innerHTML = "";

      images.forEach((src, i) => {
        const slide = document.createElement("button");
        slide.type = "button";
        slide.className = "alloggio-slide";
        slide.setAttribute("aria-label", `Apri foto ${i + 1}`);
        slide.innerHTML = `<img src="${src}" alt="Foto alloggio ${i + 1}" loading="lazy" decoding="async" />`;
        slide.addEventListener("click", () => openLightbox(images, i));
        track.appendChild(slide);

        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "alloggio-thumb";
        thumb.innerHTML = `<img src="${src}" alt="Miniatura foto ${i + 1}" loading="lazy" decoding="async" />`;
        thumb.addEventListener("click", () => {
          current = i;
          update();
        });
        thumbs.appendChild(thumb);

        if (dots) {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "alloggio-dot";
          dot.setAttribute("aria-label", `Vai alla foto ${i + 1}`);
          dot.addEventListener("click", () => {
            current = i;
            update();
          });
          dots.appendChild(dot);
        }
      });

      const update = () => {
        track.style.transform = `translateX(-${current * 100}%)`;
        const thumbBtns = thumbs.querySelectorAll(".alloggio-thumb");
        thumbBtns.forEach((t, i) => t.classList.toggle("is-active", i === current));
        if (dots) {
          const dotBtns = dots.querySelectorAll(".alloggio-dot");
          dotBtns.forEach((d, i) => d.classList.toggle("is-active", i === current));
        }
      };

      prevBtn.addEventListener("click", () => {
        current = (current - 1 + images.length) % images.length;
        update();
      });
      nextBtn.addEventListener("click", () => {
        current = (current + 1) % images.length;
        update();
      });

      update();
    };

    buildCarousel();
  };

  initAlloggioGallery();

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
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const statusEl = document.getElementById("formStatus");
  const submitBtn = form.querySelector('button[type="submit"]');

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwaqpe";

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.style.color = isError ? "crimson" : "inherit";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const gotcha = form.querySelector('input[name="_gotcha"]');
    if (gotcha && gotcha.value.trim().length > 0) {
      form.reset();
      setStatus("Messaggio inviato. Grazie!", false);
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
    }
    setStatus("Invio in corso…", false);

    try {
      const formData = new FormData(form);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        form.reset();
        setStatus("Messaggio inviato! Ti risponderò al più presto.", false);
      } else {
        let data = null;
        try { data = await res.json(); } catch (_) {}
        const msg =
          data && data.errors && data.errors.length
            ? data.errors.map((x) => x.message).join(" • ")
            : "Errore durante l’invio. Riprova tra poco o scrivimi via email.";
        setStatus(msg, true);
      }
    } catch (err) {
      setStatus("Connessione non disponibile. Riprova o usa WhatsApp/email.", true);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
      }
    }
  });
})();