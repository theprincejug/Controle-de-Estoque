import { Product } from '../types/Product';

export class DashboardService {
  /**
   * Calcula o total de produtos
   */
  static getTotalProducts(products: Product[]): number {
    return products.length;
  }

  /**
   * Calcula a quantidade total em estoque
   */
  static getTotalQuantity(products: Product[]): number {
    return products.reduce((sum, product) => sum + product.quantity, 0);
  }

  /**
   * Calcula o valor total do estoque
   */
  static getTotalValue(products: Product[]): number {
    return products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
  }

  /**
   * Formata o valor monetário
   */
  static formatCurrency(value: number): string {
    return `R$ ${value.toFixed(2)}`;
  }
}

