const text = "Hi, I'm April 👋";
let index = 0;
const introText = document.getElementById("intro-text");

function typeEffect() {
  if (index < text.length) {
    introText.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 70);
  }
}
typeEffect();

document.querySelectorAll(".carousel").forEach(carousel => {
  const images = carousel.querySelectorAll("img");
  let current = 0;

  const showImage = (i) => {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
  };

  carousel.querySelector(".next").addEventListener("click", () => {
    current = (current + 1) % images.length;
    showImage(current);
  });

  carousel.querySelector(".prev").addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  images.forEach((img, i) => {
    img.addEventListener("click", () => openLightbox(images, i));
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".lightbox-next");
const prevBtn = document.querySelector(".lightbox-prev");

let currentIndex = 0;
let currentImages = [];

function openLightbox(images, index) {
  lightbox.style.display = "block";
  currentImages = Array.from(images);
  currentIndex = index;
  lightboxImg.src = currentImages[currentIndex].src;
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

const bg = document.getElementById("particle-bg");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
bg.appendChild(canvas);

let particles = [];
const particleCount = 70; 
const colors = ["#b968ff", "#ffffff", "#d7a6ff"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.move();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
