// 🌟 Product Data (sample – replace with backend data)
const eyewearProducts = [
  {
    name: "Classic Walnut Shades",
    category: "Sunglasses",
    price: "$129",
    img: "https://i.pinimg.com/1200x/b5/77/0c/b5770c59a302364f9906369fc0e36cd8.jpg",
  },
  {
    name: "Ebony Optical Frame",
    category: "Optical",
    price: "$110",
    img: "https://i.pinimg.com/1200x/f1/d6/8f/f1d68f3f992da7dbeb0052c70e5b7f73.jpg",
  },
  {
    name: "Maple Blue Light Glasses",
    category: "BlueLight",
    price: "$99",
    img: "https://i.pinimg.com/1200x/1e/81/ac/1e81acc841cb7391a4f7c2f28d8c15df.jpg",
  },
  {
    name: "Aviator Ebony Shades",
    category: "Sunglasses",
    price: "$135",
    img: "https://i.pinimg.com/1200x/7d/1a/c0/7d1ac000e9b16780658efdcd15499637.jpg",
  },
  {
    name: "Ebony Optical Frame",
    category: "Optical",
    price: "$110",
    img: "https://i.pinimg.com/736x/d8/a2/57/d8a25778e74518be583f2d0eec9e45e0.jpg",
  },
  {
    name: "Maple Blue Light Glasses",
    category: "BlueLight",
    price: "$99",
    img: "https://i.pinimg.com/1200x/45/b6/6f/45b66fce416aea6cce8bff70a236fd00.jpg",
  },
  {
    name: "Aviator Ebony Shades",
    category: "Sunglasses",
    price: "$135",
    img: "https://i.pinimg.com/1200x/cc/af/17/ccaf17541a560551887c33a12bc8d372.jpg",
  },
  {
    name: "Ebony Optical Frame",
    category: "Optical",
    price: "$110",
    img: "https://i.pinimg.com/1200x/85/2e/eb/852eebc074e8153698fa37796b4ab606.jpg",
  },
  {
    name: "Maple Blue Light Glasses",
    category: "BlueLight",
    price: "$99",
    img: "https://i.pinimg.com/1200x/9d/58/17/9d581726169f4f88ef383cbf2eff1fcc.jpg",
  },
];

const eyewearGrid = document.getElementById("eyewearGrid");
const filterSelect = document.getElementById("categoryFilter");

// 🧩 Render Function
function renderProducts(filter) {
  eyewearGrid.innerHTML = "";
  eyewearProducts
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
          <button class="add-to-carting">View Details</button>
        `;
      eyewearGrid.appendChild(card);
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

// 🔄 Event Listener for Filter
filterSelect.addEventListener("change", (e) => renderProducts(e.target.value));

// 🚀 Init
renderProducts("all");

