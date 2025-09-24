import Image from "next/image";
import Header from "../components/Header";
import styles from "./cadastro.module.css";

export default function Cadastro() {
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
        
        <section className={styles.formCard}>
          <h1 className={styles.title}>🌙 Durma melhor, viva melhor ⭐</h1>
          <p className={styles.subtitle}>Monitore seu sono e humor de forma simples e acolhedora</p>
          
          <form className={styles.form}>
            <input 
              type="text" 
              placeholder="Nome" 
              className={styles.input}
            />
            <input 
              type="email" 
              placeholder="Email" 
              className={styles.input}
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className={styles.input}
            />
            
            <button type="submit" className={styles.submitButton}>
              Cadastrar
            </button>
            
            <p className={styles.loginLink}>
              Já tem conta? <a href="/login">Faça login</a>
            </p>
          </form>
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