import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Created:", user);
      alert("Signup Successful ✅");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 block"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 block"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;