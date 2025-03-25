import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [restaurantName, setRestaurantName] = useState(""); 
  const [restaurantPhoto, setRestaurantPhoto] = useState(null);
  const [availableTables, setAvailableTables] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin", { withCredentials: true });

        if (res.data.status && res.data.role === "owner") {
          setUsername(res.data.name)
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
    if (!restaurantName || !restaurantPhoto || !availableTables) {
      alert("Please fill all fields (Name, Photo, Tables)"); 
      return; 
    }
    const formData = new FormData(); 
    formData.append("ownerId", userId);
    formData.append("name", restaurantName);
    formData.append("availableTables", availableTables);
    formData.append("photo", restaurantPhoto);
    console.log("Selected file:", restaurantPhoto);

    try {
      const res = await axios.post(
        "http://localhost:5000/admin/restaurant",
        formData, // Send as FormData
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      ); 
      
      if (res.status === 201) {
        const restaurantId = res.data.restaurant._id; // Get restaurant ID from response
        navigate(`/admin/restaurant/${restaurantId}`); // Redirect to restaurant details page
      }
      setRestaurantName("");
      setRestaurantPhoto(null);
      setAvailableTables("");
    } catch (error) {
      console.log("Error adding restaurant:", error); 
      alert("Failed to add Restaurant");
    }
  }; 
   
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Welcome, {username || "Loading..."}</h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          placeholder="Enter Restaurant Name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setRestaurantPhoto(e.target.files[0])}
        />

        <input
          type="number"
          className="w-full p-2 border rounded mb-3"
          placeholder="Total Available Tables"
          value={availableTables}
          onChange={(e) => setAvailableTables(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleAddRestaurant}
        >
          Add Restaurant
        </button>
      </div>
    </div>
  );
}
