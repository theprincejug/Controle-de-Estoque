import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/Product';
import { StockMovement } from '../types/StockMovement';
import { InventoryService } from '../services/inventoryService';

interface InventoryContextType {
  products: Product[];
  movements: StockMovement[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  addStockEntry: (productId: string, quantity: number, reason?: string) => void;
  addStockExit: (productId: string, quantity: number, reason?: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
    // Remove também os movimentos relacionados ao produto
    setMovements((prevMovements) =>
      prevMovements.filter((m) => m.productId !== productId)
    );
  };

  const addStockEntry = (productId: string, quantity: number, reason?: string) => {
    // Validação usando serviço
    const validation = InventoryService.validateStockEntry(quantity);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Atualiza produtos usando serviço
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? InventoryService.updateProductAfterEntry(product, quantity)
          : product
      )
    );

    // Cria movimento usando serviço
    const movement = InventoryService.createStockMovement(productId, 'entry', quantity, reason);
    setMovements((prevMovements) => [...prevMovements, movement]);
  };

  const addStockExit = (productId: string, quantity: number, reason?: string) => {
    setProducts((prevProducts) => {
      // Busca o produto no estado anterior
      const product = prevProducts.find((p) => p.id === productId);
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      // Validação usando serviço
      const validation = InventoryService.validateStockExit(product, quantity);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Atualiza produtos usando serviço
      return prevProducts.map((p) =>
        p.id === productId ? InventoryService.updateProductAfterExit(p, quantity) : p
      );
    });

    // Cria movimento usando serviço
    const movement = InventoryService.createStockMovement(productId, 'exit', quantity, reason);
    setMovements((prevMovements) => [...prevMovements, movement]);
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        movements,
        addProduct,
        removeProduct,
        addStockEntry,
        addStockExit,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

