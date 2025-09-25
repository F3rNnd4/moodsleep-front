import Image from "next/image";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.sunImage}>
        <Image
          src="/images/sol.png"
          alt="Sol"
          width={300}
          height={300}
          className={styles.decorativeImage}
        />
      </div>
      
      <div className={styles.moonImage}>
        <Image
          src="/images/lua-cheia.png"
          alt="Lua"
          width={290}
          height={290}
          className={styles.decorativeImage}
        />
      </div>

      <main className={styles.main}>
        <section className={styles.formCard}>
          <h1 className={styles.title}>Bem-vindo de volta</h1>
          <p className={styles.subtitle}>Continue sua jornada de bem-estar e sono tranquilo</p>
          
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
              Não tem conta? <a href="/cadastro">Cadastre-se aqui</a>
            </p>
          </form>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}