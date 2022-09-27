import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform(peliculas: Pelicula[]) {

    return peliculas.filter(pel => {
      return pel.backdrop_path
    });
  }

}
