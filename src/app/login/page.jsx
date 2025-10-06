"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validações básicas
    if (!formData.email || !formData.password) {
      setError('Email e senha são obrigatórios');
      setLoading(false);
      return;
    }

    try {
      // Como o back-end ainda não tem autenticação JWT completa,
      // vamos simular um login por enquanto
      console.log('Login attempt:', formData);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Por enquanto, redirecionar diretamente para o dashboard
      // TODO: Implementar autenticação real quando o back-end estiver pronto
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
          
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input 
              type="password" 
              name="password"
              placeholder="Senha" 
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

          </form>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}