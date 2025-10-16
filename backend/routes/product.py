from fastapi import APIRouter, HTTPException, status, Query
from models.product import Product, ProductCreate, ProductUpdate
from db import get_db
from bson import ObjectId
from typing import Optional, List

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductCreate):
    db = get_db()
    new_product = product.dict()
    result = await db.products.insert_one(new_product)
    return {"message": "Product created successfully", "id": str(result.inserted_id)}

@router.get("/", response_model=List[Product])
async def get_all_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: int = Query(100, ge=1, le=1000, description="Number of products to return")
):
    db = get_db()
    filter_query = {}
    if category and category.lower() != "all":
        filter_query["category"] = {"$regex": category, "$options": "i"}
    
    products = await db.products.find(filter_query).limit(limit).to_list(limit)
    for product in products:
        product["_id"] = str(product["_id"])
    return products

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    db = get_db()
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID format")
    
    product = await db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product["_id"] = str(product["_id"])
    return product

@router.put("/{product_id}")
async def update_product(product_id: str, product: ProductUpdate):
    db = get_db()
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID format")
    
    update_data = {k: v for k, v in product.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No valid fields to update")
    
    result = await db.products.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product updated successfully"}

@router.delete("/{product_id}")
async def delete_product(product_id: str):
    db = get_db()
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID format")
    
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

@router.get("/category/{category}")
async def get_products_by_category(category: str):
    db = get_db()
    products = await db.products.find(
        {"category": {"$regex": category, "$options": "i"}}
    ).to_list(100)
    for product in products:
        product["_id"] = str(product["_id"])
    return products