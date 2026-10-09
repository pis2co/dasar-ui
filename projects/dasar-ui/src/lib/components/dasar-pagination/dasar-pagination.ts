import {
  Component,
  Input,
  Output,
  EventEmitter,
  booleanAttribute,
  computed,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarButtonComponent } from '../dasar-button/dasar-button'; // Adjust path as needed

export type DasarPaginationRadiusType = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DasarPaginationAppearanceType = 'solid' | 'subtle' | 'outline';
export type DasarPaginationSizeType = 'sm' | 'md' | 'lg';

@Component({
  imports: [CommonModule, DasarButtonComponent],
  templateUrl: './dasar-pagination.html',
  styleUrls: ['./dasar-pagination.scss'],
  selector: 'dasar-pagination',
  standalone: true,
})
export class DasarPagination {
  @Input({ transform: booleanAttribute }) showFirstLast: boolean = true;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() appearance: DasarPaginationAppearanceType = 'solid';
  @Input() radius: DasarPaginationRadiusType = 'md';
  @Input() size: DasarPaginationSizeType = 'md';
  @Input() siblingCount: number = 1;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): (number | string)[] {
    const totalPages = this.totalPages;
    const siblingCount = this.siblingCount;
    const currentPage = this.currentPage;
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return this.range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = this.range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = this.range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = this.range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  }

  private range(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  }

  goToPage(page: number | string) {
    if (
      typeof page === 'string' ||
      page === this.currentPage ||
      page < 1 ||
      page > this.totalPages ||
      this.disabled
    ) {
      return;
    }
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}

export const DasarPaginationComponent = [DasarPagination] as const;
