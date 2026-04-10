import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 Existing data load karna
  useEffect(() => {
    axiosInstance
      .get(`/listings/all`)
      .then((res) => {
        const item = res.data.find((f) => f.id == id);
        if (item) {
          setTitle(item.title);
          setDescription(item.description);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  // 🔹 Update function
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/listings/status/${id}?status=updated`, {
        title,
        description,
      });

      alert("Updated ✅");
      navigate("/foods");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Food ✏️</h1>

      <input
        type="text"
        value={title}
        className="border p-2 mb-2 block"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        value={description}
        className="border p-2 mb-2 block"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Update
      </button>
    </div>
  );
}

export default EditFood;