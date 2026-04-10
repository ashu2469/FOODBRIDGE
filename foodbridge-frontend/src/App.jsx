import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FoodList from "./pages/FoodList";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ ye add karo

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/foods" element={<FoodList />} />
        <Route path="/add-food" element={<AddFood />} />
        <Route path="/edit-food/:id" element={<EditFood />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;