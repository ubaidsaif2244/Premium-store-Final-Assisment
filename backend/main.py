from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import product, cart, user

app = FastAPI(
    title="MATOA Store API",
    description="Premium wooden accessories e-commerce API with authentication",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(product.router)
app.include_router(cart.router)
app.include_router(user.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to MATOA Store API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "products": "/api/products",
            "cart": "/api/cart",
            "users": "/api/users"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}