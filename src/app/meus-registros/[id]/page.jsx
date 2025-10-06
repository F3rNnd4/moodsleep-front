"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../lib/api";
import styles from "./registro-detalhes.module.css";

export default function DetalhesRegistro() {
  const router = useRouter();
  const params = useParams();
  const [registro, setRegistro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    moodLevel: 3,
    sleepHours: 7,
    notes: ""
  });

  const humores = [
    { id: 1, emoji: "😡", label: "Irritado" },
    { id: 2, emoji: "😔", label: "Triste" },
    { id: 3, emoji: "😐", label: "Neutro" },
    { id: 4, emoji: "😊", label: "Feliz" },
    { id: 5, emoji: "😍", label: "Muito feliz" }
  ];

  useEffect(() => {
    let isMounted = true;
    
    if (params.id && isMounted) {
      buscarRegistro();
    }

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  const buscarRegistro = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.registers.getById(params.id);
      
      if (!response.ok) {
        throw new Error("Registro não encontrado");
      }
      
      const data = await response.json();
      
      // Verificar se o componente ainda está montado antes de atualizar o estado
      setRegistro(data);
      
      setFormData({
        date: data.date.split('T')[0],
        moodLevel: data.moodLevel,
        sleepHours: data.sleepHours,
        notes: data.notes || ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      setShowDeleteModal(false);
      const response = await api.registers.delete(params.id);
      
      if (!response.ok) {
        throw new Error("Erro ao excluir registro");
      }
      
      setModalMessage("Registro excluído com sucesso!");
      setShowSuccessModal(true);
      
      // Usar setTimeout para evitar problemas de navegação
      setTimeout(() => {
        router.push("/meus-registros");
      }, 2000);
    } catch (err) {
      setModalMessage("Erro ao excluir: " + err.message);
      setShowSuccessModal(true);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await api.registers.update(params.id, formData);
      
      if (!response.ok) {
        throw new Error("Erro ao atualizar registro");
      }
      
      setShowUpdateSuccessModal(true);
      setEditando(false);
      
      // Aguardar um pouco antes de recarregar para evitar conflitos
      setTimeout(() => {
        buscarRegistro();
      }, 100);
    } catch (err) {
      setModalMessage("Erro ao atualizar: " + err.message);
      setShowSuccessModal(true);
      setLoading(false);
    }
  };

  const formatarData = (dataStr) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <h2>Carregando...</h2>
      </div>
    </div>
  );
  
  if (error) return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h2>Erro</h2>
        <p>{error}</p>
        <Link href="/meus-registros" className={styles.backLink}>← Voltar aos registros</Link>
      </div>
    </div>
  );
  
  if (!registro) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h2>Carregando registro...</h2>
        </div>
      </div>
    );
  }

  const humorAtual = humores.find(h => h.id === registro.moodLevel) || humores[2]; // Default para neutro

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Detalhes do Registro</h1>
      </div>

      {!editando ? (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.dateInfo}>
              <h2 className={styles.dateTitle}>{formatarData(registro.date)}</h2>
              <p className={styles.timeInfo}>Registro de humor e sono</p>
            </div>
            <div className={styles.actions}>
              <button onClick={() => setEditando(true)} className={styles.editButton}>Editar</button>
              <button onClick={handleDelete} className={styles.deleteButton}>Excluir</button>
            </div>
          </div>

          <div className={styles.cardContent}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Humor</span>
                <div className={styles.infoValue}>
                  <div className={styles.moodDisplay}>
                    <span className={styles.moodEmoji}>{humorAtual.emoji}</span>
                    <span className={styles.moodText}>{humorAtual.label}</span>
                  </div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Horas de sono</span>
                <div className={styles.infoValue}>
                  {Math.floor(registro.sleepHours)}h {Math.round((registro.sleepHours % 1) * 60)}min
                </div>
              </div>
            </div>

            {registro.notes && (
              <div className={styles.notesSection}>
                <span className={styles.notesLabel}>Observações</span>
                <div className={styles.notesContent}>
                  {registro.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={`${styles.card} ${styles.editMode}`}>
          <div className={styles.cardHeader}>
            <div className={styles.dateInfo}>
              <h2 className={styles.dateTitle}>Editando Registro</h2>
              <p className={styles.timeInfo}>Faça as alterações necessárias</p>
            </div>
          </div>

          <div className={styles.cardContent}>
            <form className={styles.editForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Data</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Humor</label>
                <div className={styles.moodSelector}>
                  {humores.map(humor => (
                    <button
                      key={humor.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, moodLevel: humor.id })}
                      className={`${styles.moodOption} ${formData.moodLevel === humor.id ? styles.selected : ''}`}
                    >
                      <span className={styles.moodEmoji}>{humor.emoji}</span>
                      <span className={styles.moodLabel}>{humor.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Horas de sono</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData({ ...formData, sleepHours: parseFloat(e.target.value) })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Observações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={styles.formTextarea}
                  rows="4"
                  maxLength="200"
                  placeholder="Adicione suas observações aqui..."
                />
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  {formData.notes.length}/200 caracteres
                </small>
              </div>

              <div className={styles.editActions}>
                <button type="button" onClick={handleUpdate} className={styles.saveButton}>
                  Salvar Alterações
                </button>
                <button type="button" onClick={() => setEditando(false)} className={styles.cancelButton}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Botão de Voltar Centralizado */}
      {!editando && (
        <div className={styles.backButtonContainer}>
          <Link href="/meus-registros" className={styles.backButtonCentered}>
            ← Voltar aos Registros
          </Link>
        </div>
      )}

      {/* Modal de Sucesso da Atualização */}
      {showUpdateSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.updateSuccessModal}>
            <div className={styles.updateSuccessIcon}>✓</div>
            <h3>Atualizado!</h3>
            <p>Registro atualizado com sucesso</p>
            <button 
              onClick={() => setShowUpdateSuccessModal(false)} 
              className={styles.updateSuccessButton}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Confirmar Exclusão</h3>
            </div>
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja excluir este registro?</p>
              <p className={styles.warningText}>Esta ação não pode ser desfeita.</p>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelModalButton}>
                Cancelar
              </button>
              <button onClick={confirmDelete} className={styles.deleteModalButton}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sucesso/Erro */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{modalMessage.includes("Erro") ? "Erro" : "Sucesso"}</h3>
            </div>
            <div className={styles.modalBody}>
              <p>{modalMessage}</p>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setShowSuccessModal(false)} className={styles.okModalButton}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}