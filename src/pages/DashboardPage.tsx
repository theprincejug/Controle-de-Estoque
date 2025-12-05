import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { useInventory } from '../context/InventoryContext';
import { DashboardService } from '../services/dashboardService';

export const DashboardPage: React.FC = () => {
  const { products } = useInventory();

  const totalProducts = DashboardService.getTotalProducts(products);
  const totalQuantity = DashboardService.getTotalQuantity(products);
  const totalValue = DashboardService.getTotalValue(products);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Total de Produtos</h3>
              <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Quantidade Total</h3>
              <p className="text-3xl font-bold text-green-600">{totalQuantity}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Valor Total</h3>
              <p className="text-3xl font-bold text-purple-600">
                {DashboardService.formatCurrency(totalValue)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bem-vindo ao Sistema de Controle de Estoque
            </h2>
            <p className="text-gray-600">
              Use o menu lateral para navegar entre as diferentes seções do sistema.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

