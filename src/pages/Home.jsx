import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h2 className="text-4xl font-bold mb-6 text-blue-700">Welcome to Expense Tracker</h2>
      <p className="text-gray-700 mb-8 max-w-xl">
        Track your daily expenses, manage your budget in Kenyan Shillings (Ksh), 
        and keep your spending organized. All your data is safely stored in your browser. But you can optionally download a CSV file for you expenses
      </p>
      <Link to="/expenses" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow">
        Get Started
      </Link>
    </div>
  )
}
