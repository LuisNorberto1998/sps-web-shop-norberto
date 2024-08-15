import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from '../../features/products/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanActivate {

  constructor(private router: Router, private productService: ProductService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const productId = route.queryParamMap.get('id');

    if (!productId || isNaN(Number(productId))) {
      this.router.navigate(['/dashboard']);
      return of(false);
    }

    return this.productService.getOneProduct(Number(productId)).pipe(
      map(product => {
        if (product) {
          return true;
        } else {
          this.router.navigate(['/dashboard']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/dashboard']);
        return of(false);
      })
    );
  }
}
