import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel implements OnChanges {
  // Imagenes para el carrusel
  @Input() images: string[] = [];
  // Evento cerrar carrusel
  @Output() closed = new EventEmitter<void>();

  @Input() startIndex = 0;
  currentIndex = 0;
  // Controla si la imagen actual ya cargo
  imageLoaded = false;

  next(event?: Event): void {
    event?.stopPropagation();
    if (this.images.length) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.imageLoaded = false;
    }
  }

  prev(event?: Event): void {
    event?.stopPropagation();
    if (this.images.length) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.imageLoaded = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startIndex'] && typeof this.startIndex === 'number') {
      this.currentIndex = this.startIndex;
      this.imageLoaded = false;
    }
  }

  close(): void {
    this.closed.emit();
  }

  onBackdrop(event: Event): void {
    event.stopPropagation();
    this.close();
  }
}
