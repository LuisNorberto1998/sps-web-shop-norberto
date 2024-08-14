import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  @Input() rating: number = 0; // Calificación del producto
  fullStars: number = 0;
  halfStar: boolean = false;
  emptyStars: number = 0;

  ngOnInit() {
    // Calcula el número de estrellas llenas, medias y vacías
    this.fullStars = Math.floor(this.rating);
    this.halfStar = this.rating % 1 >= 0.5; // Verifica si hay media estrella
    this.emptyStars = 5 - Math.ceil(this.rating);
  }
}
