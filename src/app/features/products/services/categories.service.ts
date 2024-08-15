import { Injectable } from '@angular/core';
import { GlobalService } from '../../../core/services/global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private globalService: GlobalService) { }

  public getCategories(filters: string): Observable<any> {
    return this.globalService.get<any>(`products${filters}`);
  }

}
