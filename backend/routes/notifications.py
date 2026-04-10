from fastapi import APIRouter
from database import get_connection

router = APIRouter()

@router.get("/{user_id}")
def get_notifications(user_id: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM notifications WHERE user_id = %s ORDER BY created_at DESC",
        (user_id,)
    )
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

@router.put("/read/{notification_id}")
def mark_read(notification_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE notifications SET is_read = TRUE WHERE id = %s", (notification_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Marked as read"}