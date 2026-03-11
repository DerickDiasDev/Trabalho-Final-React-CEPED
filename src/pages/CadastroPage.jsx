import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useFood } from '../context/FoodContext'
import './CadastroPage.css'

/**
 * CadastroPage – rota estática: /cadastro
 * Usa react-hook-form para validação
 * Comunica com FoodContext para adicionar item
 */
export default function CadastroPage() {
  const { addItem } = useFood()
  const navigate    = useNavigate()

  const today = new Date().toISOString().split('T')[0]

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      quantity: 1,
      expirationDate: '',
    },
  })

  function onSubmit(data) {
    addItem({
      name: data.name.trim(),
      quantity: Number(data.quantity),
      expirationDate: data.expirationDate,
    })
    navigate('/dashboard')
  }

  return (
    <div className="cadastro-card">
      <Link to="/dashboard" className="back-btn">← Voltar</Link>

      <div className="card">
        <h2 className="cadastro-title">Cadastre um novo item</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="cadastro-form">

            {/* Nome */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Nome <span>*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Ex: Maçã"
                {...register('name', {
                  required: 'Nome é obrigatório',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                  maxLength: { value: 80, message: 'Máximo 80 caracteres' },
                })}
              />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            {/* Quantidade + Validade */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="quantity">
                  Quantidade <span>*</span>
                </label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  className={`form-input ${errors.quantity ? 'error' : ''}`}
                  placeholder="1"
                  {...register('quantity', {
                    required: 'Quantidade é obrigatória',
                    min: { value: 1, message: 'Mínimo 1' },
                    max: { value: 9999, message: 'Máximo 9999' },
                  })}
                />
                {errors.quantity && <span className="form-error">{errors.quantity.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="expirationDate">
                  Vencimento <span>*</span>
                </label>
                <input
                  id="expirationDate"
                  type="date"
                  className={`form-input ${errors.expirationDate ? 'error' : ''}`}
                  {...register('expirationDate', {
                    required: 'Data de vencimento é obrigatória',
                  })}
                />
                {errors.expirationDate && <span className="form-error">{errors.expirationDate.message}</span>}
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 4 }}
              disabled={isSubmitting}
            >
              + Adicionar Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
