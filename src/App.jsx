import React, { useState, useEffect } from "react";
import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import Restaurant from "./components/restaurant/Restaurant";
import Navbar from "./components/navbar/Navbar";
import Basket from "./components/basket/Basket";
import Profile from "./components/profile/Profile"; // Импортируем компонент Profile

export default function App() {
  const [restaurant, setRestaurant] = useState(() => {
    const savedRestaurant = localStorage.getItem("restaurant");
    return savedRestaurant ? JSON.parse(savedRestaurant) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (restaurant) {
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
    }
  }, [restaurant]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Navbar cart={cart} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              state={{ restaurant: restaurant, setRestaurant: setRestaurant }}
            />
          }
        />
        <Route
          path="/restaurants/:id"
          element={<Restaurant restaurant={restaurant} cart={cart} setCart={setCart} />}
        />
        <Route
          path="/basket"
          element={<Basket cart={cart} setCart={setCart} />}
        />
        <Route
          path="/profile" // Новый маршрут для профиля
          element={<Profile />}
        />
      </Routes>
    </>
  );
}
