from fastapi import FastAPI
from routes import product

app = FastAPI(title="Shop API")

# Include routers
app.include_router(product.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Shop API"}
