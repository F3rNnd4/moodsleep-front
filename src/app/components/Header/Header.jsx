import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/icons/moodsleep-icon.png"
              alt="MoodSleep"
              width={60}
              height={60}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>MoodSleep</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/sobre-mim" className={styles.navLink}>
            Sobre mim
          </Link>
          <Link href="/cadastro" className={styles.navLink}>
            Cadastro
          </Link>
          <Link href="/login" className={styles.navLink}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
