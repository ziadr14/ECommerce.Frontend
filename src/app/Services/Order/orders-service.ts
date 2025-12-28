import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateOrder, OrderResponse } from '../../Interface/iorder';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CustomBasket } from '../../Interface/ibasket';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = `${environment.baseUrl}/Orders`;

  constructor(private http: HttpClient) {}

  createOrder(order: CreateOrder) {
    return this.http.post<OrderResponse>(this.baseUrl, order);
  }

  getOrders() {
    return this.http.get<OrderResponse[]>(this.baseUrl);
  }

  getOrderById(id: number) {
    return this.http.get<OrderResponse>(`${this.baseUrl}/${id}`);
  }

  getMyOrders() {
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/my-orders`);
  }

    deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}`);
  }
    sendInvoice(orderId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${orderId}/send-invoice`,
      {}
    );
  }

}
