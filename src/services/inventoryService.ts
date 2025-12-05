import { Product } from '../types/Product';
import { StockMovement } from '../types/StockMovement';

export class InventoryService {
  /**
   * Valida uma entrada de estoque
   */
  static validateStockEntry(quantity: number): { valid: boolean; error?: string } {
    if (quantity <= 0) {
      return { valid: false, error: 'A quantidade deve ser maior que zero' };
    }
    return { valid: true };
  }

  /**
   * Valida uma saída de estoque
   */
  static validateStockExit(product: Product, quantity: number): { valid: boolean; error?: string } {
    if (quantity <= 0) {
      return { valid: false, error: 'A quantidade deve ser maior que zero' };
    }

    if (product.quantity < quantity) {
      return { valid: false, error: 'Quantidade insuficiente em estoque' };
    }

    return { valid: true };
  }

  /**
   * Cria um movimento de estoque
   */
  static createStockMovement(
    productId: string,
    type: 'entry' | 'exit',
    quantity: number,
    reason?: string
  ): StockMovement {
    return {
      id: Date.now().toString(),
      productId,
      type,
      quantity,
      date: new Date(),
      reason,
    };
  }

  /**
   * Calcula a nova quantidade após uma entrada
   */
  static calculateNewQuantityAfterEntry(currentQuantity: number, entryQuantity: number): number {
    return currentQuantity + entryQuantity;
  }

  /**
   * Calcula a nova quantidade após uma saída
   */
  static calculateNewQuantityAfterExit(currentQuantity: number, exitQuantity: number): number {
    return currentQuantity - exitQuantity;
  }

  /**
   * Atualiza a quantidade de um produto após entrada
   */
  static updateProductAfterEntry(product: Product, quantity: number): Product {
    return {
      ...product,
      quantity: this.calculateNewQuantityAfterEntry(product.quantity, quantity),
    };
  }

  /**
   * Atualiza a quantidade de um produto após saída
   */
  static updateProductAfterExit(product: Product, quantity: number): Product {
    return {
      ...product,
      quantity: this.calculateNewQuantityAfterExit(product.quantity, quantity),
    };
  }
}

