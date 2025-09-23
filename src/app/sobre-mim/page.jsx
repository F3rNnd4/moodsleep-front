import Image from "next/image";
import Header from "../components/Header";
import styles from "./sobre-mim.module.css";

export default function SobreMim() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.profileCard}>
          <h1 className={styles.title}>Sobre Mim</h1>
          <div className={styles.avatar}>
            <Image
              src="/images/eu.jpeg"
              alt="Foto de Fernanda"
              layout="responsive"
              priority
              width={500}
              height={500}
            />
          </div>
          <h2 className={styles.name}>Fernanda Alves Louro</h2>
          <p className={styles.role}>
            Estudante de Desenvolvimento de Sistemas | Criadora do MoodSleep
            Tracker
          </p>
          <p className={styles.description}>
            Sou estudante de Desenvolvimento de Sistemas no SENAI Valinhos e
            desenvolvi o MoodSleep Tracker como parte do meu projeto individual.
            Meu objetivo é criar soluções simples e intuitivas que ajudem no
            bem-estar e na organização do dia a dia.
          </p>
          <div className={styles.links}>
            <a href="#" className={styles.link}>
              📖 LinkedIn
            </a>
            <a href="#" className={styles.link}>
              💻 GitHub
            </a>
            <a href="#" className={styles.link}>
              📧 E-mail
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>MoodSleep Tracker © 2025 – Fernanda Alves</p>
      </footer>
    </div>
  );
}
