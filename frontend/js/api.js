// 🌟 Accessories Page API Integration

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", async () => {
  const accessoryGrid = document.getElementById("accessoryGrid");
  const filterSelect = document.getElementById("categoryFilter");
  
  let accessoryProducts = [];

  // Fallback sample data for when backend is not running
  const fallbackProducts = [
    {
      _id: "1",
      name: "Walnut Wood Bracelet",
      category: "Bracelets",
      price: 79,
      description: "Handcrafted walnut wood bracelet with natural finish and smooth texture.",
      image_url: "https://i.pinimg.com/736x/4e/ab/5d/4eab5d137f403fc783fbf6ab279479a5.jpg",
      material: "Walnut Wood",
      rating: 4.5,
      colors: ["Natural Walnut", "Dark Brown"],
      in_stock: true,
      discount_percentage: 0
    },
    {
      _id: "2",
      name: "Ebony Ring Set",
      category: "Rings",
      price: 95,
      description: "Elegant ebony wood ring set for sophisticated style and formal occasions.",
      image_url: "https://i.pinimg.com/736x/2d/1c/c5/2d1cc5b7c1f8a62e849669bafa3fd2e7.jpg",
      material: "Ebony Wood",
      rating: 4.6,
      colors: ["Dark Ebony", "Black"],
      in_stock: true,
      discount_percentage: 15
    },
    {
      _id: "3",
      name: "Classic Maple Cufflinks",
      category: "Cufflinks",
      price: 120,
      description: "Premium maple wood cufflinks perfect for formal occasions and business meetings.",
      image_url: "https://i.pinimg.com/736x/89/e0/ee/89e0eec6c5d92061a6ad4d555d982033.jpg",
      material: "Maple Wood + Metal",
      rating: 4.8,
      colors: ["Natural Maple", "Light Brown"],
      in_stock: true,
      discount_percentage: 0
    },
    {
      _id: "4",
      name: "Premium Leather Strap",
      category: "Straps",
      price: 89,
      description: "High-quality leather watch strap with wooden accents and premium buckle.",
      image_url: "https://i.pinimg.com/1200x/1f/08/02/1f0802e23edffc49e152fb9a9e64c8b9.jpg",
      material: "Leather + Wood",
      rating: 4.4,
      colors: ["Brown", "Black", "Tan"],
      in_stock: true,
      discount_percentage: 10
    },
    {
      _id: "5",
      name: "Rosewood Bead Bracelet",
      category: "Bracelets",
      price: 82,
      description: "Beautiful rosewood bead bracelet with natural patterns and smooth finish.",
      image_url: "https://i.pinimg.com/1200x/a4/3b/a1/a43ba1ca4a8c139bf02071a2e761feb5.jpg",
      material: "Rosewood",
      rating: 4.3,
      colors: ["Natural Rosewood", "Red Brown"],
      in_stock: true,
      discount_percentage: 0
    }
  ];

  // Load products from API with fallback
  async function loadProducts() {
    try {
      console.log('Loading products from API...');
      
      // Show loading state
      accessoryGrid.innerHTML = '<div class="loading" style="grid-column: 1/-1;">Loading products...</div>';
      
      const allProducts = await api.getProducts();
      console.log('Received products:', allProducts);
      
      // Filter for accessories categories
      accessoryProducts = allProducts.filter(product => 
        ['Bracelets', 'Rings', 'Cufflinks', 'Straps'].includes(product.category)
      );
      
      console.log('Filtered accessories:', accessoryProducts);
      
      if (accessoryProducts.length === 0) {
        console.log('No accessories found in API, using fallback data');
        accessoryProducts = fallbackProducts;
      }
      
      renderAccessories("all");
    } catch (error) {
      console.error('Failed to load products from API:', error);
      console.log('Using fallback sample data');
      
      // Use fallback data
      accessoryProducts = fallbackProducts;
      renderAccessories("all");
      
      // Show info message about backend
      showNotification('Using sample data. Start backend server for full functionality.', 'info');
    }
  }

  // 🧩 Render Function
  function renderAccessories(filter) {
    accessoryGrid.innerHTML = "";
    
    const filteredProducts = accessoryProducts.filter(product =>
      filter === "all" || product.category.toLowerCase() === filter.toLowerCase()
    );

    if (filteredProducts.length === 0) {
      accessoryGrid.innerHTML = '<p class="no-products" style="grid-column: 1/-1; text-align: center;">No products found in this category.</p>';
      return;
    }

    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card", "fade-section");
      
      // Format price
      const formattedPrice = `$${product.price}`;

      card.innerHTML = `
        <div class="product-img">
          <img src="${product.image_url}" alt="${product.name}" onerror="this.src='assets/imgs/placeholder.jpg'">
        </div>
        <h3>${product.name}</h3>
        <p class="price">${formattedPrice}</p>
        ${product.material ? `<p class="material">${product.material}</p>` : ''}
        ${product.rating ? `<p class="rating">⭐ ${product.rating}/5</p>` : ''}
        <button class="add-to-cart" data-product-id="${product._id}">Add to Cart</button>
      `;
      
      accessoryGrid.appendChild(card);
    });
    
    // Add event listeners to "Add to Cart" buttons
    addCartEventListeners();
    applyFadeAnimation();
  }

  // Add to cart functionality
  function addCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const productId = e.target.getAttribute('data-product-id');
        showNotification('Product added to cart!', 'success');
      });
    });
  }

  // Show notification
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      transition: all 0.3s ease;
      ${type === 'success' ? 'background-color: #4CAF50;' : 'background-color: #f44336;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
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
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) =>
      renderAccessories(e.target.value)
    );
  }

  // 🚀 Initialize
  await loadProducts();

}); // End DOMContentLoaded