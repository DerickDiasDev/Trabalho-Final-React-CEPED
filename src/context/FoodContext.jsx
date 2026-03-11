import { createContext, useContext, useState, useEffect } from 'react'

const FoodContext = createContext(null)

function calcStatus(expirationDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const exp = new Date(expirationDate)
  exp.setHours(0, 0, 0, 0)
  const diffDays = Math.round((exp - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0)  return 'danger'  // vencido
  if (diffDays <= 7) return 'warn'    // perto de vencer
  return 'ok'
}

function calcDaysLeft(expirationDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const exp = new Date(expirationDate)
  exp.setHours(0, 0, 0, 0)
  return Math.round((exp - today) / (1000 * 60 * 60 * 24))
}

export function FoodProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('valy_items')) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('valy_items', JSON.stringify(items))
  }, [items])

  function addItem(data) {
    const newItem = {
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      ...data,
    }
    setItems(prev => [newItem, ...prev])
    return newItem
  }

  function updateItem(id, data) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...data } : item))
  }

  function removeItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function getItem(id) {
    return items.find(item => item.id === Number(id))
  }

  // Estatísticas derivadas
  const stats = {
    ok:     items.filter(i => calcStatus(i.expirationDate) === 'ok').length,
    warn:   items.filter(i => calcStatus(i.expirationDate) === 'warn').length,
    danger: items.filter(i => calcStatus(i.expirationDate) === 'danger').length,
    total:  items.length,
  }

  return (
    <FoodContext.Provider value={{ items, stats, addItem, updateItem, removeItem, getItem, calcStatus, calcDaysLeft }}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFood() {
  const ctx = useContext(FoodContext)
  if (!ctx) throw new Error('useFood deve ser usado dentro de <FoodProvider>')
  return ctx
}
