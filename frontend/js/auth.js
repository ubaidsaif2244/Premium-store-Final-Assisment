// 🔐 Authentication 

class AuthManager {
    constructor() {
        this.initializeAuthModal();
        this.bindEvents();
    }

    initializeAuthModal() {
        // Create auth modal HTML
        const authModalHTML = `
            <div class="auth-modal" id="authModal">
                <div class="auth-modal-content">
                    <span class="close-auth-modal" id="closeAuthModal">&times;</span>
                    
                    <!-- Login Form -->
                    <div class="auth-form" id="loginForm">
                        <h2>Welcome Back</h2>
                        <p>Sign in to your MATOA account</p>
                        
                        <form id="loginFormElement">
                            <div class="form-group">
                                <label for="loginEmail">Email</label>
                                <input type="email" id="loginEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="loginPassword">Password</label>
                                <input type="password" id="loginPassword" required>
                            </div>
                            <button type="submit" class="auth-btn">Sign In</button>
                        </form>
                        
                        <p class="auth-switch">
                            Don't have an account? 
                            <a href="#" id="showRegister">Create one</a>
                        </p>
                    </div>
                    
                    <!-- Register Form -->
                    <div class="auth-form" id="registerForm" style="display: none;">
                        <h2>Create Account</h2>
                        <p>Join MATOA for exclusive benefits</p>
                        
                        <form id="registerFormElement">
                            <div class="form-group">
                                <label for="registerName">Full Name</label>
                                <input type="text" id="registerName" required>
                            </div>
                            <div class="form-group">
                                <label for="registerEmail">Email</label>
                                <input type="email" id="registerEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="registerPassword">Password</label>
                                <input type="password" id="registerPassword" required minlength="6">
                            </div>
                            <div class="form-group">
                                <label for="registerPhone">Phone (Optional)</label>
                                <input type="tel" id="registerPhone">
                            </div>
                            <button type="submit" class="auth-btn">Create Account</button>
                        </form>
                        
                        <p class="auth-switch">
                            Already have an account? 
                            <a href="#" id="showLogin">Sign in</a>
                        </p>
                    </div>
                    
                    <!-- User Profile -->
                    <div class="user-profile" id="userProfile" style="display: none;">
                        <h2>My Profile</h2>
                        <div class="profile-info">
                            <p><strong>Name:</strong> <span id="profileName"></span></p>
                            <p><strong>Email:</strong> <span id="profileEmail"></span></p>
                            <p><strong>Phone:</strong> <span id="profilePhone"></span></p>
                        </div>
                        <div class="profile-actions">
                            <button class="auth-btn" id="editProfile">Edit Profile</button>
                            <button class="auth-btn secondary" id="logoutBtn">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', authModalHTML);

        // Add CSS
        this.addAuthStyles();
    }

    addAuthStyles() {
        const authCSS = `
            <style>
                .auth-modal {
                    display: none;
                    position: fixed;
                    z-index: 2000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(5px);
                }

                .auth-modal-content {
                    position: relative;
                    background-color: #fff;
                    margin: 5% auto;
                    padding: 40px;
                    border-radius: 20px;
                    width: 90%;
                    max-width: 450px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.4s ease;
                }

                .close-auth-modal {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    color: #666;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .close-auth-modal:hover {
                    color: #c7543e;
                }

                .auth-form h2 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                    font-size: 1.8rem;
                }

                .auth-form p {
                    color: #666;
                    margin-bottom: 30px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    color: #2c3e50;
                    font-weight: 500;
                }

                .form-group input {
                    width: 100%;
                    padding: 12px 15px;
                    border: 2px solid #e0e0e0;
                    border-radius: 10px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                    box-sizing: border-box;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: #c7543e;
                }

                .auth-btn {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, #c7543e, #d4654f);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-bottom: 20px;
                }

