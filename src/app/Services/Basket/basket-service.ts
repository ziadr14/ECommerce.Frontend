import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomBasket } from '../../Interface/ibasket';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  private baseUrl = `${environment.baseUrl}/basket`;
  private paymentUrl = `${environment.baseUrl}/payments`;

  private basketSource = new BehaviorSubject<CustomBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) {}


  getBasketId(): string {
    let basketId = localStorage.getItem('basket_id');

    if (!basketId) {
      basketId = crypto.randomUUID();
      localStorage.setItem('basket_id', basketId);
    }

    return basketId;
  }


  getBasket(id: string): Observable<CustomBasket> {
    return this.http
      .get<CustomBasket>(`${this.baseUrl}/${id}`)
      .pipe(
        map(basket => {
          this.basketSource.next(basket);
          return basket;
        })
      );
  }

  updateBasket(basket: CustomBasket): Observable<CustomBasket> {
    return this.http
      .post<CustomBasket>(this.baseUrl, basket)
      .pipe(
        map(updatedBasket => {
          this.basketSource.next(updatedBasket);
          return updatedBasket;
        })
      );
  }

  deleteBasket(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      map(() => {
        this.basketSource.next(null);
      })
    );
  }


  createPaymentIntent(
    basketId: string,
    deliveryMethodId?: number
  ): Observable<CustomBasket> {

    let url = `${this.paymentUrl}/${basketId}`;

    if (deliveryMethodId) {
      url += `?deliveryMethodId=${deliveryMethodId}`;
    }

    return this.http
      .post<CustomBasket>(url, {})
      .pipe(
        map(basket => {
          this.basketSource.next(basket);
          return basket;
        })
      );
  }


  createStripeCheckout(
    basketId: string,
    deliveryMethodId: number
  ): Observable<string> {

    return this.http.post(
      `${this.paymentUrl}/checkout?basketId=${basketId}&deliveryMethodId=${deliveryMethodId}`,
      {},
      { responseType: 'text' } 
    );
  }


  getCurrentBasket(): CustomBasket | null {
    return this.basketSource.value;
  }
}
