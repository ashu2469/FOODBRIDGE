from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, listings, reservations, notifications

app = FastAPI(title="FoodBridge API")

# Configure CORS properly
allowed_origins = [
    "http://localhost:5173",  # Local development
    "http://localhost:3000",  # Alternative local
    "https://foodbridge-backend-guhe.onrender.com",  # Your deployed backend (for preflight requests)
    # Add your deployed frontend URL here when ready
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    max_age=600,
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(listings.router, prefix="/listings", tags=["Listings"])
app.include_router(reservations.router, prefix="/reservations", tags=["Reservations"])
app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])

@app.get("/")
def root():
    return {"message": "FoodBridge API is running!"}
