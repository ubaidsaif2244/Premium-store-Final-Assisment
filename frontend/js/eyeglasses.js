// 👓 Eyewear Page API Integration

document.addEventListener("DOMContentLoaded", async () => {
  const eyewearGrid = document.getElementById("eyewearGrid");
  const filterSelect = document.getElementById("categoryFilter");
  
  // Modal elements (reusing from accessories)
  const modal = document.getElementById("productModal");
  const closeModal = document.getElementById("closeModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalPrice = document.getElementById("modalPrice");
  const modalDescription = document.getElementById("modalDescription");
  const modalMaterial = document.getElementById("modalMaterial");
  const modalCategoryDetail = document.getElementById("modalCategoryDetail");
  const modalRating = document.getElementById("modalRating");
  const modalStars = document.getElementById("modalStars");
  const modalRatingText = document.getElementById("modalRatingText");
  const modalColors = document.getElementById("modalColors");
  const colorSection = document.getElementById("colorSection");
  const modalStock = document.getElementById("modalStock");
  const modalDiscount = document.getElementById("modalDiscount");
  const discountSection = document.getElementById("discountSection");
  const modalQuantity = document.getElementById("modalQuantity");
  const decreaseQty = document.getElementById("decreaseQty");
  const increaseQty = document.getElementById("increaseQty");
  const modalAddToCart = document.getElementById("modalAddToCart");
  const modalWishlist = document.getElementById("modalWishlist");
  
  let eyewearProducts = [];
  let currentProduct = null;

  // Fallback eyewear data
  const fallbackProducts = [
    {
      _id: "eyewear_1",
      name: "Luxurious Wooden Eyewear",
      category: "Eyewear",
      price: 349,
      description: "See the beauty of exotic world with the luxurious wooden glasses. Handcrafted with premium materials.",
      image_url: "assets/imgs/promotion-1.png",
      material: "Wooden Frame + Polarized Lens",
      rating: 4.7,
      colors: ["Brown", "Black", "Ash"],
      in_stock: true,
      discount_percentage: 0
    },
    {
      _id: "eyewear_2",
      name: "Classic Wooden Sunglasses",
      category: "Eyewear",
      price: 299,
      description: "Premium wooden sunglasses with UV protection and stylish design.",
      image_url: "https://i.pinimg.com/736x/8d/2e/4f/8d2e4f9c1a2b3e5f6d7c8a9b0e1f2d3c.jpg",
      material: "Bamboo Frame + UV400 Lens",
      rating: 4.5,
      colors: ["Natural", "Dark Brown"],
      in_stock: true,
      discount_percentage: 15
    },
    {
      _id: "eyewear_3",
      name: "Eco-Friendly Optical Frames",
      category: "Eyewear",
      price: 199,
      description: "Sustainable optical frames made from recycled wood materials.",
      image_url: "https://i.pinimg.com/736x/5a/3b/2c/5a3b2c8d9e1f0a2b3c4d5e6f7a8b9c0d.jpg",
      material: "Recycled Wood + Metal",
      rating: 4.3,
      colors: ["Light Brown", "Natural"],
      in_stock: true,
      discount_percentage: 0
    },
    {
      _id: "eyewear_4",
      name: "Blue Light Blocking Glasses",
      category: "Eyewear",
      price: 159,
      description: "Protect your eyes from digital strain with these stylish blue light blocking glasses.",
      image_url: "https://i.pinimg.com/736x/7c/4d/1e/7c4d1e9f2a3b4c5d6e7f8a9b0c1d2e3f.jpg",
      material: "Wooden Frame + Blue Light Filter",
      rating: 4.6,
      colors: ["Natural Wood", "Dark Walnut"],
      in_stock: true,
      discount_percentage: 10
    }
  ];

  // Load products from API with fallback
  async function loadProducts() {
    try {
      console.log('Loading eyewear products from API...');
      
      eyewearGrid.innerHTML = '<div class="loading" style="grid-column: 1/-1;">Loading eyewear...</div>';
      
      const allProducts = await api.getProducts();
      console.log('Received products:', allProducts);
      
      // Filter for eyewear categories
      eyewearProducts = allProducts.filter(product => 
        product.category.toLowerCase().includes('eyewear') || 
        product.category.toLowerCase().includes('glasses') ||
        product.category.toLowerCase().includes('sunglasses')
      );
      
      console.log('Filtered eyewear:', eyewearProducts);
      
      if (eyewearProducts.length === 0) {
        console.log('No eyewear found in API, using fallback data');
        eyewearProducts = fallbackProducts;
      }
      
      renderEyewear("all");
    } catch (error) {
      console.error('Failed to load products from API:', error);
      console.log('Using fallback eyewear data');
      
      eyewearProducts = fallbackProducts;
      renderEyewear("all");
      
      showNotification('Using sample data. Start backend server for full functionality.', 'info');
    }
  }

  // Render eyewear products
  function renderEyewear(filter) {
    eyewearGrid.innerHTML = "";
    
    const filteredProducts = eyewearProducts.filter(product =>
      filter === "all" || product.category.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      eyewearGrid.innerHTML = '<p class="no-products" style="grid-column: 1/-1; text-align: center;">No eyewear found in this category.</p>';
      return;
    }

    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card", "fade-section");
      
      const formattedPrice = `$${product.price}`;
      const discountBadge = product.discount_percentage > 0 
        ? `<div class="discount-badge">${product.discount_percentage}% OFF</div>` 
        : '';

      card.innerHTML = `
        ${discountBadge}
        <div class="product-img" data-product-id="${product._id}">
          <img src="${product.image_url}" alt="${product.name}" onerror="this.src='assets/imgs/placeholder.jpg'">
        </div>
        <h3 class="product-name" data-product-id="${product._id}">${product.name}</h3>
        <p class="price">${formattedPrice}</p>
        ${product.material ? `<p class="material">${product.material}</p>` : ''}
        ${product.rating ? `<p class="rating">⭐ ${product.rating}/5</p>` : ''}
        <div class="card-actions">
          <button class="add-to-cart" data-product-id="${product._id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="quick-view" data-product-id="${product._id}">
            <i class="fas fa-eye"></i> Quick View
          </button>
        </div>
      `;
      
      eyewearGrid.appendChild(card);
    });
    
    addEventListeners();
    applyFadeAnimation();
  }

  // Add event listeners (reusing modal logic from accessories)
  function addEventListeners() {
    document.querySelectorAll('.product-img, .product-name, .quick-view').forEach(element => {
      element.addEventListener('click', (e) => {
        const productId = e.target.closest('[data-product-id]').getAttribute('data-product-id');
        openProductModal(productId);
      });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = e.target.closest('[data-product-id]').getAttribute('data-product-id');
        addToCart(productId, 1);
      });
    });
  }

  // Open product modal (reusing logic from accessories)
  function openProductModal(productId) {
    currentProduct = eyewearProducts.find(p => p._id === productId);
    if (!currentProduct) return;

    // Populate modal with product data
    modalImage.src = currentProduct.image_url;
    modalImage.alt = currentProduct.name;
    modalTitle.textContent = currentProduct.name;
    modalCategory.textContent = currentProduct.category;
    modalPrice.textContent = `$${currentProduct.price}`;
    modalDescription.textContent = currentProduct.description || 'No description available.';
    modalMaterial.textContent = currentProduct.material || 'Not specified';
    modalCategoryDetail.textContent = currentProduct.category;

    // Stock status
    if (currentProduct.in_stock) {
      modalStock.className = 'stock-status in-stock';
      modalStock.innerHTML = '<span class="stock-indicator"></span><span>In Stock</span>';
    } else {
      modalStock.className = 'stock-status out-of-stock';
      modalStock.innerHTML = '<span class="stock-indicator"></span><span>Out of Stock</span>';
    }

    // Rating
    if (currentProduct.rating) {
      const rating = currentProduct.rating;
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      
      let starsHTML = '';
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          starsHTML += '<span class="star">★</span>';
        } else if (i === fullStars && hasHalfStar) {
          starsHTML += '<span class="star">☆</span>';
        } else {
          starsHTML += '<span class="star empty">☆</span>';
        }
      }
      
      modalStars.innerHTML = starsHTML;
      modalRatingText.textContent = `${rating}/5 (Based on customer reviews)`;
      modalRating.style.display = 'flex';
    } else {
      modalRating.style.display = 'none';
    }

    // Colors
    if (currentProduct.colors && currentProduct.colors.length > 0) {
      modalColors.innerHTML = currentProduct.colors
        .map(color => `<span class="color-item">${color}</span>`)
        .join('');
      colorSection.style.display = 'block';
    } else {
      colorSection.style.display = 'none';
    }

    // Discount
    if (currentProduct.discount_percentage > 0) {
      modalDiscount.textContent = `${currentProduct.discount_percentage}% OFF`;
      discountSection.style.display = 'block';
    } else {
      discountSection.style.display = 'none';
    }

    modalQuantity.value = 1;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProduct = null;
  }

  // Modal event listeners
  if (closeModal) {
    closeModal.addEventListener('click', closeProductModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProductModal();
      }
    });

    // Quantity controls
    decreaseQty.addEventListener('click', () => {
      const qty = parseInt(modalQuantity.value);
      if (qty > 1) {
        modalQuantity.value = qty - 1;
      }
    });

    increaseQty.addEventListener('click', () => {
      const qty = parseInt(modalQuantity.value);
      if (qty < 10) {
        modalQuantity.value = qty + 1;
      }
    });

    // Modal add to cart
    modalAddToCart.addEventListener('click', () => {
      if (currentProduct) {
        const quantity = parseInt(modalQuantity.value);
        addToCart(currentProduct._id, quantity);
        closeProductModal();
      }
    });

    // Wishlist functionality
    modalWishlist.addEventListener('click', () => {
      const icon = modalWishlist.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Added to wishlist!', 'success');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('Removed from wishlist!', 'info');
      }
    });
  }

  // Add to cart functionality
  async function addToCart(productId, quantity = 1) {
    try {
      showNotification(`Added ${quantity} item(s) to cart!`, 'success');
      console.log(`Added eyewear product ${productId} with quantity ${quantity} to cart`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      showNotification('Failed to add product to cart', 'error');
    }
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
      z-index: 1001;
      transition: all 0.3s ease;
      ${type === 'success' ? 'background-color: #4CAF50;' : 
        type === 'error' ? 'background-color: #f44336;' : 
        'background-color: #2196F3;'}
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

  // Fade animation
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

  // Filter event
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) =>
      renderEyewear(e.target.value)
    );
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeProductModal();
    }
  });

  // Initialize
  await loadProducts();
});