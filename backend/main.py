from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, listings, reservations, notifications

app = FastAPI(title="FoodBridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(listings.router, prefix="/listings", tags=["Listings"])
app.include_router(reservations.router, prefix="/reservations", tags=["Reservations"])
app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])

@app.get("/")
def root():
    return {"message": "FoodBridge API is running!"}
