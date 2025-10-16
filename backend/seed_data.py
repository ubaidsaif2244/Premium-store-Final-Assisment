import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGO_URL, MONGO_DB_NAME

# Sample product data based on the frontend
sample_products = [
    # Accessories
    {
        "name": "Walnut Wood Bracelet",
        "category": "Bracelets",
        "price": 79,
        "description": "Handcrafted walnut wood bracelet with natural finish.",
        "image_url": "https://i.pinimg.com/736x/4e/ab/5d/4eab5d137f403fc783fbf6ab279479a5.jpg",
        "material": "Walnut Wood",
        "rating": 4.5,
        "colors": ["Natural Walnut"],
        "in_stock": True,
        "discount_percentage": 0
    },
    {
        "name": "Ebony Ring Set",
        "category": "Rings", 
        "price": 95,
        "description": "Elegant ebony wood ring set for sophisticated style.",
        "image_url": "https://i.pinimg.com/736x/2d/1c/c5/2d1cc5b7c1f8a62e849669bafa3fd2e7.jpg",
        "material": "Ebony Wood",
        "rating": 4.6,
        "colors": ["Dark Ebony"],
        "in_stock": True,
        "discount_percentage": 0
    },
    {
        "name": "Classic Maple Cufflinks",
        "category": "Cufflinks",
        "price": 120,
        "description": "Premium maple wood cufflinks for formal occasions.",
        "image_url": "https://i.pinimg.com/736x/89/e0/ee/89e0eec6c5d92061a6ad4d555d982033.jpg",
        "material": "Maple Wood + Metal",
        "rating": 4.8,
        "colors": ["Natural Maple"],
        "in_stock": True,
        "discount_percentage": 0
    },
    {
        "name": "Premium Leather Strap",
        "category": "Straps",
        "price": 89,
        "description": "High-quality leather watch strap with wooden accents.",
        "image_url": "https://i.pinimg.com/1200x/1f/08/02/1f0802e23edffc49e152fb9a9e64c8b9.jpg",
        "material": "Leather + Wood",
        "rating": 4.4,
        "colors": ["Brown", "Black"],
        "in_stock": True,
        "discount_percentage": 0
    },
    {
        "name": "Rosewood Bead Bracelet",
        "category": "Bracelets",
        "price": 82,
        "description": "Beautiful rosewood bead bracelet with natural patterns.",
        "image_url": "https://i.pinimg.com/1200x/a4/3b/a1/a43ba1ca4a8c139bf02071a2e761feb5.jpg",
        "material": "Rosewood",
        "rating": 4.3,
        "colors": ["Natural Rosewood"],
        "in_stock": True,
        "discount_percentage": 0
    },
    # Watches
    {
        "name": "Way Kambas Maple",
        "category": "Watches",
        "price": 1280,
        "description": "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin.",
        "image_url": "https://yourdomain.com/assets/imgs/mapll-1.png",
        "material": "Maple Wood + Quartz Movement",
        "rating": 4.9,
        "colors": ["Light Brown", "Dark Walnut"],
        "in_stock": True,
        "discount_percentage": 0
    },
    {
        "name": "Luxurious Eyewear",
        "category": "Eyewear",
        "price": 349,
        "description": "See the beauty of exotic world with the luxurious glasses",
        "image_url": "assets/imgs/promotion-1.png",
        "material": "Wooden Frame + Polarized Lens",
        "rating": 4.7,
        "colors": ["Brown", "Black", "Ash"],
        "in_stock": True,
        "discount_percentage": 0
    }
]

async def seed_database():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[MONGO_DB_NAME]
    
    # Clear existing products
    await db.products.delete_many({})
    
    # Insert sample products
    result = await db.products.insert_many(sample_products)
    print(f"Inserted {len(result.inserted_ids)} products into the database")
    
    # Create indexes for better performance
    await db.products.create_index("category")
    await db.products.create_index("name")
    
    print("Database seeded successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())