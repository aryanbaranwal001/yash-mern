import { useState ,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function AdminMenu() {
    const [menuName, setMenuName] = useState("");
    const [menuPrice, setMenuPrice] = useState("");
    const [menuItems, setMenuItems] = useState([]); 
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/restaurant/${id}/menu`)
            .then(response => setMenuItems(response.data))
            .catch(error => console.error("Error fetching menu:", error));
        }, [id]);
    
        
    const handleAddMenuItem = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/restaurant/${id}/menu`, {
        name: menuName,
        price: menuPrice
      });

      if (res.status === 201) {
        alert("Menu item added successfully!");
        setMenuName("");
        setMenuPrice("");
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert("Failed to add menu item");
    }
  };

  return (
   
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>

        <input
            type="text"
            className="w-full p-2 border rounded mb-3"
            placeholder="Dish Name"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
        />

        <input
            type="number"
            className="w-full p-2 border rounded mb-3"
            placeholder="Price (₹)"
            value={menuPrice}
            onChange={(e) => setMenuPrice(e.target.value)}
        />

        <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleAddMenuItem}
        >
            Add Menu Item
        </button>
        <h3>Current Menu</h3>
        <ul>
            {menuItems.map(item => (
                <li key={item._id}>
                    {item.name} - ₹{item.price}
                </li>
            ))}
        </ul>
    </div>
  );
}
