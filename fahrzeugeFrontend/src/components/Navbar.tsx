import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div>
        <span>
          <Link className={styles.nav__link} to="/">
            Fahrzeuge
          </Link>
        </span>
      </div>
      <ul className={styles.nav__ul}>
        <li>
          <Link className={styles.nav__link} to="/add">
            Fahrzeug hinzufügen
          </Link>
        </li>
        <li>
          <Link className={styles.nav__link} to="/">
            Fahrzeuge anzeigen
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
