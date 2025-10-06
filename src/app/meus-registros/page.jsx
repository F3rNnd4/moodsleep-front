"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import HeaderDashboard from "../components/HeaderDashboard/HeaderDashboard";
import Footer from "../components/Footer/Footer";
import { api } from "../../../lib/api";
import styles from "./meus-registros.module.css";

export default function MeusRegistros() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRegistros = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("➡️ Buscando registros via API");
      const response = await api.registers.getAll();

      if (!response.ok) {
        const status = response.status;
        setError(`Não foi possível carregar os registros (Status ${status}).`);
        setRegistros([]);
        return;
      }

      const data = await response.json();
      console.log("🔍 Dados recebidos da API:", data);

      if (data && data.length > 0) {
        console.log("📋 Primeiro registro:", data[0]);
        console.log("🔑 Chaves do primeiro registro:", Object.keys(data[0]));
      }

      // Normalizar os dados para o formato esperado
      const registrosNormalizados = Array.isArray(data)
        ? data.map(normalizeRegistro)
        : [];
      console.log("📝 Registros normalizados:", registrosNormalizados);
      setRegistros(registrosNormalizados);
    } catch (err) {
      console.error("Erro ao buscar registros:", err);
      setError(
        "Não foi possível carregar os registros. Verifique sua conexão."
      );
      setRegistros([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  // Função para normalizar registros da API para formato esperado
  const normalizeRegistro = (registro) => {
    const id = registro.id;
    const data = registro.date || new Date().toISOString();

    // Mapear humor
    const humorId = registro.moodLevel || 3;
    const humorEmojis = { 1: "😡", 2: "😔", 3: "😐", 4: "😊", 5: "😍" };
    const humorLabels = {
      1: "Irritado",
      2: "Triste",
      3: "Neutro",
      4: "Feliz",
      5: "Muito feliz",
    };

    // Mapear sono - mantém como número
    const sleepHours = registro.sleepHours || 0;
    const horasInteiras = Math.floor(sleepHours);
    const minutos = Math.round((sleepHours % 1) * 60);
    const sonoFormatado =
      minutos > 0 ? `${horasInteiras}h ${minutos}min` : `${horasInteiras}h`;

    return {
      id,
      data,
      sono: sonoFormatado,
      sleepHours: sleepHours, // mantém o número original para filtros
      observacoes: registro.notes || "",
      humor: {
        id: humorId,
        emoji: humorEmojis[humorId],
        label: humorLabels[humorId],
      },
    };
  };

  // Função para obter a cor baseada no humor
  const getHumorColor = (humorId) => {
    const cores = {
      1: "#E57373", // Bravo - Rosa suave (harmonia com roxo)
      2: "#B39DDB", // Triste - Lilás claro (harmonia com #AEA2FC)
      3: "#D1C4E9", // Neutro - Roxo muito claro
      4: "#FFD700", // Feliz - Amarelo do projeto
      5: "#AEA2FC", // Apaixonado - Roxo principal do projeto
    };
    return cores[humorId] || "#D1C4E9";
  };

  // registros será preenchido pela API (via useEffect)

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
    { id: 5, emoji: "😍", label: "Muito feliz" },
  ];

  // Função para filtrar registros
  const registrosFiltrados = useMemo(() => {
    let resultado = [...registros];

    // Filtro por data
    const hoje = new Date();
    if (filtroData !== "todos") {
      resultado = resultado.filter((registro) => {
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
      resultado = resultado.filter(
        (registro) => registro.humor.id === parseInt(filtroHumor)
      );
    }

    // Filtro por sono
    if (filtroSono !== "todos") {
      resultado = resultado.filter((registro) => {
        const horas = registro.sleepHours; // usa o número direto
        switch (filtroSono) {
          case "pouco":
            return horas < 6;
          case "ideal":
            return horas >= 6 && horas <= 8;
          case "muito":
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
    if (registrosFiltrados.length === 0)
      return { humorMedio: "😐", mediaSono: "0h", diasRegistrados: 0 };

    // Humor mais comum (protegendo registros com shape inesperado)
    const contadorHumor = {};
    registrosFiltrados.forEach((r) => {
      const humorId = r?.humor?.id;
      if (typeof humorId === "number" || typeof humorId === "string") {
        const key = String(humorId);
        contadorHumor[key] = (contadorHumor[key] || 0) + 1;
      }
    });

    let humorMedio = "😐";
    const humorKeys = Object.keys(contadorHumor);
    if (humorKeys.length > 0) {
      const humorMaisComum = humorKeys.reduce((a, b) =>
        contadorHumor[a] > contadorHumor[b] ? a : b
      );
      humorMedio =
        humores.find((h) => String(h.id) === humorMaisComum)?.emoji || "😐";
    }

    // Média de sono (soma apenas registros com campo sono válido)
    const sonoValidos = registrosFiltrados
      .map((r) => {
        try {
          return parseFloat(String(r.sono).replace(/[^0-9.]/g, "")) || 0;
        } catch {
          return 0;
        }
      })
      .filter((h) => !Number.isNaN(h));

    const totalSono = sonoValidos.reduce((acc, h) => acc + h, 0);
    const mediaSonoNum =
      sonoValidos.length > 0
        ? Math.round((totalSono / sonoValidos.length) * 10) / 10
        : 0;

    return {
      humorMedio,
      mediaSono: `${Math.floor(mediaSonoNum)}h ${Math.round(
        (mediaSonoNum % 1) * 60
      )}min`,
      diasRegistrados: registrosFiltrados.length,
    };
  }, [registrosFiltrados]);

  const formatarData = (dataStr) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      <HeaderDashboard />

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
        {loading && (
          <div className={styles.centerMessage}>
            <p>Carregando registros...</p>
          </div>
        )}
        {error && (
          <div className={styles.centerMessage}>
            <p className={styles.errorText}>
              Não foi possível carregar os registros. Verifique se o servidor
              está rodando.
            </p>
            <button
              onClick={fetchRegistros}
              className={styles.retryButton}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Tentar novamente"}
            </button>
          </div>
        )}
        <section className={styles.headerSection}>
          <h1 className={styles.title}>Seu histórico de bem-estar</h1>
          <p className={styles.subtitle}>
            Acompanhe sua evolução de humor e sono ao longo do tempo
          </p>
        </section>

        {/* Estatísticas */}
        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Humor médio da semana</div>
            <div className={styles.statValue}>
              <span className={styles.statEmoji}>
                {estatisticas.humorMedio}
              </span>
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
                {humores.map((humor) => (
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
            Mostrando {registrosFiltrados.length} de {registros.length}{" "}
            registros
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
            registrosFiltrados.map((registro) => (
              <Link
                key={registro.id}
                href={`/meus-registros/${registro.id}`}
                className={styles.recordLink}
              >
                {(() => {
                  const humorId = registro?.humor?.id ?? null;
                  const humorEmoji = registro?.humor?.emoji ?? "😐";
                  const humorLabel = registro?.humor?.label ?? "Sem informação";
                  const sonoText = registro?.sono ?? "-";
                  const borderColor = getHumorColor(humorId);

                  return (
                    <div
                      className={styles.recordCard}
                      style={{ borderLeft: `4px solid ${borderColor}` }}
                    >
                      <div
                        className={styles.recordDate}
                        style={{ backgroundColor: borderColor }}
                      >
                        {formatarData(registro.data)}
                      </div>
                      <div className={styles.recordContent}>
                        <div className={styles.recordMood}>
                          <span className={styles.moodEmoji}>{humorEmoji}</span>
                          <span className={styles.moodLabel}>{humorLabel}</span>
                        </div>
                        <div className={styles.recordSleep}>
                          <span className={styles.sleepIcon}>😴</span>
                          <span className={styles.sleepValue}>{sonoText}</span>
                        </div>
                        {registro.observacoes && (
                          <div className={styles.recordNotes}>
                            <span className={styles.notesLabel}>
                              Observações:
                            </span>
                            <span className={styles.notesText}>
                              {registro.observacoes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </Link>
            ))
          )}
        </section>

        <div className={styles.actionSection}>
          <Link className={styles.newRecordBtn} href="/dashboard">
            Registrar novo dia
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
