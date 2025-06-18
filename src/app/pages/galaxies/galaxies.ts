import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NasaService } from '../../services/nasa';
import { Observable } from 'rxjs';
import { Carousel } from '../../components/carousel/carousel';
import { NasaItem } from '../../models/image.model';

@Component({
  selector: 'app-galaxies',
  standalone: true,
  imports: [CommonModule, Carousel],
  templateUrl: './galaxies.html',
  styleUrl: './galaxies.css'
})
export class Galaxies {
  items$: Observable<NasaItem[]>;
  items: NasaItem[] = [];
  // Control de visibilidad del carrusel
  showCarousel = false;
  // Lista de imagenes a mostrar
  currentImages: string[] = [];
  currentIndex = 0;

  constructor(private nasaSvc: NasaService) {
    // Guardar items para navegaion en carrusel
    this.items$ = this.nasaSvc.getItems();
    this.items$.subscribe(list => (this.items = list));
  }

  abrirCarrusel(index: number): void {
    if (!this.items.length) return;
    this.currentImages = this.items
      .map(it => it.links && it.links.length ? it.links[0].href : undefined)
      .filter((href): href is string => !!href);
    this.currentIndex = index;
    this.showCarousel = true;
  }


  cerrarCarrusel(): void {
    this.showCarousel = false;
    this.currentImages = [];
  }
}
