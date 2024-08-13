import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductsByFilterAndPagination();
  }

  getProductsByFilterAndPagination() {

    this.productService.getPagination('').subscribe(
      {
        next: (result: any) => {
          console.log(result);
          
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {

        },
      }
    )

  }

}
