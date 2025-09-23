import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/icons/moodsleep-icon.png"
            alt="MoodSleep"
            width={60}
            height={60}
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>MoodSleep</span>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>
            Home
          </a>
          <a href="#" className={styles.navLink}>
            Sobre mim
          </a>
          <a href="#" className={styles.navLink}>
            Cadastro
          </a>
          <a href="#" className={styles.navLink}>
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
