from fastapi import APIRouter
from models.user import User
from database import get_connection

router = APIRouter()

@router.post("/register")
def register_user(user: User):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (id, name, email, role, phone, address, city, latitude, longitude) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (user.id, user.name, user.email, user.role, user.phone, user.address, user.city, user.latitude, user.longitude)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "User registered successfully"}

@router.get("/user/{user_id}")
def get_user(user_id: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    return user