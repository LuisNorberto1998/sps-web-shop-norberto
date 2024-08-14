import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, RatingComponent, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product: any;
  productId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
}
