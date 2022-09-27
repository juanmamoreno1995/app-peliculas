import { Component } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favPorGenero: any[] = [];

  constructor(private datalocaService: DataLocalService, private moviesService: MoviesService) { }



  async ionViewWillEnter() {
    this.peliculas = await this.datalocaService.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
    this.peliculasPorGenero();
  }

  peliculasPorGenero() {
    this.favPorGenero = [];
    this.generos.forEach(gen => {
      this.favPorGenero.push({
        genero: gen.name,
        peliculas: this.peliculas.filter(pel => {
          return pel.genres.find(gene => gene.id === gen.id);
        })
      });
    })

    console.log(this.favPorGenero)
  }

}
