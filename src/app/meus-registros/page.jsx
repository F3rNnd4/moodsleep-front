"use client";
import { useState, useMemo } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./meus-registros.module.css";

export default function MeusRegistros() {
  // Função para obter a cor baseada no humor
  const getHumorColor = (humorId) => {
    const cores = {
      1: '#E57373', // Bravo - Rosa suave (harmonia com roxo)
      2: '#B39DDB', // Triste - Lilás claro (harmonia com #AEA2FC)
      3: '#D1C4E9', // Neutro - Roxo muito claro
      4: '#FFD700', // Feliz - Amarelo do projeto
      5: '#AEA2FC'  // Apaixonado - Roxo principal do projeto
    };
    return cores[humorId] || '#D1C4E9';
  };

  // Dados mockados - em produção viriam da API
  const [registros] = useState([
    {
      id: 1,
      data: "2025-09-18",
      humor: { id: 4, emoji: "😊", label: "Bom humor" },
      sono: "7h 45min",
      observacoes: "Dia foi produtivo, consegui descansar bem."
    },
    {
      id: 2,
      data: "2025-09-17",
      humor: { id: 4, emoji: "😊", label: "Bom humor" },
      sono: "8h 10min",
      observacoes: "Um pouco cansada, mas nada demais."
    },
    {
      id: 3,
      data: "2025-09-16",
      humor: { id: 1, emoji: "😡", label: "Irritado" },
      sono: "4h 30min",
      observacoes: "Não consegui dormir bem e fiquei estressado."
    },
    {
      id: 4,
      data: "2025-09-15",
      humor: { id: 3, emoji: "😐", label: "Neutro" },
      sono: "6h 20min",
      observacoes: "Dia normal, nada especial."
    },
    {
      id: 5,
      data: "2025-09-14",
      humor: { id: 5, emoji: "😍", label: "Muito feliz" },
      sono: "8h 30min",
      observacoes: "Dia incrível! Dormi muito bem."
    },
    {
      id: 6,
      data: "2025-09-13",
      humor: { id: 2, emoji: "😔", label: "Triste" },
      sono: "5h 15min",
      observacoes: "Dia difícil, problemas no trabalho."
    }
  ]);

  // Estados dos filtros
  const [filtroData, setFiltroData] = useState("todos");
  const [filtroHumor, setFiltroHumor] = useState("todos");
  const [filtroSono, setFiltroSono] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("recente");

  // Opções dos filtros
  const humores = [
    { id: "todos", emoji: "🎭", label: "Todos" },
    { id: 1, emoji: "😡", label: "Irritado" },
    { id: 2, emoji: "😔", label: "Triste" },
    { id: 3, emoji: "😐", label: "Neutro" },
    { id: 4, emoji: "😊", label: "Feliz" },
    { id: 5, emoji: "😍", label: "Muito feliz" }
  ];

  // Função para filtrar registros
  const registrosFiltrados = useMemo(() => {
    let resultado = [...registros];

    // Filtro por data
    const hoje = new Date();
    if (filtroData !== "todos") {
      resultado = resultado.filter(registro => {
        const dataRegistro = new Date(registro.data);
        const diffTime = hoje.getTime() - dataRegistro.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (filtroData) {
          case "7dias":
            return diffDays <= 7;
          case "30dias":
            return diffDays <= 30;
          case "90dias":
            return diffDays <= 90;
          default:
            return true;
        }
      });
    }

    // Filtro por humor
    if (filtroHumor !== "todos") {
      resultado = resultado.filter(registro => registro.humor.id === parseInt(filtroHumor));
    }

    // Filtro por sono
    if (filtroSono !== "todos") {
      resultado = resultado.filter(registro => {
        const horas = parseFloat(registro.sono.replace(/[^0-9.]/g, ''));
        switch (filtroSono) {
          case "pouco": // menos de 6h
            return horas < 6;
          case "ideal": // 6-8h
            return horas >= 6 && horas <= 8;
          case "muito": // mais de 8h
            return horas > 8;
          default:
            return true;
        }
      });
    }

    // Ordenação
    resultado.sort((a, b) => {
      const dataA = new Date(a.data);
      const dataB = new Date(b.data);
      return ordenacao === "recente" ? dataB - dataA : dataA - dataB;
    });

    return resultado;
  }, [registros, filtroData, filtroHumor, filtroSono, ordenacao]);

  // Calcular estatísticas
  const estatisticas = useMemo(() => {
    if (registrosFiltrados.length === 0) return { humorMedio: "😐", mediaSono: "0h", diasRegistrados: 0 };

    // Humor mais comum
    const contadorHumor = {};
    registrosFiltrados.forEach(r => {
      const humor = r.humor.id;
      contadorHumor[humor] = (contadorHumor[humor] || 0) + 1;
    });
    const humorMaisComum = Object.keys(contadorHumor).reduce((a, b) => 
      contadorHumor[a] > contadorHumor[b] ? a : b
    );
    const humorMedio = humores.find(h => h.id === parseInt(humorMaisComum))?.emoji || "😐";

    // Média de sono
    const totalSono = registrosFiltrados.reduce((acc, r) => {
      const horas = parseFloat(r.sono.replace(/[^0-9.]/g, ''));
      return acc + horas;
    }, 0);
    const mediaSono = Math.round((totalSono / registrosFiltrados.length) * 10) / 10;

    return {
      humorMedio,
      mediaSono: `${Math.floor(mediaSono)}h ${Math.round((mediaSono % 1) * 60)}min`,
      diasRegistrados: registrosFiltrados.length
    };
  }, [registrosFiltrados]);

  const formatarData = (dataStr) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.sunImage}>
        <img
          src="/images/sol.png"
          alt="Sol"
          width={200}
          height={200}
          className={styles.decorativeImage}
        />
      </div>
      
      <div className={styles.moonImage}>
        <img
          src="/images/lua-cheia.png"
          alt="Lua"
          width={250}
          height={250}
          className={styles.decorativeImage}
        />
      </div>

      <main className={styles.main}>
        <section className={styles.headerSection}>
          <h1 className={styles.title}>Seu histórico de bem-estar</h1>
          <p className={styles.subtitle}>Acompanhe sua evolução de humor e sono ao longo do tempo</p>
        </section>

        {/* Estatísticas */}
        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Humor médio da semana</div>
            <div className={styles.statValue}>
              <span className={styles.statEmoji}>{estatisticas.humorMedio}</span>
              <span>Bom humor</span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Média de horas de sono</div>
            <div className={styles.statValue}>
              <span className={styles.statEmoji}>😴</span>
              <span>{estatisticas.mediaSono}</span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Dias registrados</div>
            <div className={styles.statValue}>
              <span className={styles.statEmoji}>📅</span>
              <span>{estatisticas.diasRegistrados} dias na última semana</span>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className={styles.filtersSection}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Período:</label>
              <select 
                value={filtroData} 
                onChange={(e) => setFiltroData(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="todos">Todos os registros</option>
                <option value="7dias">Últimos 7 dias</option>
                <option value="30dias">Últimos 30 dias</option>
                <option value="90dias">Últimos 90 dias</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Humor:</label>
              <select 
                value={filtroHumor} 
                onChange={(e) => setFiltroHumor(e.target.value)}
                className={styles.filterSelect}
              >
                {humores.map(humor => (
                  <option key={humor.id} value={humor.id}>
                    {humor.emoji} {humor.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Sono:</label>
              <select 
                value={filtroSono} 
                onChange={(e) => setFiltroSono(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="todos">🌙 Todas as durações</option>
                <option value="pouco">😴 Pouco sono (&lt; 6h)</option>
                <option value="ideal">💤 Sono ideal (6-8h)</option>
                <option value="muito">😪 Muito sono (&gt; 8h)</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Ordenar:</label>
              <select 
                value={ordenacao} 
                onChange={(e) => setOrdenacao(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="recente">Mais recente</option>
                <option value="antigo">Mais antigo</option>
              </select>
            </div>
          </div>

          <div className={styles.resultsInfo}>
            Mostrando {registrosFiltrados.length} de {registros.length} registros
          </div>
        </section>

        {/* Lista de registros */}
        <section className={styles.recordsList}>
          {registrosFiltrados.length === 0 ? (
            <div className={styles.noRecords}>
              <p>Nenhum registro encontrado com os filtros aplicados.</p>
              <button 
                onClick={() => {
                  setFiltroData("todos");
                  setFiltroHumor("todos");
                  setFiltroSono("todos");
                }}
                className={styles.clearFiltersBtn}
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            registrosFiltrados.map(registro => (
              <div 
                key={registro.id} 
                className={styles.recordCard}
                style={{ borderLeft: `4px solid ${getHumorColor(registro.humor.id)}` }}
              >
                <div 
                  className={styles.recordDate}
                  style={{ backgroundColor: getHumorColor(registro.humor.id) }}
                >
                  {formatarData(registro.data)}
                </div>
                <div className={styles.recordContent}>
                  <div className={styles.recordMood}>
                    <span className={styles.moodEmoji}>{registro.humor.emoji}</span>
                    <span className={styles.moodLabel}>{registro.humor.label}</span>
                  </div>
                  <div className={styles.recordSleep}>
                    <span className={styles.sleepIcon}>😴</span>
                    <span className={styles.sleepValue}>{registro.sono}</span>
                  </div>
                  {registro.observacoes && (
                    <div className={styles.recordNotes}>
                      <span className={styles.notesLabel}>Observações:</span>
                      <span className={styles.notesText}>{registro.observacoes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </section>

        <div className={styles.actionSection}>
          <button className={styles.newRecordBtn}>
            Registrar novo dia
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}