"use client";

import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import SummaryCards from "@/components/SummaryCards";
import CategoryPieChart from "@/components/CategoryPieChart";
import BudgetForm from "@/components/BudgetForm";
import BudgetChart from "@/components/BudgetChart";
import SpendingInsights from "@/components/SpendingInsights";
import type { Transaction } from '@/lib/models';



type Tab = "dashboard" | "transactions" | "budget" | "insights";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingTransaction, setEditingTransaction] = useState< Transaction | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().toISOString().slice(0, 7)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const handleAddOrUpdate = () => {
    setRefreshKey((prev) => prev + 1);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-auto">
      {/* Top Header */}
    
      <header className="bg-zinc-950 px-6 py-4 shadow-md border-b border-zinc-800 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            💰{" "}
            <span className=" sm:inline">Personal Finance Tracker</span>
          </h1>

          {/* Desktop menu */}
          <nav className="space-x-4 text-sm hidden sm:block">
            {(["dashboard", "transactions", "budget", "insights"] as Tab[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md ${
                    activeTab === tab
                      ? "bg-white text-black font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 flex flex-col space-y-2">
            {(["dashboard", "transactions", "budget", "insights"] as Tab[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeTab === tab
                      ? "bg-white text-black font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>
        )}
      </header>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-zinc-900 p-4 rounded-xl shadow border">
              <MonthlyBarChart refresh={refreshKey} />
              <SummaryCards refresh={refreshKey} />
            </div>
            <div className="bg-zinc-900 p-4 rounded-xl shadow border">
              <CategoryPieChart refresh={refreshKey} />
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-zinc-900 p-4 rounded-xl shadow border">
              <TransactionForm
                onAdd={handleAddOrUpdate}
                editingTransaction={editingTransaction}
                onClearEdit={() => setEditingTransaction(null)}
              />
            </div>
            <div className="bg-zinc-900 p-4 rounded-xl shadow border max-h-[500px] overflow-y-auto">
              <TransactionList
                refresh={refreshKey}
                onRefresh={() => setRefreshKey((k) => k + 1)}
                onEdit={setEditingTransaction}
              />
            </div>
          </div>
        )}

        {activeTab === "budget" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Month Selector */}
            <div className="col-span-full mb-2">
              <label className="text-sm text-gray-400 mr-2">
                Select Month:
              </label>
              <input
                type="month"
                className="bg-zinc-800 text-white rounded px-2 py-1"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>

            {/* Budget Form */}
            <div className="bg-zinc-900 p-4 rounded-xl shadow border">
              <BudgetForm onBudgetSubmit={() => setRefreshKey((k) => k + 1)} />
            </div>

            {/* Budget vs Actual Chart */}
            <div className="bg-zinc-900 p-4 rounded-xl shadow border">
              <BudgetChart month={selectedMonth} />
            </div>
          </div>
        )}

        {activeTab === "insights" && (
          <div className="bg-zinc-900 p-4 rounded-xl shadow border">
            <div className="mb-4">
              <label className="text-sm text-gray-400 mr-2">
                Select Month:
              </label>
              <input
                type="month"
                className="bg-zinc-800 text-white rounded px-2 py-1"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
            <SpendingInsights month={selectedMonth} />
          </div>
        )}
      </div>
    </div>
  );
}
