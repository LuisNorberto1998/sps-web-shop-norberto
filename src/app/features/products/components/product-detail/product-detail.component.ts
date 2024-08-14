import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { HeaderComponent } from '../../../shared/components/header/header.component';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';


import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, RatingComponent, FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product: any;
  productId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private spinnerService: SpinnerService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.queryParamMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      if (!isNaN(id)) {
        this.productId = id;
        this.productService.getOneProduct(this.productId).subscribe({
          next: (product) => {
            this.product = product;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {

          },
        });
      } else {
        console.error('Invalid product ID');
      }
    } else {
      console.error('Product ID is missing');
    }
  }

  async addToCart(event: any) {
    this.spinnerService.showSpinner(); // Mostrar el loader

    try {
      await this.cartService.addToCart(this.product);
      this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
        duration: 3000,
      });
    } catch (error) {
      this.snackBar.open('Error al agregar producto al carrito', 'Cerrar', {
        duration: 3000,
      });
      console.error('Error al agregar al carrito:', error);
    } finally {
      this.spinnerService.hideSpinner();
    }
  }

}
