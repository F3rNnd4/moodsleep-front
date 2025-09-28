"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderDashboard from "../components/HeaderDashboard";
import Footer from "../components/Footer/Footer";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [sleepHours, setSleepHours] = useState("");
  const [notes, setNotes] = useState("");

  // Simulando nome do usuário - em produção viria do contexto/auth
  const userName = "Nathalia";
  
  // Função para determinar saudação baseada no horário
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const moods = [
    { id: 1, emoji: "😡", label: "Bravo" },
    { id: 2, emoji: "😔", label: "Triste" },
    { id: 3, emoji: "😐", label: "Neutro" },
    { id: 4, emoji: "😊", label: "Feliz" },
    { id: 5, emoji: "😍", label: "Apaixonado" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de salvar os dados
    console.log({
      mood: selectedMood,
      sleepHours,
      notes,
      date: new Date().toISOString()
    });
    
    // Reset do formulário
    setSelectedMood(null);
    setSleepHours("");
    setNotes("");
    
    alert("Registro salvo com sucesso!");
  };

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
                  >
                    <span className={styles.moodEmoji}>{mood.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sleep" className={styles.label}>Seu sono</label>
              <input
                id="sleep"
                type="text"
                placeholder="Horas dormidas (Ex: 7h)"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className={styles.input}
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
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={!selectedMood || !sleepHours}
            >
              Salvar Registro
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}