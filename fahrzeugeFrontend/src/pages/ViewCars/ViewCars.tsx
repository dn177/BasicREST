import styles from "./ViewCars.module.css";
import { useEffect, useState } from "react";

function ViewCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    const response = await fetch("http://localhost:3000/v1/getcars", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    setCars(data);
  }

  return (
    <div>
      <h1 className={styles.heading}>Fahrzeuge:</h1>
      {Object.keys(cars).length > 0
        ? cars.map((car) => {
            console.log(car);
            return (
              <div className={styles.carcard}>
                <span>Autoname: {car.name}</span>
                <span>Kennzeichen: {car.license}</span>
                <span>Farbe: {car.color}</span>
                <span>TÜV: {car.tuv}</span>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default ViewCars;
