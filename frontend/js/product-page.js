// Mock Data (later from backend /api/products)
const allProducts = [
  {
    id: 1,
    name: "Way Kambas Maple",
    category: "Maple",
    price: "Rs 1,280",
    image: "https://i.pinimg.com/736x/3c/0b/89/3c0b897ed68cf7f932ea3c000e3ba4f7.jpg",
    description: "Elegant maple wood watch with handcrafted design.",
  },
  {
    id: 2,
    name: "Kaili Ebony",
    category: "Ebony",
    price: "Rs 950",
    image: "https://i.pinimg.com/736x/33/26/d4/3326d45ed2379d6f75ea46fe086d0c19.jpg",
    description: "Smooth ebony finish and durable strap.",
  },
  {
    id: 3,
    name: "Sunda Walnut",
    category: "Walnut",
    price: "Rs 1,170",
    image: "https://i.pinimg.com/736x/bd/1a/8d/bd1a8da50ab90739abeea11f21fbccf9.jpg",
    description: "Minimalist design crafted with walnut wood.",
  },
  {
    id: 4,
    name: "Alor Maple",
    category: "Maple",
    price: "Rs 990",
    image: "https://i.pinimg.com/736x/0f/3c/af/0f3cafe71a10972df436ac1805f98307.jpg",
    description: "Unique maple tone with elegant dial.",
  },
  {
    id: 5,
    name: "Mori Ebony",
    category: "Ebony",
    price: "Rs 1,050",
    image: "https://i.pinimg.com/736x/b4/af/48/b4af48650ca8d2005fb5fb9faef5ab05.jpg",
    description: "Luxury ebony piece for formal wear.",
  },
  {
    id: 6,
    name: "Lombok Walnut",
    category: "Walnut",
    price: "Rs 1,200",
    image: "https://i.pinimg.com/736x/52/5a/80/525a80bdb03baaf7a098e80531350dee.jpg",
    description: "Classic walnut texture, handmade.",
  },
  {
    id: 7,
    name: "Tomia Maple",
    category: "Maple",
    price: "Rs 1,150",
    image: "https://i.pinimg.com/736x/14/38/d5/1438d5f481da3e6ec239a710b1cb0561.jpg",
    description: "Beautiful maple with metal accents.",
  },
  {
    id: 8,
    name: "Gili Ebony",
    category: "Ebony",
    price: "Rs 1,250",
    image: "https://i.pinimg.com/736x/1f/52/bb/1f52bbf8665df2068763bb8705f39f10.jpg",
    description: "Ebony luxury watch with fine polish.",
  },
  {
    id: 9,
    name: "Lore Walnut",
    category: "Walnut",
    price: "Rs 1,180",
    image: "https://i.pinimg.com/736x/42/2a/07/422a07950ec85ccc78bd852a9bc1597e.jpg",
    description: "Walnut finish with premium glass case.",
  },
   {
    id: 10,
    name: "Lore Walnut",
    category: "Walnut",
    price: "Rs 1,180",
    image: "https://i.pinimg.com/736x/2d/e8/24/2de82443ad2191540485a070dd279896.jpg",
    description: "Walnut finish with premium glass case.",
  },
   {
    id: 11,
    name: "Lore Walnut",
    category: "Walnut",
    price: "Rs 1,180",
    image: "https://i.pinimg.com/736x/35/f9/21/35f9210bdfdc604a19e5aa86f3b85453.jpg",
    description: "Walnut finish with premium glass case.",
  },
   {
    id: 12,
    name: "Lore Walnut",
    category: "Walnut",
    price: "Rs 1,180",
    image: "https://i.pinimg.com/736x/db/2b/28/db2b2826a7118021f7c613ba586f9597.jpg",
    description: "Walnut finish with premium glass case.",
  },
   {
    id: 13,
    name: "Lore Walnut",
    category: "Walnut",
    price: "Rs 1,180",
    image: "https://i.pinimg.com/736x/9e/aa/8e/9eaa8e7a5a3278c1e1d6779e6e7e174a.jpg",
    description: "Walnut finish with premium glass case.",
  },
     {
    id: 14,
    name: "Lore Walnut",
    category: "Walnut",
    price: "Rs 1,180",
    image: "https://i.pinimg.com/1200x/22/11/50/221150a97a31be49dd96a7b43c4ae05e.jpg",
    description: "Walnut finish with premium glass case.",
  },
     {
    id: 15,
    name: "Lore Walnut",
    category: "Walnut",
    price: "Rs 1,180",
    image: "https://i.pinimg.com/736x/3b/a7/ea/3ba7ea1ac729652a8ce570ff6dff0e39.jpg",
    description: "Walnut finish with premium glass case.",
  },
];

const grid = document.getElementById("productGrid");
const filterSelect = document.getElementById("categoryFilter");

// Render Function
function renderProducts(list) {
  grid.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.category} Series</p>
      <p>${p.price}</p>
      <button onclick="viewProduct(${p.id})">View Details</button>
    `;
    grid.appendChild(card);
  });
}

// Initial Load
renderProducts(allProducts);

// Filter Change
filterSelect.addEventListener("change", (e) => {
  const category = e.target.value;
  if (category === "all") renderProducts(allProducts);
  else {
    const filtered = allProducts.filter((p) => p.category === category);
    renderProducts(filtered);
  }
});

// Redirect to Product Detail
function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html"; // or product-detail.html if separate
}


// =======Glassses=======

