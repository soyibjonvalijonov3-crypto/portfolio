"use strict";

/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
  }, 1900);
});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


/* =========================
   THEME
========================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeBtn.textContent = "☾";
  } else {
    themeBtn.textContent = "☼";
  }

});


/* =========================
   TYPING
========================= */

const typing = document.getElementById("typing");

const words = [
  "DIGITAL EXPERIENCES",
  "MODERN WEBSITES",
  "CREATIVE IDEAS",
  "BEAUTIFUL INTERFACES"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const word = words[wordIndex];

  if (!deleting) {
    charIndex++;
  } else {
    charIndex--;
  }

  typing.textContent = word.substring(0, charIndex);

  let speed = deleting ? 35 : 70;

  if (!deleting && charIndex === word.length) {
    speed = 1500;
    deleting = true;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex++;

    if (wordIndex >= words.length) {
      wordIndex = 0;
    }

    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

revealElements.forEach(el => {
  revealObserver.observe(el);
});


/* =========================
   SKILLS
========================= */

const skillObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const bar = entry.target;

        bar.style.width =
          bar.dataset.width;

        skillObserver.unobserve(bar);
      }

    });

  }, {
    threshold: .3
  });

document.querySelectorAll(".skill-track i")
  .forEach(bar => {
    skillObserver.observe(bar);
  });


/* =========================
   COUNTERS
========================= */

const counters =
  document.querySelectorAll("[data-number]");

const counterObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const element = entry.target;

      const target =
        Number(element.dataset.number);

      let current = 0;

      const duration = 1200;

      const start = performance.now();

      function animate(time) {

        const progress =
          Math.min(
            (time - start) / duration,
            1
          );

        const eased =
          1 - Math.pow(1 - progress, 4);

        current =
          Math.floor(target * eased);

        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }

      }

      requestAnimationFrame(animate);

      counterObserver.unobserve(element);

    });

  }, {
    threshold: .5
  });

counters.forEach(counter => {
  counterObserver.observe(counter);
});


/* =========================
   ACTIVE NAV
========================= */

const sections =
  document.querySelectorAll("section[id]");

const links =
  document.querySelectorAll("nav a");

const sectionObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      links.forEach(link => {

        link.classList.remove("active");

        if (
          link.getAttribute("href") ===
          "#" + entry.target.id
        ) {
          link.classList.add("active");
        }

      });

    });

  }, {
    rootMargin: "-40% 0px -50% 0px"
  });

sections.forEach(section => {
  sectionObserver.observe(section);
});


/* =========================
   3D MOUSE PARALLAX
========================= */

const scene =
  document.getElementById("scene");

if (scene) {

  document.addEventListener("mousemove", event => {

    const x =
      (window.innerWidth / 2 - event.clientX) / 35;

    const y =
      (window.innerHeight / 2 - event.clientY) / 35;

    scene.style.transform =
      `rotateY(${-x}deg) rotateX(${y}deg)`;

  });

}


/* =========================
   MAGNETIC BUTTONS
========================= */

const magnetic =
  document.querySelectorAll(".magnetic");

magnetic.forEach(button => {

  button.addEventListener("mousemove", event => {

    const rect =
      button.getBoundingClientRect();

    const x =
      event.clientX - rect.left - rect.width / 2;

    const y =
      event.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * .12}px, ${y * .12}px)`;

  });

  button.addEventListener("mouseleave", () => {

    button.style.transform =
      "translate(0,0)";

  });

});


/* =========================
   CUSTOM CURSOR
========================= */

const cursorDot =
  document.querySelector(".cursor-dot");

const cursorRing =
  document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", event => {

  mouseX = event.clientX;
  mouseY = event.clientY;

  cursorDot.style.left =
    mouseX + "px";

  cursorDot.style.top =
    mouseY + "px";

});

function cursorAnimation() {

  ringX += (mouseX - ringX) * .15;
  ringY += (mouseY - ringY) * .15;

  cursorRing.style.left =
    ringX + "px";

  cursorRing.style.top =
    ringY + "px";

  requestAnimationFrame(cursorAnimation);
}

cursorAnimation();

document
  .querySelectorAll("a,button,input,textarea")
  .forEach(element => {

    element.addEventListener("mouseenter", () => {
      cursorRing.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("hover");
    });

  });


/* =========================
   PARTICLE SYSTEM
========================= */

const canvas =
  document.getElementById("particles");

const ctx =
  canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

  particles = [];

  const count =
    window.innerWidth < 700
      ? 35
      : 75;

  for (let i = 0; i < count; i++) {

    particles.push({

      x: Math.random() *
        canvas.width,

      y: Math.random() *
        canvas.height,

      size:
        Math.random() * 1.5 + .4,

      speedX:
        (Math.random() - .5) * .25,

      speedY:
        (Math.random() - .5) * .25

    });

  }

}

resizeCanvas();

window.addEventListener(
  "resize",
  resizeCanvas
);


function particleAnimation() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach((particle, index) => {

    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (
      particle.x < 0 ||
      particle.x > canvas.width
    ) {
      particle.speedX *= -1;
    }

    if (
      particle.y < 0 ||
      particle.y > canvas.height
    ) {
      particle.speedY *= -1;
    }

    ctx.beginPath();

    ctx.arc(
      particle.x,
      particle.y,
      particle.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "rgba(0,234,255,.55)";

    ctx.fill();


    for (
      let j = index + 1;
      j < particles.length;
      j++
    ) {

      const other =
        particles[j];

      const dx =
        particle.x - other.x;

      const dy =
        particle.y - other.y;

      const distance =
        Math.sqrt(dx * dx + dy * dy);

      if (distance < 110) {

        ctx.beginPath();

        ctx.moveTo(
          particle.x,
          particle.y
        );

        ctx.lineTo(
          other.x,
          other.y
        );

        ctx.strokeStyle =
          `rgba(0,180,255,${
            .1 * (1 - distance / 110)
          })`;

        ctx.lineWidth = .5;

        ctx.stroke();

      }

    }

  });

  requestAnimationFrame(
    particleAnimation
  );

}

particleAnimation();


/* =========================
   CONTACT FORM
========================= */

const form =
  document.getElementById("contactForm");

const formMessage =
  document.getElementById("formMessage");

form.addEventListener("submit", event => {

  event.preventDefault();

  const name =
    document.getElementById("name")
      .value.trim();

  const email =
    document.getElementById("email")
      .value.trim();

  const message =
    document.getElementById("message")
      .value.trim();

  if (!name || !email || !message) {

    formMessage.textContent =
      "Barcha maydonlarni to‘ldiring.";

    return;

  }

  const telegramText =
    `Salom Soyibjon!%0A%0A` +
    `Ism: ${encodeURIComponent(name)}%0A` +
    `Email: ${encodeURIComponent(email)}%0A%0A` +
    `Xabar:%0A${encodeURIComponent(message)}`;

  formMessage.textContent =
    "Xabaringiz tayyorlandi. Telegram orqali yuborishingiz mumkin.";

  /*
    Quyidagi manzilni o'zingizning
    Telegram username'ingizga almashtiring.
  */

  setTimeout(() => {

    const username =
      "your_username";

    window.open(
      `https://t.me/${username}?text=${telegramText}`,
      "_blank"
    );

  }, 700);

});


/* =========================
   YEAR
========================= */

document.getElementById("year")
  .textContent =
  new Date().getFullYear();