                .auth-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(199, 84, 62, 0.3);
                }

                .auth-btn.secondary {
                    background: #6c757d;
                }

                .auth-btn.secondary:hover {
                    background: #5a6268;
                    box-shadow: 0 8px 25px rgba(108, 117, 125, 0.3);
                }

                .auth-switch {
                    text-align: center;
                    color: #666;
                }

                .auth-switch a {
                    color: #c7543e;
                    text-decoration: none;
                    font-weight: 500;
                }

                .auth-switch a:hover {
                    text-decoration: underline;
                }

                .profile-info p {
                    margin-bottom: 10px;
                    padding: 10px;
                    background: #f8f9fa;
                    border-radius: 8px;
                }

                .profile-actions {
                    display: flex;
                    gap: 10px;
                }

                .profile-actions .auth-btn {
                    margin-bottom: 0;
                }

                @media (max-width: 768px) {
                    .auth-modal-content {
                        margin: 10% auto;
                        padding: 30px 20px;
                    }
                    
                    .profile-actions {
                        flex-direction: column;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', authCSS);
    }

    bindEvents() {
        // Modal controls
        document.getElementById('closeAuthModal').addEventListener('click', () => this.closeModal());
        document.getElementById('authModal').addEventListener('click', (e) => {
            if (e.target.id === 'authModal') this.closeModal();
        });

        // Form switching
        document.getElementById('showRegister').addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegisterForm();
        });

        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        // Form submissions
        document.getElementById('loginFormElement').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerFormElement').addEventListener('submit', (e) => this.handleRegister(e));

        // Profile actions
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());

        // User icon click (using data attribute for reliability)
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-auth-trigger]')) {
                e.preventDefault();
                this.openModal();
            }
        });
    }

    openModal() {
        const modal = document.getElementById('authModal');
        const isAuthenticated = api.isAuthenticated();
        
        if (isAuthenticated) {
            this.showUserProfile();
        } else {
            this.showLoginForm();
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('authModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showLoginForm() {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('userProfile').style.display = 'none';
    }

    showRegisterForm() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('userProfile').style.display = 'none';
    }

    showUserProfile() {
        const currentUser = UserStorage.getCurrentUser();
        if (currentUser) {
            document.getElementById('profileName').textContent = currentUser.full_name;
            document.getElementById('profileEmail').textContent = currentUser.email;
            document.getElementById('profilePhone').textContent = currentUser.phone || 'Not provided';
        }
        
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('userProfile').style.display = 'block';
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        try {
            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;
            
            const response = await api.loginUser(email, password);
            UserStorage.setCurrentUser(response.user);
            
            this.showNotification('Login successful!', 'success');
            this.closeModal();
            updateAuthUI();
            
        } catch (error) {
            this.showNotification(error.message, 'error');
        } finally {
            submitBtn.textContent = 'Sign In';
            submitBtn.disabled = false;
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const formData = {
            full_name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value,
            phone: document.getElementById('registerPhone').value || null
        };
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        try {
            submitBtn.textContent = 'Creating account...';
            submitBtn.disabled = true;
            
            const response = await api.registerUser(formData);
            
            // Get user profile after registration
            const userProfile = await api.getUserProfile();
            UserStorage.setCurrentUser(userProfile.user);
            
            this.showNotification('Account created successfully!', 'success');
            this.closeModal();
            updateAuthUI();
            
        } catch (error) {
            this.showNotification(error.message, 'error');
        } finally {
            submitBtn.textContent = 'Create Account';
            submitBtn.disabled = false;
        }
    }

    async handleLogout() {
        try {
            await api.logoutUser();
            UserStorage.clearCurrentUser();
            CartStorage.clearCartId(); // Clear cart on logout
            
            this.showNotification('Logged out successfully', 'success');
            this.closeModal();
            updateAuthUI();
            
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout even if API call fails
            api.removeToken();
            UserStorage.clearCurrentUser();
            updateAuthUI();
            this.closeModal();
        }
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
            z-index: 2001;
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

// Initialize authentication system
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
    // Optionally, add data-auth-trigger to user icon(s) if not already present
    // Example:
    // document.querySelectorAll('.fa-user, .fa-user-circle').forEach(el => el.setAttribute('data-auth-trigger', 'true'));
});