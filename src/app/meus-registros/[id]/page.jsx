"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import Footer from "../../components/Footer/Footer";
import styles from "./registro-detalhes.module.css";

export default function RegistroDetalhes() {
  const params = useParams();
  const router = useRouter();
  const [registro, setRegistro] = useState(null);
  
  // Dados mockados - em produção viria da API
  const registrosMock = [
    {
      id: 1,
      data: "2025-09-18",
      humor: { id: 4, emoji: "😊", label: "Bom humor" },
      sono: "7h 45min",
      observacoes: "Dia foi produtivo, consegui descansar bem. Fiz exercícios pela manhã e isso me ajudou muito com o humor e energia para o resto do dia."
    },
    {
      id: 2,
      data: "2025-09-17",
      humor: { id: 4, emoji: "😊", label: "Bom humor" },
      sono: "8h 10min",
      observacoes: "Um pouco cansada, mas nada demais. Trabalho foi tranquilo hoje."
    },
    {
      id: 3,
      data: "2025-09-16",
      humor: { id: 1, emoji: "😡", label: "Irritado" },
      sono: "4h 30min",
      observacoes: "Não consegui dormir bem e fiquei estressado. Problemas no trabalho me deixaram bem irritado."
    },
    {
      id: 4,
      data: "2025-09-15",
      humor: { id: 3, emoji: "😐", label: "Neutro" },
      sono: "6h 20min",
      observacoes: "Dia normal, nada especial. Rotina comum."
    },
    {
      id: 5,
      data: "2025-09-14",
      humor: { id: 5, emoji: "😍", label: "Muito feliz" },
      sono: "8h 30min",
      observacoes: "Dia incrível! Dormi muito bem e acordei super disposta. Saí com amigos à noite."
    },
    {
      id: 6,
      data: "2025-09-13",
      humor: { id: 2, emoji: "😔", label: "Triste" },
      sono: "5h 15min",
      observacoes: "Dia difícil, problemas no trabalho. Me senti bem para baixo hoje."
    }
  ];

  // Função para obter a cor baseada no humor
  const getHumorColor = (humorId) => {
    const cores = {
      1: '#E57373', // Bravo - Rosa suave
      2: '#B39DDB', // Triste - Lilás claro
      3: '#D1C4E9', // Neutro - Roxo muito claro
      4: '#FFD700', // Feliz - Amarelo do projeto
      5: '#AEA2FC'  // Apaixonado - Roxo principal do projeto
    };
    return cores[humorId] || '#D1C4E9';
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatarDataCurta = (dataString) => {
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    const id = parseInt(params.id);
    const registroEncontrado = registrosMock.find(r => r.id === id);
    setRegistro(registroEncontrado);
  }, [params.id]);

  const navegarParaRegistro = (direction) => {
    const currentIndex = registrosMock.findIndex(r => r.id === registro.id);
    let newIndex;
    
    if (direction === 'previous') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : registrosMock.length - 1;
    } else {
      newIndex = currentIndex < registrosMock.length - 1 ? currentIndex + 1 : 0;
    }
    
    router.push(`/meus-registros/${registrosMock[newIndex].id}`);
  };

  return (
    <div className={styles.container}>
      <HeaderDashboard currentPage="registros" />
      
      <div className={styles.moonImage}>
        <img src="/images/lua-cheia.png" alt="Lua" className={styles.decorativeImage} />
      </div>
      
      <div className={styles.sunImage}>
        <img src="/images/sol.png" alt="Sol" className={styles.decorativeImage} />
      </div>

      <main className={styles.main}>
        <section className={styles.headerSection}>
          <h1 className={styles.title}>Detalhes do Registro</h1>
          <p className={styles.subtitle}>{formatarData(registro.data)}</p>
        </section>

        <section className={styles.detailsCard}>
          <div 
            className={styles.cardHeader}
            style={{ backgroundColor: getHumorColor(registro.humor.id) }}
          >
            <div className={styles.dateInfo}>
              <span className={styles.dateDay}>
                {formatarDataCurta(registro.data)}
              </span>
            </div>
          </div>

          <div className={styles.cardContent}>
            <div className={styles.moodSection}>
              <h3 className={styles.sectionTitle}>Como você se sentiu</h3>
              <div className={styles.moodDisplay}>
                <span className={styles.moodEmoji}>{registro.humor.emoji}</span>
                <div className={styles.moodInfo}>
                  <span className={styles.moodLabel}>{registro.humor.label}</span>
                  <div 
                    className={styles.moodIndicator}
                    style={{ backgroundColor: getHumorColor(registro.humor.id) }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={styles.sleepSection}>
              <h3 className={styles.sectionTitle}>Qualidade do sono</h3>
              <div className={styles.sleepDisplay}>
                <span className={styles.sleepIcon}>😴</span>
                <span className={styles.sleepValue}>{registro.sono}</span>
              </div>
            </div>

            {registro.observacoes && (
              <div className={styles.notesSection}>
                <h3 className={styles.sectionTitle}>Suas anotações</h3>
                <div className={styles.notesContent}>
                  <p>{registro.observacoes}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={styles.actionRow}>
          <button
            onClick={() => router.push('/meus-registros')}
            className={styles.backSmall}
          >
            ← Voltar ao histórico
          </button>

          <button
            onClick={() => router.push(`/meus-registros/${registro.id}/editar`)}
            className={styles.editButton}
          >
            Editar registro
          </button>

          <button
            onClick={() => {
              if (confirm('Deseja realmente excluir este registro?')) {
                // Em produção, chamar API para deletar. Aqui só navega de volta
                alert('Registro excluído (mock)');
                router.push('/meus-registros');
              }
            }}
            className={styles.deleteButton}
          >
            Excluir registro
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}