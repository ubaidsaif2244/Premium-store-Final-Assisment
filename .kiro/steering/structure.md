# Project Structure

## Root Directory
```
├── backend/           # FastAPI application
├── frontend/          # Static web files
└── README.md         # Project documentation
```

## Backend Structure (`backend/`)
```
backend/
├── .env              # Environment variables
├── config.py         # Configuration management
├── db.py             # Database connection
├── main.py           # FastAPI application entry point
├── requirements.txt  # Python dependencies
├── models/           # Pydantic data models
│   ├── cart.py
│   ├── product.py
│   └── user.py
└── routes/           # API route handlers
    ├── cart.py
    ├── product.py
    └── user.py
```

## Frontend Structure (`frontend/`)
```
frontend/
├── index.html        # Homepage
├── product.html      # Product details page
├── eyeglasses.html   # Eyewear category
├── accessories.html  # Accessories category
├── news.html         # News/blog page
├── css/              # Stylesheets
│   ├── style.css     # Main styles
│   └── component.css # Component-specific styles
├── js/               # JavaScript files
│   ├── script.js     # Main functionality
│   ├── api.js        # API communication
│   ├── cart.js       # Cart functionality
│   └── product-page.js # Product page logic
└── assets/
    └── imgs/         # Product images and assets
```

## Conventions
- **Backend**: Follow FastAPI patterns with separate route and model files
- **Frontend**: Semantic HTML structure with modular CSS/JS
- **API**: RESTful endpoints under `/api` prefix (implied)
- **Images**: Store in `frontend/assets/imgs/` with descriptive names
- **Naming**: Use kebab-case for files, snake_case for Python modules