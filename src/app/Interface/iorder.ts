import { ShippingAddress } from "./iaddress";

export interface CreateOrder {
  basketId: string;
  deliveryMethodId: number;
  shippingAddress: ShippingAddress;
}

export interface OrderItem {
  productId: number;
  productName: string;
  description: string | null;
  img: string;
  price: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  subTotal: number;
  total: number;
  orderDate: string;
  deliveryMethod: string;
  deliveryPrice: number;
  status: number;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
}
