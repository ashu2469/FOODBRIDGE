import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate(); // ✅ add

  useEffect(() => {
    axiosInstance
      .get("/listings/all")
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Food List 🍔</h1>

      {foods.length === 0 ? (
        <p>No food available</p>
      ) : (
        foods.map((food) => (
          <div
            key={food.id}
            className="border p-3 mb-2 rounded bg-gray-100"
          >
            <h2 className="font-bold">{food.title || food.name}</h2>
            <p>{food.description}</p>

            {/* ✅ Edit Button */}
            <button
              onClick={() => navigate(`/edit-food/${food.id}`)}
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default FoodList;