import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../Interface/icategory';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private baseUrl = `${environment.baseUrl}/Categories`


  constructor(private http: HttpClient) {}

getAll() {
  return this.http.get<{ data: ICategory[] }>(this.baseUrl);
}

}
