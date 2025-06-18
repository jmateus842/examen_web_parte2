import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { NasaItem } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private readonly url = 'https://images-api.nasa.gov/search?q=galaxy&media_type=image';

  constructor(private http: HttpClient) {}

  getItems(): Observable<NasaItem[]> {
    return this.http.get<{ collection: { items: any[] } }>(this.url).pipe(
      map(r => r.collection.items.map(this.mapItem)),
      catchError(err => {
        // Loguear el error y devolver lista vacia para evitar romper la UI
        console.error('Error HTTP al consultar NASA API', err);
        return of([] as NasaItem[]);
      })
    );
  }

  private mapItem(raw: any): NasaItem {
    return {
      titulo: raw.data[0].title,
      descripcion: raw.data[0].description,
      fecha: raw.data[0].date_created,
      links: raw.links || []
    };
  }
}
