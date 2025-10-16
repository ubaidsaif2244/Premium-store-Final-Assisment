document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    toggleBtn.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen);
  });
});

//   hero
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const nextBtn = document.getElementById("next-slide");
  const prevBtn = document.getElementById("prev-slide");
  const dotsContainer = document.getElementById("slider-dots");
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoSlide;

  // Create dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dot");

  function updateSlider() {
    slides.forEach((slide, i) => {
      slide.style.display = i === currentIndex ? "flex" : "none";
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
  }

  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));

  // Auto slide every 5 seconds
  function startAutoSlide() {
    autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  updateSlider();
  startAutoSlide();
});

// promotion
// script.js
const promoCards = document.querySelectorAll(".promo-card");
const modal = document.getElementById("productModal");
const closeModal = document.querySelector(".close-modal");

const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalMaterial = document.getElementById("modalMaterial");
const modalRating = document.getElementById("modalRating");
const modalColor = document.getElementById("modalColor");

promoCards.forEach((card) => {
  card.addEventListener("click", () => {
    modalImg.src = card.dataset.img;
    modalName.textContent = card.dataset.name;
    modalDesc.textContent = card.dataset.desc;
    modalPrice.textContent = card.dataset.price;
    modalMaterial.textContent = card.dataset.material;
    modalRating.textContent = card.dataset.rating;
    modalColor.textContent = card.dataset.color;

    modal.style.display = "block";
  });
});

closeModal.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// product-feature maple ebony

document.querySelectorAll(".series").forEach((series) => {
  const mainImg = series.querySelector(".products img");
  const products = series.querySelectorAll(".product");

  products.forEach((product) => {
    product.addEventListener("click", () => {
      const newImg = product.getAttribute("data-img");
      mainImg.style.opacity = 0;
      setTimeout(() => {
        mainImg.src = newImg;
        mainImg.style.opacity = 1;
      }, 300);
    });
  });
});

 // Fade-in on scroll NEWS SECTION
  const fadeElements = document.querySelectorAll(".fade-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  fadeElements.forEach((el) => observer.observe(el));
