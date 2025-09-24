import Image from "next/image";
import Header from "../components/Header";
import styles from "./sobre-mim.module.css";

export default function SobreMim() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.sunImage}>
          <Image
            src="/images/sol.png"
            alt="Sol"
            width={400}
            height={400}
            className={styles.decorativeImage}
          />
        </div>
        
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
            <a href="https://www.linkedin.com/in/fernanda-alves-louro-386966320" className={styles.link} target="_blank" rel="noopener noreferrer">
              📖 LinkedIn
            </a>
            <a href="https://github.com/F3rNnd4" className={styles.link} target="_blank" rel="noopener noreferrer">
              💻 GitHub
            </a>
            <a href="mailto:fernanda.louro@aluno.senai.br" className={styles.link} target="_blank" rel="noopener noreferrer">
              📧 E-mail
            </a>
          </div>
        </section>
        
        <div className={styles.moonImage}>
          <Image
            src="/images/lua-cheia.png"
            alt="Lua"
            width={380}
            height={380}
            className={styles.decorativeImage}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>MoodSleep Tracker © 2025 – Fernanda Alves</p>
      </footer>
    </div>
  );
}
