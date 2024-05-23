import styles from "./AddCar.module.css";
import { useState } from "react";

function AddCar() {
  const emptyFahrzeug = {
    name: "",
    kennzeichen: "",
    farbe: "",
    tuv: "",
  };
  const [fahrzeug, setFahrzeug] = useState(emptyFahrzeug);

  const handleChange = (e: React.SyntheticEvent) => {
    setFahrzeug({
      ...fahrzeug,
      [e.target.name]: e.target.value,
    });

    // console.log(fahrzeug);
    // console.log("Fahrzeug json:", JSON.stringify(fahrzeug));
  };

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    await fetch(`http://localhost:3000/v1/addcar`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(fahrzeug),
    });
    setFahrzeug(emptyFahrzeug);
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className={styles.form__input}
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={fahrzeug.name}
          />
        </div>
        <div>
          <label htmlFor="kennzeichen">Kennzeichen:</label>
          <input
            className={styles.form__input}
            type="text"
            name="kennzeichen"
            id="kennzeichen"
            onChange={handleChange}
            value={fahrzeug.kennzeichen}
          />
        </div>
        <div>
          <label htmlFor="farbe">Farbe:</label>
          <input
            className={styles.form__input}
            type="text"
            name="farbe"
            id="farbe"
            onChange={handleChange}
            value={fahrzeug.farbe}
          />
        </div>
        <div>
          <label htmlFor="tub">TÜV:</label>
          <input
            className={styles.form__input}
            type="text"
            name="tuv"
            id="tuv"
            onChange={handleChange}
            value={fahrzeug.tuv}
          />
        </div>
        <button type="submit">Fahrzeug erstellen</button>
      </form>
    </div>
  );
}

export default AddCar;
