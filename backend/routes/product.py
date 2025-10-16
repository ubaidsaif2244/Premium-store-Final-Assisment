from fastapi import APIRouter, HTTPException, status
from models.product import Product
from db import get_db
from bson import ObjectId

router = APIRouter(prefix="/products", tags=["Products"])

db = get_db()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_product(product: Product):
    new_product = product.dict(by_alias=True)
    result = await db.products.insert_one(new_product)
    return {"message": "Product created successfully", "id": str(result.inserted_id)}

@router.get("/")
async def get_all_products():
    products = await db.products.find().to_list(100)
    for product in products:
        product["_id"] = str(product["_id"])
    return products

@router.get("/{product_id}")
async def get_product(product_id: str):
    product = await db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product["_id"] = str(product["_id"])
    return product

@router.put("/{product_id}")
async def update_product(product_id: str, product: Product):
    result = await db.products.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": product.dict(by_alias=True)}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Product not found or no changes made")
    return {"message": "Product updated successfully"}

@router.delete("/{product_id}")
async def delete_product(product_id: str):
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}
