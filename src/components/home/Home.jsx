import React from "react";
import styles from "./Home.module.css";
import Categories from "../categories/Categories";
import Restaurants from "../restaurants/Restaurants";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";

export default function Home({ state }) {
  return (
    <>
      <Header />
      <main className={styles.home}>
        <div className={styles.banner}>
          <div className="container">
            <div className={styles.imgContainer}>
              <img className={styles.img_banner} src="../../public/banner.jpg" alt="banner" />
            </div>
          </div>
        </div>
        <div className="container">
          <h2 className={styles.cats}>Категории</h2>
        </div>
        <Categories />
        <Restaurants state={state} />
      </main>
      <Navbar />
    </>
  );
}
