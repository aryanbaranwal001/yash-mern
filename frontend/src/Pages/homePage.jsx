import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'
import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reservation, setReservation] = useState({ date: "", time: "" });
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from storage
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); // Store userId from token
      } catch (error) {
        alert("login first")
        console.error("login first:", error);
      }
    }
  }, []);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/restaurant");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleOpen = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRestaurant(null);
    setReservation({ date: "", time: "" });
  };

  const handleReserve = async () => {
    if (!reservation.date || !reservation.time) {
      alert("Please select a date and time.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/reservation", {
        userId: userId,
        restaurantId: selectedRestaurant._id,
        date: reservation.date,
        time: reservation.time,
      });
      alert("Reservation request sent!");
      handleClose();
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <Card key={restaurant._id} className="p-4">
            <CardContent>
              <img
                src={`http://localhost:5000/${restaurant.photo}`}
                alt={restaurant.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <Button variant="contained" color="primary" onClick={() => handleOpen(restaurant)}>
                Reserve
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(`/restaurant/${restaurant._id}/menu`)}
              >
                See Menu
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reservation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reserve at {selectedRestaurant?.name}</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={reservation.date}
            onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            value={reservation.time}
            onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleReserve} className="mt-4">
            Submit Reservation
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantList;
