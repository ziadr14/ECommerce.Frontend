import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeliveryMethod } from '../../Interface/idelivaryMethod';

@Injectable({
  providedIn: 'root',
})
export class DeliveryMethodService {
  baseUrl = `${environment.baseUrl}/DeliveryMethods`

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<DeliveryMethod[]>(this.baseUrl);
  }
}
