import { useState } from 'react';
import { Product } from '../types/Product';
import { useInventory } from '../context/InventoryContext';
import { ProductService } from '../services/productService';
import { InventoryService } from '../services/inventoryService';

export const useInventoryPage = () => {
  const { products, addProduct, removeProduct, addStockEntry, addStockExit } = useInventory();

  // Estado do formulário de produto
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    quantity: 0,
    price: 0,
  });

  // Estado dos modais de movimento
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [movementQuantity, setMovementQuantity] = useState(0);
  const [movementReason, setMovementReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handlers do formulário de produto
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = ProductService.validateProduct(formData);
    
    if (!validation.valid) {
      setError(validation.error || 'Dados inválidos');
      return;
    }

    const newProduct = ProductService.createProduct(formData);
    addProduct(newProduct);
    setFormData({ name: '', quantity: 0, price: 0 });
    setShowForm(false);
    setError(null);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setError(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormData({ name: '', quantity: 0, price: 0 });
    setError(null);
  };

  // Handlers dos modais de entrada
  const handleOpenEntryModal = (product: Product) => {
    setSelectedProduct(product);
    setMovementQuantity(0);
    setMovementReason('');
    setError(null);
    setShowEntryModal(true);
  };

  const handleCloseEntryModal = () => {
    setShowEntryModal(false);
    setSelectedProduct(null);
    setMovementQuantity(0);
    setMovementReason('');
    setError(null);
  };

  const handleSubmitEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const validation = InventoryService.validateStockEntry(movementQuantity);
    if (!validation.valid) {
      setError(validation.error || 'Erro ao validar entrada');
      return;
    }

    try {
      addStockEntry(selectedProduct.id, movementQuantity, movementReason || undefined);
      handleCloseEntryModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar entrada');
    }
  };

  // Handlers dos modais de saída
  const handleOpenExitModal = (product: Product) => {
    setSelectedProduct(product);
    setMovementQuantity(0);
    setMovementReason('');
    setError(null);
    setShowExitModal(true);
  };

  const handleCloseExitModal = () => {
    setShowExitModal(false);
    setSelectedProduct(null);
    setMovementQuantity(0);
    setMovementReason('');
    setError(null);
  };

  const handleSubmitExit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const validation = InventoryService.validateStockExit(selectedProduct, movementQuantity);
    if (!validation.valid) {
      setError(validation.error || 'Erro ao validar saída');
      return;
    }

    try {
      addStockExit(selectedProduct.id, movementQuantity, movementReason || undefined);
      handleCloseExitModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar saída');
    }
  };

  // Handler de remoção de produto
  const handleRemoveProduct = (productId: string, productName: string) => {
    if (window.confirm(`Tem certeza que deseja remover o produto "${productName}"?`)) {
      removeProduct(productId);
    }
  };

  return {
    // Dados
    products,
    showForm,
    formData,
    showEntryModal,
    showExitModal,
    selectedProduct,
    movementQuantity,
    movementReason,
    error,
    
    // Setters
    setFormData,
    setMovementQuantity,
    setMovementReason,
    
    // Handlers
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
  };
};

