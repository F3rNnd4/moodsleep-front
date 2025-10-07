"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HeaderDashboard from "../components/HeaderDashboard/HeaderDashboard";
import Image from "next/image";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./sobre-mim.module.css";

// Componente que usa useSearchParams
function SobreMimContent() {
  const searchParams = useSearchParams();
  const fromDashboard = searchParams.get('from') === 'dashboard';

  return (
    <>
      {fromDashboard ? (
        <HeaderDashboard currentPage="sobre-mim" />
      ) : (
        <Header />
      )}

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
            Desenvolvedora em formação | Apaixonada por livros e bem-estar
          </p>
          <p className={styles.description}>
            Oi! Eu sou a Fernanda, tenho 18 anos e estudo Desenvolvimento de Sistemas no SENAI Valinhos. 
          </p>
          <p className={styles.description}>
            O MoodSleep Tracker nasceu da minha própria necessidade de entender melhor meus padrões de humor e sono. 
            Como alguém que valoriza muito o autocuidado e a saúde mental, queria criar algo que fosse genuinamente útil 
            e não apenas mais um app complicado.
          </p>
          <p className={styles.description}>
            Quando não estou codando, você pode me encontrar lendo romances, ouvindo música ou experimentando 
            novas receitas na cozinha. Acredito que os melhores projetos surgem quando combinamos nossa paixão 
            pessoal com conhecimento técnico! 🌙✨
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
    </>
  );
}

// Componente principal com Suspense
export default function SobreMim() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Carregando...</div>}>
        <SobreMimContent />
      </Suspense>
      <Footer />
    </div>
  );
}
