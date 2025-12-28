export interface CustomBasket {
  id: string;
  items: IBasketItem[];

  paymentIntentId?: string;
  clientSecret?: string;

  deliveryMethodId?: number;
  shippingPrice?: number;

  total: number;
}

export interface IBasketItem {
  productId: number;
  productName: string;
  description: string;
  img: string;
  price: number;
  quantity: number;
}
