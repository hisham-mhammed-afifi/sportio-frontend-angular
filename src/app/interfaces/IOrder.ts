export interface IOrder {
  _id: string;
  userId: string;
  tax: number;
  shippingFee: number;
  subTotal: number;
  total: number;
  status: string;
  cartItems: [];
}
