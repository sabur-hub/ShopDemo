import React, { useState } from "react";
import styles from "./Restaurant.module.css";
import Categories from "../categories/Categories";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function Restaurant({ restaurant, cart, setCart }) {
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoading(true);
    if (!restaurant) {
      navigate("/");
      return;
    }

    fetch(`https://panjakent.shop:3000/products?restaurant_id=${restaurant.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenu(data);
        } else {
          console.error("Data is not an array");
        }
        setMenu(data);
        setIsLoading(false);
      });
  }, [restaurant, navigate]);

  const handleAddToCart = (item) => {
    if (cart.length > 0 && cart[0].restaurantId !== restaurant.id) {
      if (
        window.confirm(
          "Ваша корзина содержит товары из другого ресторана. Очистить корзину и добавить этот товар?"
        )
      ) {
        setCart([]);
      } else {
        return;
      }
    }

    const newItem = { ...item, quantity: 1, restaurantId: restaurant.id };
    setCart((prevCart) => [...prevCart, newItem]);
  };

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

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!restaurant) return null;

  const skeletons = [...new Array(6)].map((_, index) => (
    <div key={index} className={styles.skeleton_p}>
      <div className={styles.item} key={index}>
        <div className={styles.item_imgContainer}>
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"100%"}
            className={styles.item_img}
          />
        </div>
        <div className={styles.item_title}>
          <Skeleton
            variant="rectangular"
            width={"40%"}
            className={styles.item_title}
          />
        </div>
        <div>
          <Skeleton
            variant="rectangular"
            width={"50%"}
            className={styles.item_title}
          />
        </div>
        <div>
          <Skeleton
            variant="rectangular"
            width={"55%"}
            className={styles.item_title}
          />
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.restaurant}>
      <div className={styles.imgContainer}>
        <img
          src={restaurant.image}
          alt={restaurant.image}
          className={styles.img}
        />
        <div className={"container " + styles.title}>
          <h1 className={styles.name}>{restaurant.title}</h1>
          <div>Время доставки: {restaurant.delivery_time} мин</div>
        </div>
      </div>
      <Categories />
      <div className="container">
        <div className={styles.menu}>
          {isLoading
            ? skeletons
            : menu.map((item) => (
                <div className={styles.item} key={item.id}>
                  <div className={styles.item_imgContainer}>
                    <img
                      src={item.image}
                      alt={item.image}
                      className={styles.item_img}
                    />
                  </div>
                  <div className={styles.item_title}>
                    <p className={styles.item_name}>{item.name}</p>
                    <p className={styles.item_description}>
                      {item.description}
                    </p>
                    <p className={styles.item_price}>{item.price}</p>
                  </div>
                  <div className={styles.item_actions}>
                    {cart.some((cartItem) => cartItem.id === item.id) ? (
                      <div className={styles.quantity_controls}>
                        <button onClick={() => handleDecrement(item.id)}>
                          -
                        </button>
                        <span>
                          {
                            cart.find((cartItem) => cartItem.id === item.id)
                              .quantity
                          }
                        </span>
                        <button onClick={() => handleIncrement(item.id)}>
                          +
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleAddToCart(item)}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
        </div>
        {cart.length > 0 && (
          <div className={styles.checkout}>
            <p>Total Amount: {totalAmount}</p>
            <Link to="/basket">
              <button>Оформить заказ</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
