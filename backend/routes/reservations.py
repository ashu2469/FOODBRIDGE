from fastapi import APIRouter
from models.reservation import Reservation
from database import get_connection

router = APIRouter()

@router.post("/create")
def create_reservation(reservation: Reservation):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO reservations (listing_id, receiver_id, pickup_time, notes) VALUES (%s, %s, %s, %s)",
        (reservation.listing_id, reservation.receiver_id, reservation.pickup_time, reservation.notes)
    )
    cursor.execute(
        "UPDATE food_listings SET status = 'reserved' WHERE id = %s",
        (reservation.listing_id,)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Reservation created successfully"}

@router.get("/user/{user_id}")
def get_user_reservations(user_id: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        """SELECT r.*, f.title, f.pickup_address, f.expiry_time 
        FROM reservations r 
        JOIN food_listings f ON r.listing_id = f.id 
        WHERE r.receiver_id = %s""",
        (user_id,)
    )
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

@router.get("/all")
def get_all_reservations():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM reservations WHERE status = 'pending' ORDER BY reserved_at DESC")
    listings = cursor.fetchall()
    cursor.close()
    conn.close()
    return listings

@router.get("/receiver/{receiver_id}")
def get_my_listings(receiver_id: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM reservations WHERE receiver_id = %s AND status = 'pending'", (receiver_id,))
    listings = cursor.fetchall()
    cursor.close()
    conn.close()
    return listings