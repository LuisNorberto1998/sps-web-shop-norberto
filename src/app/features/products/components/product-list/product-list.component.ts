import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchBarService } from '../../../shared/services/search-bar.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  filterSubscription: Subscription = new Subscription();

  totalProducts = 0; // Total de productos (necesario para la paginación)
  pageSize = 5; // Tamaño de la página
  currentPage = 0;

  private _listProduct: any;
  private _filterProdcts: any;

  get listProduct(): any {
    return this._listProduct;
  }

  get filterProducts(): any {
    return this._filterProdcts;
  }

  set listProduct(value: any) {
    this._listProduct = value;
  }

  set filterProducts(value: any) {
    this._filterProdcts = value;
  }

  constructor(
    private productService: ProductService,
    private searchBarService: SearchBarService
  ) {}

  ngOnInit(): void {
    this.filterSubscription = this.searchBarService.filter$.subscribe(
      (filters) => {
        this.getProductsByFilterAndPagination(filters);
      }
    );
  }

  getProductsByFilterAndPagination(filters?: any) {
    const {
      searchTerm,
      selectedCategory,
      sortOption,
      sortOrder,
      selectedRating,
      priceRange,
    } = filters;

    const categorie = selectedCategory === '' ? '' : `category/${selectedCategory}/`;
    const order = sortOption === '' && sortOrder === '' ? '' : `&sortBy=${sortOption}&order=${sortOrder}`;


// &select=title,price,images,description,id,rating,thumbnail
    this.productService.getPagination(`${categorie}?limit=0${order}`).subscribe({
      next: (result: any) => {
        this.listProduct = result;

        this.filterProducts = this.filterProductsTable(
          searchTerm,
          selectedCategory,
          sortOption || 'price',
          sortOrder || 'asc',
          priceRange || { min: 0, max: Infinity },
          { min: selectedRating, max: selectedRating === 0 ? 5 : (selectedRating + 1)  },
          this.currentPage
        );
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

  filterProductsTable(
    searchTerm: string,
    category: string,
    sortBy: 'price' | 'rating',
    sortOrder: 'asc' | 'desc',
    priceRange: { min: number; max: number },
    ratingRange: { min: number; max: number },
    page: number
  ) {
    let filteredProducts = this.listProduct?.products;

    // Filtrar por categoría
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rango de precios
    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Filtrar por rango de calificación
    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.rating >= ratingRange.min && product.rating <= ratingRange.max
    );

    // Ordenar los productos
    // filteredProducts.sort((a: any, b: any) => {
    //   const valueA = a[sortBy];
    //   const valueB = b[sortBy];

    //   return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    // });

    // Paginación
    const startIndex = page * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return {
      products: filteredProducts.slice(startIndex, endIndex),
      total: filteredProducts.length, // Total de productos filtrados
    };
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    this.filterSubscription = this.searchBarService.filter$.subscribe(
      (filters) => {
        const {
          searchTerm,
          selectedCategory,
          sortOption,
          sortOrder,
          selectedRating,
          priceRange,
        } = filters;

        this.filterProducts = this.filterProductsTable(
          searchTerm,
          selectedCategory,
          sortOption || 'price',
          sortOrder || 'asc',
          priceRange || { min: 0, max: Infinity },
          { min: selectedRating, max: selectedRating === 0 ? 5 : (selectedRating + 1)  },
          this.currentPage
        );
      }
    );
  }
}
