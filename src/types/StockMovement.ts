export type MovementType = 'entry' | 'exit';

export interface StockMovement {
  id: string;
  productId: string;
  type: MovementType;
  quantity: number;
  date: Date;
  reason?: string;
}

