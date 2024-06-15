import React from "react";
import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <section className={styles.categories}>
      <ul className={styles.list}>
        <li className={styles.item}>Категория</li>
        <li className={styles.item}>Категория</li>
        <li className={styles.item}>Категория</li>
        <li className={styles.item}>Категория</li>
        <li className={styles.item}>Категория</li>
      </ul>
    </section>
  );
}
