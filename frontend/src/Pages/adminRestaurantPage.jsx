import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRestaurantPage = () => {
    const { id } = useParams();  // Get restaurantId from URL
    const navigate = useNavigate(); 
    const [reservations, setReservations] = useState([]);

    // Fetch reservations for this restaurant
    useEffect(() => {
        axios.get(`http://localhost:5000/reservation/restaurant/${id}`, {withCredentials: true})
            .then(response => {
                if (Array.isArray(response.data)) {
                    setReservations(response.data);
                } else {
                    setReservations([]); // Fallback to empty array
                }
            })
            .catch(error => {
                console.error("Error fetching reservations:", error);
                setReservations([]); // Handle API failure
            });
    }, [id]);

    // Handle Approve/Cancel actions
    const handleUpdateStatus = (id, status) => {
        axios.put(`http://localhost:5000/reservation/${id}`, { status })
            .then((response) => {
                setReservations(reservations.map(res => 
                    res._id === id ? { ...res, status: response.data.status } : res
                ));
            })
            .catch(error => console.error("Error updating reservation:", error));
    };

    return (
        <div>
            <button 
                onClick={() => navigate(`/admin/restaurant/${id}/menu`)} 
                style={{ marginBottom: "20px", padding: "10px", background: "blue", color: "white", borderRadius: "5px", cursor: "pointer" }}
            >
                Manage Menu
            </button>
            <h2>Reservations for Your Restaurant</h2>
            {reservations.length === 0 ? (
                <p>No reservation requests yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation._id}>
                                <td>{reservation.userName}</td>
                                <td>{reservation.date}</td>
                                <td>{reservation.time}</td>
                                <td>{reservation.status}</td>
                                <td>
                                    {reservation.status === "pending" && (
                                        <>
                                            <button onClick={() => handleUpdateStatus(reservation._id, "approved")}>Approve</button>
                                            <button onClick={() => handleUpdateStatus(reservation._id, "cancelled")}>Cancel</button>

                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminRestaurantPage;
