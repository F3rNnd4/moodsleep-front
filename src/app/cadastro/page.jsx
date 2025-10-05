"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { api } from "../../../lib/api";
import styles from "./cadastro.module.css";

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
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
    if (!formData.name || !formData.email || !formData.password) {
      setError('Todos os campos são obrigatórios');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await api.users.create(formData);
      const result = await response.json();
      
      if (response.ok) {
        alert('Usuário criado com sucesso!');
        router.push('/login');
      } else {
        setError(result.error || 'Erro ao criar usuário');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
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
          
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Nome" 
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
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
              minLength={6}
              disabled={loading}
            />

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Criando...' : 'Cadastrar'}
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