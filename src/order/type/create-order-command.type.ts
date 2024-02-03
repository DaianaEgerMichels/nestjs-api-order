export type CreateOrderCommand = {
  clientId: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
};
