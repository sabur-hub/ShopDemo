import React from "react";
import styles from "./Search.module.css";

export default function Search() {
  const [value, setValue] = React.useState("");
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.field}
        placeholder="Поиск"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
