import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFood } from "../context/FoodContext";
import StatusBadge from "../components/StatusBadge";
import ConfirmModal from "../components/ConfirmModal";
import { useToast } from "../hooks/useToast";
import ToastContainer from "../components/Toast";
import "./DetalhesPage.css";
import { formatDate } from "../utils/formatDate";

export default function DetalhesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItem, updateItem, removeItem, calcStatus, calcDaysLeft } =
    useFood();
  const { toasts, addToast, removeToast } = useToast();

  const item = getItem(id);

  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: item
      ? {
          name: item.name,
          quantity: item.quantity,
          expirationDate: item.expirationDate,
        }
      : {},
  });

  useEffect(() => {
    if (!item) return;

    reset({
      name: item.name,
      quantity: item.quantity,
      expirationDate: item.expirationDate,
    });
  }, [item, reset]);

  if (!item) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <p>Item não encontrado.</p>
        <Link
          to="/dashboard"
          className="btn btn-primary"
          style={{ marginTop: 12 }}
        >
          ← Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  const status = calcStatus(item.expirationDate);
  const daysLeft = calcDaysLeft(item.expirationDate);

  function onSave(data) {
    updateItem(item.id, {
      name: data.name,
      quantity: Number(data.quantity),
      expirationDate: data.expirationDate,
    });
    addToast("Item atualizado com sucesso!", "success");
    setIsEditing(false);
  }

  function handleCancelEdit() {
    reset();
    setIsEditing(false);
  }

  function handleDeleteConfirm() {
    removeItem(item.id);
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="detalhe-card">
      <Link to="/dashboard" className="back-btn">
        ← Voltar
      </Link>

      <div className="card">
        <div className="detalhe-header">
          <h2 className="detalhe-title">{item.name}</h2>
          <StatusBadge status={status} daysLeft={daysLeft} />
        </div>

        <p className="detalhe-meta">
          Cadastrado em: {formatDate(item.createdAt)}
        </p>

        <form onSubmit={handleSubmit(onSave)} noValidate>
          <div className="detalhe-form">
            <div className="form-group">
              <label className="form-label" htmlFor="det-name">
                Nome <span>*</span>
              </label>
              <input
                id="det-name"
                type="text"
                className={`form-input ${errors.name ? "error" : ""}`}
                disabled={!isEditing}
                {...register("name", {
                  setValueAs: (value) => value.trim(),
                  required: "Nome é obrigatório",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
              />
              {errors.name && (
                <span className="form-error">{errors.name.message}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="det-qty">
                  Quantidade <span>*</span>
                </label>
                <input
                  id="det-qty"
                  type="number"
                  min={1}
                  className={`form-input ${errors.quantity ? "error" : ""}`}
                  disabled={!isEditing}
                  {...register("quantity", {
                    required: "Obrigatório",
                    min: { value: 1, message: "Mínimo 1" },
                  })}
                />
                {errors.quantity && (
                  <span className="form-error">{errors.quantity.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="det-exp">
                  Vencimento <span>*</span>
                </label>
                <input
                  id="det-exp"
                  type="date"
                  className={`form-input ${errors.expirationDate ? "error" : ""}`}
                  disabled={!isEditing}
                  {...register("expirationDate", { required: "Obrigatório" })}
                />
                {errors.expirationDate && (
                  <span className="form-error">
                    {errors.expirationDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="detalhe-actions">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isDirty}
                  >
                    💾 Salvar alterações
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShowDelete(true)}
                  >
                    🗑️ Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      <ConfirmModal
        isOpen={showDelete}
        title={`Excluir "${item.name}"?`}
        message="Essa ação não pode ser desfeita. O item será removido permanentemente."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDelete(false)}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
