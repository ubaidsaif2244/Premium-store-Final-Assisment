from fastapi import APIRouter, HTTPException, status
from models.cart import Cart, CartItemAdd, CartItemUpdate
from db import get_db
from bson import ObjectId
from typing import Optional
from datetime import datetime

router = APIRouter(prefix="/api/cart", tags=["Cart"])

@router.post("/")
async def create_cart(user_id: Optional[str] = None, session_id: Optional[str] = None):
    db = get_db()
    cart_data = {
        "user_id": user_id,
        "session_id": session_id,
        "items": [],
        "total_amount": 0.0,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
    result = await db.carts.insert_one(cart_data)
    return {"message": "Cart created successfully", "cart_id": str(result.inserted_id)}

@router.get("/{cart_id}")
async def get_cart(cart_id: str):
    db = get_db()
    if not ObjectId.is_valid(cart_id):
        raise HTTPException(status_code=400, detail="Invalid cart ID format")
    
    cart = await db.carts.find_one({"_id": ObjectId(cart_id)})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    cart["_id"] = str(cart["_id"])
    return cart

@router.post("/{cart_id}/items")
async def add_item_to_cart(cart_id: str, item: CartItemAdd):
    db = get_db()
    if not ObjectId.is_valid(cart_id):
        raise HTTPException(status_code=400, detail="Invalid cart ID format")
    
    # Get product details
    if not ObjectId.is_valid(item.product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID format")
    
    product = await db.products.find_one({"_id": ObjectId(item.product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get current cart
    cart = await db.carts.find_one({"_id": ObjectId(cart_id)})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Check if item already exists in cart
    existing_item_index = None
    for i, cart_item in enumerate(cart.get("items", [])):
        if cart_item["product_id"] == item.product_id:
            existing_item_index = i
            break
    
    if existing_item_index is not None:
        # Update quantity of existing item
        cart["items"][existing_item_index]["quantity"] += item.quantity
    else:
        # Add new item to cart
        new_item = {
            "product_id": item.product_id,
            "product_name": product["name"],
            "price": product["price"],
            "quantity": item.quantity,
            "image_url": product.get("image_url")
        }
        cart["items"].append(new_item)
    
    # Recalculate total
    total_amount = sum(item["price"] * item["quantity"] for item in cart["items"])
    
    # Update cart in database
    await db.carts.update_one(
        {"_id": ObjectId(cart_id)},
        {
            "$set": {
                "items": cart["items"],
                "total_amount": total_amount,
                "updated_at": datetime.utcnow().isoformat()
            }
        }
    )
    
    return {"message": "Item added to cart successfully"}

@router.delete("/{cart_id}/items/{product_id}")
async def remove_item_from_cart(cart_id: str, product_id: str):
    db = get_db()
    if not ObjectId.is_valid(cart_id):
        raise HTTPException(status_code=400, detail="Invalid cart ID format")
    
    cart = await db.carts.find_one({"_id": ObjectId(cart_id)})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Remove the item
    original_length = len(cart.get("items", []))
    cart["items"] = [item for item in cart.get("items", []) if item["product_id"] != product_id]
    
    if len(cart["items"]) == original_length:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    # Recalculate total
    total_amount = sum(item["price"] * item["quantity"] for item in cart["items"])
    
    # Update cart in database
    await db.carts.update_one(
        {"_id": ObjectId(cart_id)},
        {
            "$set": {
                "items": cart["items"],
                "total_amount": total_amount,
                "updated_at": datetime.utcnow().isoformat()
            }
        }
    )
    
    return {"message": "Item removed from cart successfully"}