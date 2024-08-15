import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';

import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { SearchBarService } from '../../../shared/services/search-bar.service';
import { ProductService } from '../../services/product.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { Router } from '@angular/router';
import { RatingComponent } from '../../../shared/components/rating/rating.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
    MatGridListModule,
    RatingComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  filterSubscription: Subscription = new Subscription();

  totalProducts = 0;
  pageSize = 5;
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
    private searchBarService: SearchBarService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.filterSubscription = this.searchBarService.filter$.subscribe(
      (filters) => {
        this.getProductsByFilterAndPagination(filters);
      }
    );
  }

  getProductsByFilterAndPagination(filters?: any) {
    this.spinnerService.showSpinner();

    this.currentPage = 0;

    const {
      searchTerm,
      selectedCategory,
      sortOption,
      sortOrder,
      selectedRating,
      priceRange,
    } = filters;

    const categorie =
      selectedCategory === '' ? '' : `category/${selectedCategory}/`;
    const order =
      sortOption === '' && sortOrder === ''
        ? ''
        : `&sortBy=${sortOption}&order=${sortOrder}`;

    this.productService
      .getPagination(
        `${categorie}?limit=0${order}&select=id,title,price,description,rating,thumbnail`
      )
      .subscribe({
        next: (result: any) => {
          this.listProduct = result;

          this.filterProducts = this.filterProductsTable(
            searchTerm,
            priceRange || { min: 0, max: Infinity },
            {
              min: selectedRating,
              max: selectedRating === 0 ? 5 : selectedRating + 1,
            },
            this.currentPage
          );
          this.spinnerService.hideSpinner();
        },
        error: (error) => {
          console.error(error);
          this.listProduct = {};
          this.spinnerService.hideSpinner();
        },
        complete: () => {
          this.spinnerService.hideSpinner();
        },
      });
  }

  filterProductsTable(
    searchTerm: string,
    priceRange: { min: number; max: number },
    ratingRange: { min: number; max: number },
    page: number
  ) {
    let filteredProducts = this.listProduct?.products;

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.rating >= ratingRange.min && product.rating <= ratingRange.max
    );

    const startIndex = page * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return {
      products: filteredProducts.slice(startIndex, endIndex),
      total: filteredProducts.length,
    };
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    this.filterSubscription = this.searchBarService.filter$.subscribe(
      (filters) => {
        const { searchTerm, selectedRating, priceRange } = filters;

        this.filterProducts = this.filterProductsTable(
          searchTerm,
          priceRange || { min: 0, max: Infinity },
          {
            min: selectedRating,
            max: selectedRating === 0 ? 5 : selectedRating + 1,
          },
          this.currentPage
        );
      }
    );
  }

  onCardClick(event: any) {
    this.router.navigate(['/product'], { queryParams: { id: event.id } });
  }
}
