import Image from "next/image";
import Header from "../components/Header";
import styles from "./login.module.css";

export default function Login() {
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
          <h1 className={styles.title}>🌙 Bem-vindo de volta ⭐</h1>
          <p className={styles.subtitle}>Continue monitorando seu bem-estar</p>
          
          <form className={styles.form}>
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
              Entrar
            </button>
            
            <p className={styles.signupLink}>
              Não tem conta? <a href="/cadastro">Cadastre-se</a>
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