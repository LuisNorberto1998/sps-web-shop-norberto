import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../../core/models/products.model';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchTerm: string = '';
  selectedCategory: string = '';
  sortOption: string = '';
  selectedRating: number = 0;
  categories: string[] = ['Electronics', 'Clothing', 'Home'];
  ratings: number[] = [1, 2, 3, 4, 5];
  pageSize: number = 5;
  dataSource = new MatTableDataSource<Product>([]);
  paginatedData: Product[] = [];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getPagination('').subscribe((products) => {
      this.dataSource.data = products;
      this.applyFilter();
    });
  }

  applyFilter() {
    let filteredData = this.dataSource.data;

    if (this.searchTerm) {
      filteredData = filteredData.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filteredData = filteredData.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    if (this.selectedRating) {
      filteredData = filteredData.filter(
        (product) => product.rating >= this.selectedRating
      );
    }

    switch (this.sortOption) {
      case 'price-asc':
        filteredData.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredData.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredData.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
}
