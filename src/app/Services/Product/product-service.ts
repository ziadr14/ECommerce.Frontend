import { Injectable } from '@angular/core';
import { IProduct } from '../../Interface/iproduct';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../Environments/environment';
import { IPagination } from '../../Interface/ipagination';
import { ProductParams } from '../../Interface/ProductParams';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${environment.baseUrl}/Products`;


  constructor(private http: HttpClient) {}

  getAll(ProductParams: ProductParams) {
    let param = new HttpParams();
    if (ProductParams.CategoryId) {
      param = param.append('categoryId', ProductParams.CategoryId);
    }
    if (ProductParams.SortSelecting) {
      param = param.append('Sort', ProductParams.SortSelecting);
    }
    if (ProductParams.search) {
      param = param.append('Search', ProductParams.search);
    }
    param = param.append('PageNumber', ProductParams.PageNumber);
    param = param.append('pageSize', ProductParams.pageSize);

    return this.http.get<IPagination>(this.baseUrl, { params: param });
  }

  getById(id: number) {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

getSimilarProductsPaged(
  productId: number,
  pageNumber: number,
  pageSize: number
) {
  return this.http.get<any>(
    `${this.baseUrl}/${productId}/similar`,
    {
      params: {
        pageNumber,
        pageSize
      }
    }
  );
}


  
}
