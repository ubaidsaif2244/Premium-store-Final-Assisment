import subprocess
import sys
import os

def main():
    print("🏪 Starting MATOA Store Backend")
    print("=" * 40)
    
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    os.chdir(backend_dir)
    
    print("📍 Backend directory:", os.getcwd())
    print("🌱 Seeding database...")
    
    # Seed database
    try:
        subprocess.run([sys.executable, "seed_data.py"], check=True)
        print("✅ Database seeded successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to seed database: {e}")
        print("⚠️  Continuing anyway...")
    
    print("\n🚀 Starting API server...")
    print("📍 Server will be available at: http://localhost:8000")
    print("📖 API Documentation: http://localhost:8000/docs")
    print("🛑 Press Ctrl+C to stop the server\n")
    
    # Start server
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--reload", 
            "--host", "0.0.0.0", 
            "--port", "8000"
        ], check=True)
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to start server: {e}")

if __name__ == "__main__":
    main()