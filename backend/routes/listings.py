from fastapi import APIRouter
from models.listing import FoodListing
from database import get_connection

router = APIRouter()

@router.post("/create")
def create_listing(listing: FoodListing):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """INSERT INTO food_listings 
        (donor_id, title, description, quantity, food_type, listing_type, price, freshness_window, expiry_time, pickup_address, city, latitude, longitude, image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
        (listing.donor_id, listing.title, listing.description, listing.quantity,
         listing.food_type, listing.listing_type, listing.price, listing.freshness_window,
         listing.expiry_time, listing.pickup_address, listing.city,
         listing.latitude, listing.longitude, listing.image_url)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Listing created successfully"}

@router.get("/all")
def get_all_listings():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM food_listings WHERE status = 'available' ORDER BY created_at DESC")
    listings = cursor.fetchall()
    cursor.close()
    conn.close()
    return listings

@router.get("/city/{city}")
def get_listings_by_city(city: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM food_listings WHERE city = %s AND status = 'available'", (city,))
    listings = cursor.fetchall()
    cursor.close()
    conn.close()
    return listings

@router.put("/status/{listing_id}")
def update_status(listing_id: int, status: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE food_listings SET status = %s WHERE id = %s", (status, listing_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Status updated"}

@router.get("/donor/{donor_id}")
def get_my_listings(donor_id: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM food_listings WHERE donor_id = %s AND status = 'available'", (donor_id,))
    listings = cursor.fetchall()
    cursor.close()
    conn.close()
    return listings