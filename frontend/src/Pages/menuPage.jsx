import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserMenuPage = () => {
    const { id } = useParams();  // Get restaurantId from URL
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get(`http://localhost:5000/admin/restaurant/${id}/menu`)
            .then(response => setMenuItems(response.data))
            .catch(error => console.error("Error fetching menu:", error));
        }, [id]);
        

    return (
        <div>
            <h2>Menu</h2>
                <ul>
                    {menuItems.map(item => (
                        <li key={item._id}>
                            {item.name} - ₹{item.price}
                        </li>
                    ))}
                </ul>
            <button onClick={() => navigate("/home")}>Back to Restaurant Page</button>
        </div>
    );
};

export default UserMenuPage;
