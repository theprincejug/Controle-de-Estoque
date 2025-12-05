import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/Product';
import { StockMovement, MovementType } from '../types/StockMovement';

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
    if (quantity <= 0) {
      throw new Error('A quantidade deve ser maior que zero');
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + quantity }
          : product
      )
    );

    const movement: StockMovement = {
      id: Date.now().toString(),
      productId,
      type: 'entry',
      quantity,
      date: new Date(),
      reason,
    };

    setMovements((prevMovements) => [...prevMovements, movement]);
  };

  const addStockExit = (productId: string, quantity: number, reason?: string) => {
    if (quantity <= 0) {
      throw new Error('A quantidade deve ser maior que zero');
    }

    setProducts((prevProducts) => {
      const product = prevProducts.find((p) => p.id === productId);
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      if (product.quantity < quantity) {
        throw new Error('Quantidade insuficiente em estoque');
      }

      return prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - quantity } : p
      );
    });

    const movement: StockMovement = {
      id: Date.now().toString(),
      productId,
      type: 'exit',
      quantity,
      date: new Date(),
      reason,
    };

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

