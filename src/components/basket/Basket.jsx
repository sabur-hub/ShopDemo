import React, { useState, useEffect } from "react";
import styles from "./Basket.module.css";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import axios from "axios";

export default function Basket({ cart, setCart }) {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('https://panjakent.shop:7000/api/check-session', { withCredentials: true });
        if (response.data.verified) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    checkSession();
  }, []);

  const handleIncrement = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart(
      cart.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const handleOrder = () => {
    // Здесь можно добавить логику для оформления заказа, например, отправку данных на сервер
    // После успешного оформления заказа очищаем корзину
    setCart([]);
    localStorage.removeItem("cart");
    alert("Заказ успешно оформлен!");
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.basket}>
      <div className={styles.heder}>
        <button onClick={() => navigate("/")}>
          <GoArrowLeft className={styles.icon_go} />
        </button>
        <h1 className={styles.karzina}>Корзина</h1>
        <p>Oчистить</p>
      </div>
      {cart.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <p>{item.name}</p>
                <p>{item.price} руб.</p>
              </div>
              <div className={styles.cartItemControls}>
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
            </div>
          ))}
          <div className={styles.cartSummary}>
            <p>Итого: {totalAmount} руб.</p>
            {isVerified ? (
              <button onClick={handleOrder}>Оформить заказ</button>
            ) : (
              <p>Пожалуйста, идентифицируйтесь, чтобы оформить заказ</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
