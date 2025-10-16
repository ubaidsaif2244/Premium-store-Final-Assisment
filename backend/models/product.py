from pydantic import BaseModel, Field
from typing import Optional, List
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class Product(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1, max_length=50)
    price: float = Field(..., gt=0)
    description: Optional[str] = Field(None, max_length=500)
    image_url: Optional[str] = None
    material: Optional[str] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    colors: Optional[List[str]] = []
    in_stock: bool = Field(default=True)
    discount_percentage: Optional[float] = Field(None, ge=0, le=100)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1, max_length=50)
    price: float = Field(..., gt=0)
    description: Optional[str] = Field(None, max_length=500)
    image_url: Optional[str] = None
    material: Optional[str] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    colors: Optional[List[str]] = []
    in_stock: bool = Field(default=True)
    discount_percentage: Optional[float] = Field(None, ge=0, le=100)

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    category: Optional[str] = Field(None, min_length=1, max_length=50)
    price: Optional[float] = Field(None, gt=0)
    description: Optional[str] = Field(None, max_length=500)
    image_url: Optional[str] = None
    material: Optional[str] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    colors: Optional[List[str]] = None
    in_stock: Optional[bool] = None
    discount_percentage: Optional[float] = Field(None, ge=0, le=100)