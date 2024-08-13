import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private _listProduct: any;

  get listProduct(): any {
    return this._listProduct;
  }

  set listProduct(value: any) {
    this._listProduct = value;
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductsByFilterAndPagination();
  }

  getProductsByFilterAndPagination() {
    this.productService.getPagination('?limit=10&skip=10&select=title,price,images,description').subscribe({
      next: (result: any) => {
        console.log(result);
        this.listProduct = result;
      },
      error: (error) => {
        console.error(error);
        this.listProduct = {};
      },
      complete: () => {},
    });
  }

  addToCart(product: any): void {
    console.log('Producto añadido al carrito:', product);
  }
}
