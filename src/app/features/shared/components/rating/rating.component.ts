import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements OnChanges {
  @Input() rating: number = 0;
  fullStars: number = 0;
  halfStar: boolean = false;
  emptyStars: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating']) {
      this.updateStars();
    }
  }

  private updateStars() {
    if ( [null, undefined, isNaN, '', 0].includes(this.rating)) {
      this.rating = 0;
    } else {
      this.rating = Math.max(0, Math.min(this.rating, 5));
      this.fullStars = Math.floor(this.rating);
      this.halfStar = this.rating % 1 >= 0.5;
      this.emptyStars = 5 - this.fullStars - (this.halfStar ? 1 : 0);
    }
  }
}
