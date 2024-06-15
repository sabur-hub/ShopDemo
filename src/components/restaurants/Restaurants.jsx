import React, { useState } from "react";
import styles from "./Restaurants.module.css";

import Card from "../card/Card";

export default function Restaurants({ state }) {
  const [restaurants, setRestaurants] = useState();

  React.useEffect(() => {
    fetch("https://panjakent.shop:3000/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className={styles.title}>Рестораны</h2>
        <div className={styles.cards}>
          {(restaurants ? restaurants : [...Array(5)]).map(
            (restaurant, index) =>
              restaurants ? (
                <Card key={restaurant.id} card={restaurant} state={state} />
              ) : (
                <Card key={index} isLoading={true} />
              )
          )}
        </div>
      </div>
    </section>
  );
}
