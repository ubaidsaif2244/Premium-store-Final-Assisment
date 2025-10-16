// 🌟 Complete API Service for MATOA Store
const API_BASE_URL = 'http://localhost:8000/api';

class APIService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('matoa_token');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('matoa_token', token);
    }

    // Remove authentication token
    removeToken() {
        this.token = null;
        localStorage.removeItem('matoa_token');
    }

    // Get authentication headers
    getAuthHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getAuthHeaders(),
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                if (response.status === 401) {
                    this.removeToken();
                    throw new Error('Authentication required. Please login.');
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Backend server is not running. Please start the server at http://localhost:8000');
            }
            console.error('API request failed:', error);
            throw error;
        }
    }

    // ===== PRODUCT METHODS =====
    async getProducts(category = null) {
        const params = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
        return this.request(`/products${params}`);
    }

    async getProduct(productId) {
        return this.request(`/products/${productId}`);
    }

    async createProduct(productData) {
        return this.request('/products', {
            method: 'POST',
            body: JSON.stringify(productData),
        });
    }

    async updateProduct(productId, productData) {
        return this.request(`/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
        });
    }

    async deleteProduct(productId) {
        return this.request(`/products/${productId}`, {
            method: 'DELETE',
        });
    }

    // ===== USER METHODS =====
    async registerUser(userData) {
        const response = await this.request('/users/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        if (response.access_token) {
            this.setToken(response.access_token);
        }
        return response;
    }

    async loginUser(email, password) {
        const response = await this.request('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (response.access_token) {
            this.setToken(response.access_token);
        }
        return response;
    }

    async getUserProfile() {
        return this.request('/users/profile');
    }

    async updateUserProfile(userData) {
        return this.request('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async logoutUser() {
        try {
            await this.request('/users/logout', { method: 'POST' });
        } finally {
            this.removeToken();
        }
    }

    // ===== CART METHODS =====
    async createCart(userId = null, sessionId = null) {
        return this.request('/cart', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, session_id: sessionId }),
        });
    }

    async getCart(cartId) {
        return this.request(`/cart/${cartId}`);
    }

    async addToCart(cartId, productId, quantity = 1) {
        return this.request(`/cart/${cartId}/items`, {
            method: 'POST',
            body: JSON.stringify({ product_id: productId, quantity }),
        });
    }

    async removeFromCart(cartId, productId) {
        return this.request(`/cart/${cartId}/items/${productId}`, {
            method: 'DELETE',
        });
    }

    // ===== UTILITY METHODS =====
    isAuthenticated() {
        return !!this.token;
    }

    async checkServerHealth() {
        try {
            const response = await fetch(`${this.baseURL.replace('/api', '')}/health`);
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Create global API instance
const api = new APIService();

// ===== CART STORAGE UTILITIES =====
const CartStorage = {
    getCartId() {
        return localStorage.getItem('matoa_cart_id');
    },
    
    setCartId(cartId) {
        localStorage.setItem('matoa_cart_id', cartId);
    },
    
    clearCartId() {
        localStorage.removeItem('matoa_cart_id');
    },
    
    getSessionId() {
        let sessionId = localStorage.getItem('matoa_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('matoa_session_id', sessionId);
        }
        return sessionId;
    }
};

// ===== USER STORAGE UTILITIES =====
const UserStorage = {
    getCurrentUser() {
        const userStr = localStorage.getItem('matoa_current_user');
        return userStr ? JSON.parse(userStr) : null;
    },
    
    setCurrentUser(user) {
        localStorage.setItem('matoa_current_user', JSON.stringify(user));
    },
    
    clearCurrentUser() {
        localStorage.removeItem('matoa_current_user');
    }
};

// ===== INITIALIZATION FUNCTIONS =====
async function initializeCart() {
    let cartId = CartStorage.getCartId();
    
    if (!cartId) {
        try {
            const sessionId = CartStorage.getSessionId();
            const currentUser = UserStorage.getCurrentUser();
            const userId = currentUser ? currentUser._id : null;
            
            const response = await api.createCart(userId, sessionId);
            cartId = response.cart_id;
            CartStorage.setCartId(cartId);
        } catch (error) {
            console.error('Failed to create cart:', error);
        }
    }
    
    return cartId;
}

// ===== AUTHENTICATION HELPERS =====
function updateAuthUI() {
    const isAuthenticated = api.isAuthenticated();
    const currentUser = UserStorage.getCurrentUser();
    
    // Update user icon in navigation
    const userIcon = document.querySelector('.fa-user').parentElement;
    if (isAuthenticated && currentUser) {
        userIcon.innerHTML = `<i class="fas fa-user-circle nav-btns"></i>`;
        userIcon.title = `Welcome, ${currentUser.full_name}`;
    } else {
        userIcon.innerHTML = `<i class="fa-regular fa-user nav-btns"></i>`;
        userIcon.title = 'Login / Register';
    }
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});