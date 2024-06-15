import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export default function Card({ card, isLoading, state }) {
  if (isLoading) {
    return (
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <Skeleton variant="rectanglular" width={"100%"} height={"100%"} />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            <Skeleton variant="rectanglular" width={"80%"} height={20} />
          </p>
          <p className={styles.description}>
            <Skeleton variant="rectanglular" width={"60%"} height={18} />
          </p>
        </div>
      </div>
    );
  }
  return (
    <Link
      to={"/restaurants/" + card.id}
      className={styles.card}
      onClick={() => state.setRestaurant(card)}
    >
      <div className={styles.imgContainer}>
        <img src={card.image} alt={card.image} className={styles.img} />
      </div>
      <div className={styles.title}>
        <p className={styles.name}>{card.title}</p>
        <p className={styles.description}>{card.subtitle}</p>
      </div>
    </Link>
  );
}
