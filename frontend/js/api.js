// 🌟 Product Data (replace with DB or API later)
const accessoryProducts = [
  {
    name: "Walnut Wood Bracelet",
    category: "Bracelets",
    price: "$79",
    img: "https://i.pinimg.com/736x/4e/ab/5d/4eab5d137f403fc783fbf6ab279479a5.jpg",
  },
  {
    name: "Ebony Ring Set",
    category: "Rings",
    price: "$95",
    img: "https://i.pinimg.com/736x/2d/1c/c5/2d1cc5b7c1f8a62e849669bafa3fd2e7.jpg",
  },
  {
    name: "Classic Maple Cufflinks",
    category: "Cufflinks",
    price: "$120",
    img: "https://i.pinimg.com/736x/89/e0/ee/89e0eec6c5d92061a6ad4d555d982033.jpg",
  },
  {
    name: "Premium Leather Strap",
    category: "Straps",
    price: "$89",
    img: "https://i.pinimg.com/1200x/1f/08/02/1f0802e23edffc49e152fb9a9e64c8b9.jpg",
  },
  {
    name: "Rosewood Bead Bracelet",
    category: "Bracelets",
    price: "$82",
    img: "https://i.pinimg.com/1200x/a4/3b/a1/a43ba1ca4a8c139bf02071a2e761feb5.jpg",
  },
];

const accessoryGrid = document.getElementById("accessoryGrid");
// const filterSelect = document.getElementById("categoryFilter");

// 🧩 Render Function
function renderAccessories(filter) {
  accessoryGrid.innerHTML = "";
  accessoryProducts
    .filter(
      (p) =>
        filter === "all" || p.category.toLowerCase() === filter.toLowerCase()
    )
    .forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("product-card", "fade-section");
      card.innerHTML = `
          <div class="product-img">
            <img src="${p.img}" alt="${p.name}">
          </div>
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
          <button class="add-to-cart">Add to Cart</button>
        `;
      accessoryGrid.appendChild(card);
    });
  applyFadeAnimation();
}

// 🌈 Fade Animation
function applyFadeAnimation() {
  const fadeEls = document.querySelectorAll(".fade-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );
  fadeEls.forEach((el) => observer.observe(el));
}

// 🔄 Filter Event
filterSelect.addEventListener("change", (e) =>
  renderAccessories(e.target.value)
);

// 🚀 Init
renderAccessories("all");
