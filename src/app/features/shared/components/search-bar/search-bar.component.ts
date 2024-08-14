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
import { SearchBarService } from '../../services/search-bar.service';
import { CategoriesService } from '../../../products/services/categories.service';

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
  categories: string[] = [];

  ratings: { name: string; value: number | null }[] = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
  ];

  pageSize: number = 5;
  sortOrder: 'asc' | 'desc' = 'asc';
  minPrice: number = 0;
  maxPrice: number = Infinity;

  dataSource = new MatTableDataSource<Product>([]);
  paginatedData: Product[] = [];

  constructor(
    private productService: ProductService,
    private categoriesServices: CategoriesService,
    private searchBarService: SearchBarService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.getCategories();
  }

  loadProducts() {
    this.applyFilter();
  }

  applyFilter() {
    this.searchBarService.updateFilters({
      searchTerm: this.searchTerm,
      selectedCategory: this.selectedCategory,
      sortOption: this.sortOption,
      sortOrder: this.sortOrder,
      selectedRating: this.selectedRating,
      priceRange: { min: this.minPrice, max: this.maxPrice },
    });
  }

  cleanSearch() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.sortOption = '';
    this.selectedRating = 0;
    this.categories = [];

    this.getCategories();

    this.searchBarService.updateFilters({
      searchTerm: '',
      selectedCategory: '',
      sortOption: '',
      sortOrder: 'asc',
      selectedRating: 0,
      priceRange: { min: 0, max: Infinity }
    });
  }

  getCategories() {
    this.categoriesServices.getCategories('/category-list').subscribe({
      next: (value) => {
        this.categories = value;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
