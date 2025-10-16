# Technology Stack

## Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB with Motor (async driver)
- **Configuration**: python-dotenv for environment variables
- **Data Validation**: Pydantic models
- **Server**: Uvicorn ASGI server

## Frontend
- **Type**: Static HTML/CSS/JavaScript
- **Styling**: Custom CSS with Font Awesome icons
- **Fonts**: Google Fonts (Poppins)
- **Structure**: Multi-page application (index, product, cart, etc.)

## Development Setup

### Backend Commands
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload

# Run on specific port
uvicorn main:app --reload --port 8000
```

### Frontend
- Serve static files from `frontend/` directory
- No build process required - direct HTML/CSS/JS

## Environment Configuration
- Backend uses `.env` file for MongoDB connection
- Default MongoDB: `mongodb://localhost:27017`
- Database name: `monata_store`