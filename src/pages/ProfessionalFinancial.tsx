import { useState } from 'react'
import { Calendar, TrendingUp, TrendingDown, DollarSign, FileText, Download, Filter } from 'lucide-react'

export function ProfessionalFinancial() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month')

  // Mock data - em produção virá do banco de dados
  const financialData = {
    revenue: 15000.00,
    expenses: 2500.00,
    platformFee: 1500.00,
    netIncome: 11000.00,
    growthRate: 12.5,
    totalConsultations: 45,
    averageTicket: 333.33
  }

  const recentTransactions = [
    { id: '1', date: '2025-01-26', description: 'Consulta - Paulo Gonçalves', amount: 450.00, type: 'income' },
    { id: '2', date: '2025-01-25', description: 'Taxa da plataforma (10%)', amount: -150.00, type: 'expense' },
    { id: '3', date: '2025-01-24', description: 'Consulta - Maria Silva', amount: 450.00, type: 'income' },
    { id: '4', date: '2025-01-23', description: 'Taxa da plataforma (10%)', amount: -150.00, type: 'expense' },
    { id: '5', date: '2025-01-22', description: 'Consulta - João Santos', amount: 450.00, type: 'income' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              💰 Gestão Financeira
            </h1>
            <p className="text-gray-300">
              Acompanhe sua receita, despesas e comissões da plataforma
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
              <Download size={20} />
              Exportar Relatório
            </button>
            <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold">
              <Filter size={20} />
              Filtrar
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              period === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Este Mês
          </button>
          <button
            onClick={() => setPeriod('quarter')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              period === 'quarter'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Trimestre
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              period === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Ano
          </button>
        </div>

        {/* Financial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-semibold">+{financialData.growthRate}%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Receita Total</h3>
            <p className="text-3xl font-bold text-white">R$ {financialData.revenue.toFixed(2)}</p>
          </div>

          {/* Platform Fee */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="text-orange-400" size={24} />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Comissão da Plataforma</h3>
            <p className="text-3xl font-bold text-white">R$ {financialData.platformFee.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-2">10% sobre receita</p>
          </div>

          {/* Expenses */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-red-400" size={24} />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Despesas</h3>
            <p className="text-3xl font-bold text-white">R$ {financialData.expenses.toFixed(2)}</p>
          </div>

          {/* Net Income */}
          <div className="bg-slate-800 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FileText className="text-green-400" size={24} />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Lucro Líquido</h3>
            <p className="text-3xl font-bold text-green-400">R$ {financialData.netIncome.toFixed(2)}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-gray-400 text-sm mb-2">Total de Consultas</h3>
            <p className="text-2xl font-bold text-white">{financialData.totalConsultations}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-gray-400 text-sm mb-2">Ticket Médio</h3>
            <p className="text-2xl font-bold text-white">R$ {financialData.averageTicket.toFixed(2)}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-gray-400 text-sm mb-2">Taxa da Plataforma</h3>
            <p className="text-2xl font-bold text-white">10%</p>
            <p className="text-xs text-gray-400 mt-1">Sobre cada consulta</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Transações Recentes</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
              Ver Todas
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Data</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Descrição</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-semibold text-sm">Valor</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <td className="py-3 px-4 text-gray-300 text-sm">{transaction.date}</td>
                    <td className="py-3 px-4 text-white text-sm">{transaction.description}</td>
                    <td className={`py-3 px-4 text-right font-semibold text-sm ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}R$ {transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        Confirmado
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-blue-400 font-semibold mb-2">ℹ️ Como Funciona</h3>
          <p className="text-gray-300 text-sm">
            A taxa da plataforma é de 10% sobre cada consulta realizada. Os pagamentos são processados automaticamente 
            e o valor líquido é creditado na sua conta em até 7 dias úteis. Você pode acompanhar todas as transações 
            e gerar relatórios para sua contabilidade.
          </p>
        </div>
      </div>
    </div>
  )
}
