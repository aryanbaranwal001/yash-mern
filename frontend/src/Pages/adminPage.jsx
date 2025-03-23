import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [restaurantName, setRestaurantName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin", { withCredentials: true });

        if (res.data.status && res.data.role === "owner") {
          setUser(res.data.user); // Set user state if authenticated
          setUserId(res.data.userId);
          fetchRestaurant(res.data.userId)
        } else {
          navigate("/login"); // Redirect if not authorized
        }
      } catch (error) {
        navigate("/login"); // Redirect on error
      }
    };

    const fetchRestaurant = async (ownerId) => {
        try {
            const res = await axios.get(`http://localhost:5000/admin/restaurant/owner/${ownerId}`);
            
            if (res.data.restaurant) {
                navigate(`/admin/restaurant/${res.data.restaurant._id}`); // Redirect if restaurant exists
            } else {
                navigate("/admin"); // Stay on this page if no restaurant
            }
        } catch (error) {
            console.error("Error fetching restaurant:", error);
        }
    };

    checkAuth();
  }, [navigate]);

  const handleAddRestaurant = async () => {
    if (!restaurantName) {
        alert("Enter a restaurant Name"); 
        return; 
    }
    try {
        const res = await axios.post(
            "http://localhost:5000/admin/restaurant",
            {
                ownerId: userId, 
                name: restaurantName, 
            },
            {withCredentials: true}
        ); 
        if (res.status === 201) {
            const restaurantId = res.data.restaurant._id; // Get restaurant ID from response
            navigate(`/admin/restaurant/${restaurantId}`); // Redirect to restaurant details page
        }
        setRestaurantName("");
    } catch (error) {
        console.log("Error adding restaurant:", error); 
        alert("Failed to add Restaurant")
    }
  }; 
  return (
    <div>
      <h2>Welcome, Admin: {user?.user || "Loading..."}</h2> 
      
      <input
        type="text"
        placeholder="Enter Restaurant Name"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
      />
      
      <button onClick={handleAddRestaurant}>Add Restaurant</button>
    </div>
  );
}
