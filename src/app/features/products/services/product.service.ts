import { Injectable } from '@angular/core';
import { GlobalService } from '../../../core/services/global.service';
import { Observable } from 'rxjs';
import { Products } from '../../../core/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private globalService: GlobalService) {}

  public getAllProducts(): Observable<any> {
    return this.globalService.get<any>(`products`);
  }

  public getOneProduct(params: number): Observable<any> {
    return this.globalService.get<any>(`products/${params}`);
  }

  public createProduct(params: Products): Observable<Products> {
    return this.globalService.post<any, Products>(params, `products/`);
  }
  
  public getPagination(params: any): Observable<any> {
    return this.globalService.get<any>(`products/${params}`);
  }

}
