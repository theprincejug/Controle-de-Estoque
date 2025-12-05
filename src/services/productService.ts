import { Product } from '../types/Product';

export class ProductService {
  /**
   * Cria um novo produto com ID gerado
   */
  static createProduct(data: Omit<Product, 'id'>): Product {
    return {
      ...data,
      id: Date.now().toString(),
    };
  }

  /**
   * Valida os dados de um produto antes de criar
   */
  static validateProduct(data: Omit<Product, 'id'>): { valid: boolean; error?: string } {
    if (!data.name || data.name.trim().length === 0) {
      return { valid: false, error: 'O nome do produto é obrigatório' };
    }

    if (data.quantity < 0) {
      return { valid: false, error: 'A quantidade não pode ser negativa' };
    }

    if (data.price < 0) {
      return { valid: false, error: 'O preço não pode ser negativo' };
    }

    return { valid: true };
  }

  /**
   * Calcula o valor total de um produto (quantidade * preço)
   */
  static calculateTotalValue(product: Product): number {
    return product.quantity * product.price;
  }

  /**
   * Verifica se o produto está com estoque baixo
   */
  static isLowStock(product: Product, threshold: number = 10): boolean {
    return product.quantity > 0 && product.quantity < threshold;
  }

  /**
   * Verifica se o produto está sem estoque
   */
  static isOutOfStock(product: Product): boolean {
    return product.quantity === 0;
  }

  /**
   * Obtém a classe CSS baseada no status do estoque
   */
  static getStockStatusClass(product: Product): string {
    if (this.isOutOfStock(product)) {
      return 'text-red-600';
    }
    if (this.isLowStock(product)) {
      return 'text-yellow-600';
    }
    return 'text-green-600';
  }
}

