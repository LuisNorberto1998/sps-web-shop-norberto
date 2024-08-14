import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input() review: any;
}
