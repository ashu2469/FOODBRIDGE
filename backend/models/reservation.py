from pydantic import BaseModel
from typing import Optional

class Reservation(BaseModel):
    listing_id: int
    receiver_id: str
    pickup_time: Optional[str] = None
    notes: Optional[str] = None