import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { useInventoryPage } from '../hooks/useInventoryPage';
import { ProductService } from '../services/productService';

export const InventoryPage: React.FC = () => {
  const {
    products,
    showForm,
    formData,
    showEntryModal,
    showExitModal,
    selectedProduct,
    movementQuantity,
    movementReason,
    error,
    setFormData,
    setMovementQuantity,
    setMovementReason,
    handleSubmitProduct,
    handleToggleForm,
    handleCancelForm,
    handleOpenEntryModal,
    handleCloseEntryModal,
    handleSubmitEntry,
    handleOpenExitModal,
    handleCloseExitModal,
    handleSubmitExit,
    handleRemoveProduct,
  } = useInventoryPage();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Estoque</h1>
            <Button onClick={handleToggleForm}>
              {showForm ? 'Cancelar' : '+ Adicionar Produto'}
            </Button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Novo Produto</h2>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Adicionar</Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancelForm}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {products.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-lg">Nenhum produto cadastrado ainda.</p>
                <p className="text-sm mt-2">Clique em "Adicionar Produto" para começar.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço Unitário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`font-semibold ${ProductService.getStockStatusClass(product)}`}>
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        R$ {product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        R$ {ProductService.calculateTotalValue(product).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            onClick={() => handleOpenEntryModal(product)}
                            className="text-xs px-3 py-1"
                          >
                            Entrada
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleOpenExitModal(product)}
                            className="text-xs px-3 py-1"
                            disabled={ProductService.isOutOfStock(product)}
                          >
                            Saída
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveProduct(product.id, product.name)}
                            className="text-xs px-3 py-1"
                          >
                            Remover
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Modal de Entrada */}
          {showEntryModal && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Entrada de Estoque
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Produto: <span className="font-semibold">{selectedProduct.name}</span>
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Estoque atual: <span className="font-semibold">{selectedProduct.quantity}</span>
                </p>
                <form onSubmit={handleSubmitEntry} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      value={movementQuantity || ''}
                      onChange={(e) => setMovementQuantity(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Motivo (opcional)
                    </label>
                    <input
                      type="text"
                      value={movementReason}
                      onChange={(e) => setMovementReason(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Compra, Devolução, etc."
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
                      {error}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Confirmar Entrada
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCloseEntryModal}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal de Saída */}
          {showExitModal && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Saída de Estoque
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Produto: <span className="font-semibold">{selectedProduct.name}</span>
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Estoque atual: <span className="font-semibold">{selectedProduct.quantity}</span>
                </p>
                <form onSubmit={handleSubmitExit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      value={movementQuantity || ''}
                      onChange={(e) => setMovementQuantity(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      max={selectedProduct.quantity}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Máximo disponível: {selectedProduct.quantity}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Motivo (opcional)
                    </label>
                    <input
                      type="text"
                      value={movementReason}
                      onChange={(e) => setMovementReason(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Venda, Perda, Ajuste, etc."
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
                      {error}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Confirmar Saída
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCloseExitModal}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

