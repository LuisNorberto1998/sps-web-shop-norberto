import { Component, OnInit} from '@angular/core';

import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ProductListComponent } from '../../../products/components/product-list/product-list.component';

import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    SearchBarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
