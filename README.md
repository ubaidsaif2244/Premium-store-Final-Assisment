# 🏪 MATOA Store - Premium Wooden Accessories E-commerce

A complete e-commerce platform for premium wooden accessories including watches, eyewear, and accessories. Built with FastAPI backend, MongoDB database, and vanilla JavaScript frontend.

## ✨ Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse watches, eyewear, and accessories
- **Product Details**: Interactive modals with complete product information
- **Shopping Cart**: Add/remove items, quantity management
- **Category Filtering**: Filter products by category
- **Search & Discovery**: Easy product browsing

### 🔐 User Authentication
- **User Registration**: Create new accounts
- **Login/Logout**: Secure authentication with JWT tokens
- **User Profile**: Manage personal information
- **Session Management**: Persistent login sessions

### 📱 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Modals**: Product details, authentication
- **Smooth Animations**: Fade effects, hover transitions
- **Professional Styling**: Modern gradient designs
- **Notification System**: Success/error messages

### 🛒 Shopping Experience
- **Product Modal**: Detailed product view with images, ratings, colors
- **Quantity Selector**: Adjust quantities before adding to cart
- **Wishlist**: Save favorite products
- **Cart Management**: View, update, and remove cart items
- **Checkout Ready**: Foundation for payment integration

## 🏗️ Architecture

### Backend (FastAPI + MongoDB)
```
backend/
├── main.py              # FastAPI application entry point
├── config.py            # Configuration management
├── db.py               # Database connection
├── seed_data.py        # Sample data seeder
├── requirements.txt    # Python dependencies
├── models/             # Pydantic data models
│   ├── product.py      # Product model
│   ├── user.py         # User model with authentication
│   └── cart.py         # Shopping cart model
└── routes/             # API endpoints
    ├── product.py      # Product CRUD operations
    ├── user.py         # Authentication & user management
    └── cart.py         # Cart operations
```

### Frontend (Vanilla JavaScript)
```
frontend/
├── index.html          # Homepage
├── product.html        # Watches page
├── eyeglasses.html     # Eyewear page
├── accessories.html    # Accessories page
├── news.html          # News & updates
├── cart.html          # Shopping cart page
├── css/               # Stylesheets
│   ├── style.css      # Main styles
│   └── modal.css      # Modal & component styles
└── js/                # JavaScript modules
    ├── api-service.js  # API communication layer
    ├── auth.js         # Authentication system
    ├── cart.js         # Cart management
    ├── api.js          # Accessories page logic
    ├── eyeglasses.js   # Eyewear page logic
    ├── news.js         # News page functionality
    ├── product-page.js # Product page logic
    └── script.js       # Shared functionality
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- MongoDB (running on localhost:27017)
- Modern web browser

### 1. Clone Repository
```bash
git clone <repository-url>
cd matoa-store
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Seed database with sample data
python seed_data.py

# Start API server
python -m uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
# Open frontend files in browser
# Start with: frontend/index.html
```

### 4. Access Application
- **Frontend**: Open `frontend/index.html` in browser
- **API Documentation**: http://localhost:8000/docs
- **API Health**: http://localhost:8000/health

## 📋 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Watches` - Filter by category
- `GET /api/products/{id}` - Get specific product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update profile (authenticated)
- `POST /api/users/logout` - Logout user

### Shopping Cart
- `POST /api/cart` - Create new cart
- `GET /api/cart/{id}` - Get cart details
- `POST /api/cart/{id}/items` - Add item to cart
- `DELETE /api/cart/{id}/items/{product_id}` - Remove item

## 🎨 Key Features Walkthrough

### Product Modal System
- Click any product image or "Quick View" button
- Interactive modal with complete product details
- Quantity selector with +/- buttons
- Add to cart and wishlist functionality
- Responsive design for all screen sizes

### Authentication Flow
- Click user icon in navigation
- Toggle between login and registration forms
- JWT-based authentication with secure token storage
- Persistent login sessions across browser refreshes

### Shopping Cart
- Add products from any page
- View cart with product images and details
- Update quantities or remove items
- Real-time total calculation
- Cart counter in navigation

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface elements
- Optimized images and loading states

## 🛠️ Development

### Adding New Products
1. Use the API endpoint: `POST /api/products`
2. Or add to `backend/seed_data.py` and re-run seeder

### Customizing Styles
- Main styles: `frontend/css/style.css`
- Modal styles: `frontend/css/modal.css`
- Color scheme: Update CSS custom properties

### Adding New Pages
1. Create HTML file in `frontend/`
2. Include required scripts: `api-service.js`, `auth.js`
3. Add navigation links in all pages

## 🔧 Configuration

### Environment Variables
```bash
# backend/.env
MONGO_URL=mongodb://localhost:27017
MONGO_DB_NAME=matoa_store
JWT_SECRET_KEY=your_secret_key_here
```

### Database Collections
- `products` - Product catalog
- `users` - User accounts
- `carts` - Shopping carts

## 📱 Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🎯 Future Enhancements
- Payment integration (Stripe/PayPal)
- Order management system
- Admin dashboard
- Product reviews and ratings
- Email notifications
- Inventory management
- Multi-language support

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License
This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Backend Won't Start
- Check Python version (3.8+)
- Install dependencies: `pip install -r requirements.txt`
- Ensure MongoDB is running

### Products Not Loading
- Verify backend is running on port 8000
- Check browser console for errors
- Ensure CORS is enabled in backend

### Authentication Issues
- Clear browser localStorage
- Check JWT token expiration
- Verify API endpoints are accessible

---

**Built with ❤️ for premium wooden accessories**