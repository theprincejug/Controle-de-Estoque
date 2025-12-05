import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/Product';

interface InventoryContextType {
  products: Product[];
  addProduct: (product: Product) => void;
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

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <InventoryContext.Provider value={{ products, addProduct }}>
      {children}
    </InventoryContext.Provider>
  );
};

