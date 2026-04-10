import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out ✅");
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      
      {/* Left side (logo / title) */}
      <h1 className="text-xl font-bold">FoodBridge 🍽️</h1>

      {/* Right side (links + logout) */}
      <div className="flex gap-4 items-center">
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/foods">Foods</Link>
        <Link to="/add-food">Add Food</Link>
        <Link to="/profile">Profile</Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;