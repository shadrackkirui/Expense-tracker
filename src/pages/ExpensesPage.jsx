import React, { useState, useEffect } from 'react'
import { PlusCircle, Trash2 } from 'lucide-react'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([])
  const [amount, setAmount] = useState('')
  const [desc, setDesc] = useState('')
  const [budget, setBudget] = useState('')

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || []
    const savedBudget = localStorage.getItem('budget') || ''
    setExpenses(savedExpenses)
    setBudget(savedBudget)
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
    localStorage.setItem('budget', budget)
  }, [expenses, budget])

  const addExpense = (e) => {
    e.preventDefault()
    if (!amount || !desc) return
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      desc,
    }
    setExpenses([newExpense, ...expenses])
    setAmount('')
    setDesc('')
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = budget ? budget - totalSpent : null

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Expenses</h2>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Set Budget (Ksh)</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <form onSubmit={addExpense} className="flex gap-4 mb-6">
        <input
          type="number"
          placeholder="Amount (Ksh)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 rounded flex items-center">
          <PlusCircle className="w-5 h-5 mr-1" /> Add
        </button>
      </form>

      {budget && (
        <div className="mb-6">
          <p className="font-semibold">Budget: Ksh {budget}</p>
          <p className="font-semibold">Spent: Ksh {totalSpent}</p>
          <p className={`font-semibold ${remaining < 0 ? 'text-red-500' : 'text-green-600'}`}>
                 Remaining: Ksh {remaining}
          </p>

        </div>
      )}

      <ul className="space-y-3">
        {expenses.map(exp => (
          <li key={exp.id} className="flex justify-between items-center bg-white shadow p-3 rounded">
            <span>{exp.desc} - <strong>Ksh {exp.amount}</strong></span>
            <button onClick={() => deleteExpense(exp.id)} className="text-red-600 hover:text-red-800">
              <Trash2 className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
