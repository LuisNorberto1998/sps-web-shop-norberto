import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  constructor() {}

  private filterSubject = new BehaviorSubject<any>({
    searchTerm: '',
    selectedCategory: '',
    sortOption: '',
    sortOrder: 'asc',
    selectedRating: 0,
    priceRange: { min: 0, max: Infinity }
  });

  filter$ = this.filterSubject.asObservable();

  updateFilters(filters: any) {
    this.filterSubject.next(filters);
  }
}
