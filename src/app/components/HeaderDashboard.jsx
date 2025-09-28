import Link from "next/link";
import Image from "next/image";
import styles from "./HeaderDashboard.module.css";

export default function HeaderDashboard({ currentPage = "dashboard" }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/dashboard" className={styles.logoLink}>
            <Image
              src="/icons/moodsleep-icon.png"
              alt="MoodSleep"
              width={40}
              height={40}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>MoodSleep</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link 
            href="/dashboard" 
            className={`${styles.navLink} ${currentPage === "dashboard" ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link 
            href="/meus-registros" 
            className={`${styles.navLink} ${currentPage === "registros" ? styles.active : ""}`}
          >
            Meus Registros
          </Link>
          <Link 
            href="/sobre-mim" 
            className={styles.navLink}
          >
            Sobre mim
          </Link>
          <Link 
            href="/login" 
            className={styles.navLink}
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}