"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HeaderDashboard from "../components/HeaderDashboard/HeaderDashboard";
import Footer from "../components/Footer/Footer";
import { api } from "../../../lib/api";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Simulando nome do usuário - em produção viria do contexto/auth
  const userName = "Nathalia";
  const userId = 1; // Temporário - será substituído por autenticação real
  
  // Função para determinar saudação baseada no horário
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  useEffect(() => {
    loadRegisters();
  }, []);

  const loadRegisters = async () => {
    try {
      const response = await api.registers.getAll();
      const data = await response.json();
      
      if (response.ok) {
        // Pega apenas os 3 registros mais recentes para o dashboard
        const recentRegisters = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setRegisters(recentRegisters);
      } else {
        setError('Erro ao carregar registros');
      }
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const createRegister = async (registerData) => {
    try {
      const response = await api.registers.create(registerData);
      
      if (response.ok) {
        alert('Registro salvo com sucesso!');
        loadRegisters(); // Recarregar a lista
        router.push('/meus-registros');
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Erro ao criar registro');
      }
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      alert('Erro ao salvar registro: ' + error.message);
    }
  };

  const moods = [
    { id: 1, emoji: "😡", label: "Bravo" },
    { id: 2, emoji: "😔", label: "Triste" },
    { id: 3, emoji: "😐", label: "Neutro" },
    { id: 4, emoji: "😊", label: "Feliz" },
    { id: 5, emoji: "😍", label: "Apaixonado" }
  ];

  const [selectedMood, setSelectedMood] = useState(null);
  const [sleepHours, setSleepHours] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [dateInput, setDateInput] = useState(() => new Date().toISOString().slice(0, 10));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    const registerData = {
      date: new Date(dateInput).toISOString(),
      moodLevel: selectedMood,
      sleepHours: parseFloat(sleepHours),
      notes: notes,
      userId: userId
    };

    try {
      const response = await api.registers.create(registerData);
      
      if (response.ok) {
        // Reset do formulário
        setSelectedMood(null);
        setSleepHours("");
        setNotes("");
        setDateInput(new Date().toISOString().slice(0, 10));

        alert("Registro salvo com sucesso!");
        loadRegisters(); // Atualizar registros recentes
        router.push("/meus-registros");
      } else {
        const result = await response.json();
        setSubmitError(result.error || 'Erro ao salvar registro');
      }
    } catch (err) {
      console.error('Erro ao enviar registro:', err);
      setSubmitError('Erro de conexão. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <HeaderDashboard currentPage="dashboard" />
        <main className={styles.main}>
          <div>Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <HeaderDashboard currentPage="dashboard" />
      
      <div className={styles.moonImage}>
        <img src="/images/lua-cheia.png" alt="Lua" />
      </div>
      
      <div className={styles.sunImage}>
        <img src="/images/sol.png" alt="Sol" />
      </div>

      <main className={styles.main}>
        <section className={styles.welcomeSection}>
          <h1 className={styles.greeting}>
            {getGreeting()}, {userName} <span className={styles.star}>🌟</span>
          </h1>
          <p className={styles.question}>Como você está se sentindo hoje?</p>
        </section>

        <section className={styles.registryCard}>
          <h2 className={styles.cardTitle}>
             Registre seu bem-estar <span className={styles.sparkle}></span>
          </h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="entryDate" className={styles.label}>Data do registro</label>
              <input
                id="entryDate"
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className={styles.input}
                required
                disabled={submitting}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Seu humor</label>
              <div className={styles.moodSelector}>
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    type="button"
                    className={`${styles.moodButton} ${
                      selectedMood === mood.id ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedMood(mood.id)}
                    disabled={submitting}
                  >
                    <span className={styles.moodEmoji}>{mood.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sleep" className={styles.label}>Seu sono (horas)</label>
              <input
                id="sleep"
                type="number"
                placeholder="Ex: 7.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className={styles.input}
                min="0"
                max="24"
                step="0.5"
                required
                disabled={submitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.label}>Suas anotações</label>
              <textarea
                id="notes"
                placeholder="Escreva algo sobre seu dia (opcional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={styles.textarea}
                rows={4}
                disabled={submitting}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={!selectedMood || !sleepHours || submitting}
            >
              {submitting ? 'Salvando...' : 'Salvar Registro'}
            </button>
            {submitError && (
              <div className={styles.errorText} role="alert" style={{ marginTop: '8px' }}>
                {submitError}
              </div>
            )}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}