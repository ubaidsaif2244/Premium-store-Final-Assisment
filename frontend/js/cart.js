// 🛒 Shopping Cart Management for MATOA Store

class CartManager {
    constructor() {
        this.cartId = null;
        this.cartItems = [];
        this.init();
    }

    async init() {
        try {
            this.cartId = await initializeCart();
            await this.loadCart();
            this.bindEvents();
            this.updateCartCounter();
        } catch (error) {
            console.error('Failed to initialize cart:', error);
            this.showEmptyCart();
        }
    }

    async loadCart() {
        if (!this.cartId) return;

        try {
            const cart = await api.getCart(this.cartId);
            this.cartItems = cart.items || [];
            this.renderCart();
        } catch (error) {
            console.error('Failed to load cart:', error);
            this.cartItems = [];
            this.renderCart();
        }
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const cartContent = document.querySelector('.cart-content');

        if (this.cartItems.length === 0) {
            this.showEmptyCart();
            return;
        }

        // Show cart content
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartContent) cartContent.style.display = 'flex';

        // Render cart items
        cartItemsContainer.innerHTML = this.cartItems.map(item => `
            <div class="cart-item" data-product-id="${item.product_id}">
                <div class="item-image">
                    <img src="${item.image_url}" alt="${item.product_name}" onerror="this.src='assets/imgs/placeholder.jpg'">
                </div>
                <div class="item-details">
                    <h3>${item.product_name}</h3>
                    <p class="item-price">$${item.price}</p>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn minus" data-action="decrease">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn plus" data-action="increase">+</button>
                </div>
                <div class="item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="remove-item" data-product-id="${item.product_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        this.updateCartSummary();
        this.bindCartItemEvents();
    }

    showEmptyCart() {
        const cartContent = document.querySelector('.cart-content');
        const emptyCart = document.getElementById('emptyCart');
        
        if (cartContent) cartContent.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        
        this.updateCartCounter();
    }

    updateCartSummary() {
        const subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 0; // Free shipping
        const total = subtotal + shipping;

        document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    }

    updateCartCounter() {
        const counter = document.getElementById('cartCounter');
        const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        if (counter) {
            counter.textContent = totalItems;
            counter.style.display = totalItems > 0 ? 'block' : 'none';
        }

        // Update all cart counters on the page
        document.querySelectorAll('.cart-counter').forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'block' : 'none';
        });
    }

    bindEvents() {
        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.handleCheckout());
        }
    }

    bindCartItemEvents() {
        // Quantity buttons
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const cartItem = e.target.closest('.cart-item');
                const productId = cartItem.dataset.productId;
                
                if (action === 'increase') {
                    this.updateQuantity(productId, 1);
                } else if (action === 'decrease') {
                    this.updateQuantity(productId, -1);
                }
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.remove-item').dataset.productId;
                this.removeItem(productId);
            });
        });
    }

    async updateQuantity(productId, change) {
        const item = this.cartItems.find(item => item.product_id === productId);
        if (!item) return;

        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }

        try {
            // Update locally first for immediate feedback
            item.quantity = newQuantity;
            this.renderCart();

            // Then update on server
            // Note: This would need an update quantity endpoint
            // For now, we'll remove and re-add the item
            await api.removeFromCart(this.cartId, productId);
            await api.addToCart(this.cartId, productId, newQuantity);
            
        } catch (error) {
            console.error('Failed to update quantity:', error);
            // Revert local change
            item.quantity -= change;
            this.renderCart();
            this.showNotification('Failed to update quantity', 'error');
        }
    }

    async removeItem(productId) {
        try {
            // Remove locally first
            this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
            this.renderCart();

            // Then remove from server
            await api.removeFromCart(this.cartId, productId);
            this.showNotification('Item removed from cart', 'success');
            
        } catch (error) {
            console.error('Failed to remove item:', error);
            // Reload cart to get correct state
            await this.loadCart();
            this.showNotification('Failed to remove item', 'error');
        }
    }

    async addItem(productId, quantity = 1) {
        try {
            await api.addToCart(this.cartId, productId, quantity);
            await this.loadCart();
            this.showNotification('Item added to cart!', 'success');
        } catch (error) {
            console.error('Failed to add item:', error);
            this.showNotification('Failed to add item to cart', 'error');
        }
    }

    handleCheckout() {
        if (this.cartItems.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }

        if (!api.isAuthenticated()) {
            this.showNotification('Please login to proceed with checkout', 'error');
            // Open auth modal
            document.querySelector('.user-icon').click();
            return;
        }

        // For now, just show a message
        this.showNotification('Checkout functionality coming soon!', 'info');
    }

    showNotification(message, type = 'info') {
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
}

// Global cart manager instance
let cartManager;

// Initialize cart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
});

// Global function to add items to cart (used by other pages)
const addToCartQueue = [];

async function addToCart(productId, quantity = 1) {
    if (cartManager) {
        await cartManager.addItem(productId, quantity);
    } else {
        // Queue the add to cart request until cartManager is initialized
        addToCartQueue.push({ productId, quantity });
    }
}

// Process any queued addToCart calls after cartManager is ready
document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
    if (addToCartQueue.length > 0) {
        addToCartQueue.forEach(async ({ productId, quantity }) => {
            await cartManager.addItem(productId, quantity);
        });
        addToCartQueue.length = 0;
    }
});