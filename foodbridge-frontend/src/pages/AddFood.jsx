import { useState } from "react"
import axiosInstance from "../api/axiosInstance"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebaseConfig"

function AddFood() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    quantity: "",
    food_type: "",
    listing_type: "donate",
    price: 0,
    freshness_window: "",
    expiry_time: "",
    pickup_address: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddFood = async () => {
    setError("")

    // Basic validation
    if (!formData.title || !formData.city || !formData.quantity) {
      setError("Title, City aur Quantity zaroori hai!")
      return
    }

    const user = auth.currentUser
    if (!user) {
      setError("Pehle login karo!")
      navigate("/login")
      return
    }

    const payload = {
      donor_id: user.uid,
      title: formData.title,
      description: formData.description,
      quantity: formData.quantity.toString(),
      food_type: formData.food_type,
      listing_type: formData.listing_type || "donate",
      price: parseFloat(formData.price) || 0.0,
      freshness_window: parseInt(formData.freshness_window) || 1,
      expiry_time: formData.expiry_time.toString(),
      pickup_address: formData.pickup_address,
      city: formData.city,
      latitude: null,
      longitude: null,
      image_url: null,
    }

    console.log("Sending payload:", payload)
    console.log("API URL:", import.meta.env.VITE_API_BASE_URL)

    try {
      setLoading(true)
      const res = await axiosInstance.post("/listings/create", payload)
      console.log("Success response:", res.data)
      alert("Food added successfully! ✅")
      navigate("/food")
    } catch (err) {
      console.error("Full error:", err)
      console.error("Response data:", err.response?.data)
      console.error("Status:", err.response?.status)

      // Proper error message dikhao
      if (err.response?.data?.detail) {
        // FastAPI validation error
        const detail = err.response.data.detail
        if (Array.isArray(detail)) {
          setError(detail.map(d => `${d.loc.join(".")} — ${d.msg}`).join("\n"))
        } else {
          setError(detail)
        }
      } else if (err.message === "Network Error") {
        setError("Backend se connection nahi ho pa raha. Check karo ki Render server chal raha hai.")
      } else {
        setError("Kuch gadbad hui: " + err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-6">🍱 Add Food Listing</h1>

        {/* Error box */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 
                          rounded-lg mb-4 whitespace-pre-line text-sm">
            {error}
          </div>
        )}

        {/* listing_type toggle */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setFormData({ ...formData, listing_type: "donate" })}
            className={`flex-1 py-2 rounded-lg font-medium border transition-all
              ${formData.listing_type === "donate"
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-600 border-gray-300"}`}
          >
            Donate
          </button>
          <button
            onClick={() => setFormData({ ...formData, listing_type: "sell" })}
            className={`flex-1 py-2 rounded-lg font-medium border transition-all
              ${formData.listing_type === "sell"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-300"}`}
          >
            Sell
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Food Title *"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 mb-3 w-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          className="border border-gray-300 rounded-lg p-3 mb-3 w-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City *"
          value={formData.city}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 mb-3 w-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Quantity */}
        <input
          type="text"
          name="quantity"
          placeholder="Quantity (e.g. 5 plates) *"
          value={formData.quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 mb-3 w-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Food Type */}
        <select
          name="food_type"
          value={formData.food_type}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 mb-3 w-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        >
          <option value="">Food Type select karo *</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="vegan">Vegan</option>
        </select>

        {/* Price — only show when listing_type = sell */}
        {formData.listing_type === "sell" && (
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 mb-3 w-full 
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        )}

        {/* Freshness Window */}
        <input
          type="number"
          name="freshness_window"
          placeholder="Freshness Window (hours, e.g. 2)"
          value={formData.freshness_window}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 mb-3 w-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Expiry Time */}
        <input
          type="text"
          name="expiry_time"
          placeholder="Expiry Time (e.g. 2026-04-11 18:00)"
          value={formData.expiry_time}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 mb-3 w-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Pickup Address */}
        <input
          type="text"
          name="pickup_address"
          placeholder="Pickup Address"
          value={formData.pickup_address}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 mb-5 w-full 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Submit Button */}
        <button
          onClick={handleAddFood}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-all
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 active:scale-95"}`}
        >
          {loading ? "Adding..." : "Add Food 🍱"}
        </button>
      </div>
    </div>
  )
}

export default AddFood