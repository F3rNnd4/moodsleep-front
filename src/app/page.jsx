import Image from "next/image";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <Image 
            src="/images/sol.png" 
            alt="Sol" 
            width={510} 
            height={510}
            className={styles.sunImage}
          />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Equilibre seu sono e suas emoções
            </h1>
            <p className={styles.subtitle}>
              Monitore seus hábitos diários de forma simples e acolhedora.
            </p>
            
            <div className={styles.buttons}>
              <a href="/cadastro" className={styles.primaryButton}>Criar conta</a>
              <a href="/login" className={styles.secondaryButton}>Entrar</a>
            </div>
          </div>

          <Image 
            src="/images/lua-cheia.png" 
            alt="Lua" 
            width={440} 
            height={440}
            className={styles.moonImage}
          />
        </section>

        {/* Feature Cards */}
        <section className={styles.features}>
          <div className={styles.featureCard} style={{backgroundColor: '#E8E4FF'}}>
            <div className={styles.cardIcon}>📊</div>
            <h3 className={styles.cardTitle}>Durma melhor</h3>
            <p className={styles.cardDescription}>
              Monitore seus padrões de sono e melhore sua qualidade de vida.
            </p>
          </div>
          
          <div className={styles.featureCard} style={{backgroundColor: '#FFE4E8'}}>
            <div className={styles.cardIcon}>😊</div>
            <h3 className={styles.cardTitle}>Entenda suas emoções</h3>
            <p className={styles.cardDescription}>
              Descubra como suas emoções afetam sua qualidade de sono.
            </p>
          </div>
          
          <div className={styles.featureCard} style={{backgroundColor: '#FFF4E4'}}>
            <div className={styles.cardIcon}>📈</div>
            <h3 className={styles.cardTitle}>Desbloqueie conexões</h3>
            <p className={styles.cardDescription}>
              Visualize seu progresso com gráficos detalhados e insights.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}