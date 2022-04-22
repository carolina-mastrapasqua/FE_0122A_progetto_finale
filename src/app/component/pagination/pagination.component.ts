import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalLength: number = 0;
  @Input() itemsForPage: number = 0;
  @Input() currentPageIndex: number = 1;

  @Output() currentPageEvent = new EventEmitter<number>();

  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor() {}

  previousPage() {
    if (this.currentPageIndex < this.totalPages && this.currentPageIndex >= 1) {
      this.currentPageIndex--;
      this.currentPageEvent.emit(this.currentPageIndex);
    }
  }

  nextPage() {
    if (
      this.currentPageIndex < this.totalPages - 1 &&
      this.currentPageIndex >= 0
    ) {
      this.currentPageIndex++;
      this.currentPageEvent.emit(this.currentPageIndex);
    }
  }

  goToPage(indexPage: number) {
    this.currentPageIndex = indexPage;
    this.currentPageEvent.emit(this.currentPageIndex);
  }

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.totalLength / this.itemsForPage);
    this.pagesArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pagesArray.push(i);
    }
  }
}
