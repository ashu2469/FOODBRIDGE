from pydantic import BaseModel
from typing import Optional

class FoodListing(BaseModel):
    donor_id: str
    title: str
    description: Optional[str] = None
    quantity: str
    food_type: str
    listing_type: str = "donate"
    price: float = 0.0
    freshness_window: int
    expiry_time: str
    pickup_address: str
    city: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None
    