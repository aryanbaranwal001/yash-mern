import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin", { withCredentials: true });

        if (res.data.status && res.data.role === "owner") {
          setUser(res.data.user); // Set user state if authenticated
        } else {
          navigate("/login"); // Redirect if not authorized
        }
      } catch (error) {
        navigate("/login"); // Redirect on error
      }
    };

    checkAuth();
  }, [navigate]);

  if (!user) return <h2>Checking authentication...</h2>;

  return <h2>Welcome, Admin: {user}</h2>;
}
