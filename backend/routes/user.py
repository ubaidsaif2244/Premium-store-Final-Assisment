from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models.user import User, UserCreate, UserUpdate, UserLogin
from db import get_db
from bson import ObjectId
import bcrypt
import jwt
import os
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/users", tags=["Users"])
security = HTTPBearer()

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "matoa_secret_key_2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password using bcrypt"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict):
    """Create JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current authenticated user"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    db = get_db()
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    user["_id"] = str(user["_id"])
    user.pop("password", None)  # Remove password from response
    return user

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate):
    db = get_db()
    
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password and create user
    user_data = user.dict()
    user_data["password"] = hash_password(user_data["password"])
    user_data["created_at"] = datetime.utcnow().isoformat()
    user_data["is_active"] = True
    
    result = await db.users.insert_one(user_data)
    
    # Create access token
    access_token = create_access_token(data={"sub": str(result.inserted_id)})
    
    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id),
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/login")
async def login_user(user_login: UserLogin):
    db = get_db()
    user = await db.users.find_one({"email": user_login.email})
    
    if not user or not verify_password(user_login.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not user.get("is_active", True):
        raise HTTPException(status_code=401, detail="Account is deactivated")
    
    # Create access token
    access_token = create_access_token(data={"sub": str(user["_id"])})
    
    # Remove password from response
    user.pop("password", None)
    user["_id"] = str(user["_id"])
    
    return {
        "message": "Login successful",
        "user": user,
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/profile")
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    return {"user": current_user}

@router.put("/profile")
async def update_user_profile(user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
    db = get_db()
    
    update_data = {k: v for k, v in user_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No valid fields to update")
    
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    result = await db.users.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "Profile updated successfully"}

@router.post("/logout")
async def logout_user(current_user: dict = Depends(get_current_user)):
    # In a real application, you might want to blacklist the token
    return {"message": "Logged out successfully"}

@router.delete("/account")
async def delete_user_account(current_user: dict = Depends(get_current_user)):
    db = get_db()
    
    # Soft delete - deactivate account
    result = await db.users.update_one(
        {"_id": ObjectId(current_user["_id"])},
        {"$set": {"is_active": False, "deleted_at": datetime.utcnow().isoformat()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "Account deactivated successfully"}