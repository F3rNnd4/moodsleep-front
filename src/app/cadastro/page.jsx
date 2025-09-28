import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./cadastro.module.css";

export default function Cadastro() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.sunImage}>
        <Image
          src="/images/sol.png"
          alt="Sol"
          width={320}
          height={320}
          className={styles.decorativeImage}
        />
      </div>
      
      <div className={styles.moonImage}>
        <Image
          src="/images/lua-cheia.png"
          alt="Lua"
          width={280}
          height={280}
          className={styles.decorativeImage}
        />
      </div>

      <main className={styles.main}>
        <section className={styles.formCard}>
          <h1 className={styles.title}>Durma melhor, viva melhor</h1>
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
              Já tem conta? <Link href="/login">Faça login</Link>
            </p>
          </form>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}