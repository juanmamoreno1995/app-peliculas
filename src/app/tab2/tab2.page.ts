import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string;
  ideas: string[] = ['Spiderman', 'Harry potter', 'Avatar', 'La vida es bella', 'El señor de los anillos']
  peliculas: Pelicula[] = [];
  buscando = false;

  constructor(private moviesServie: MoviesService, private modalCtrl: ModalController) { }

  buscar(e) {
    const valor: string = e.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;
    this.moviesServie.searchPeliculas(valor).subscribe(res => {
      console.log(res)
      this.peliculas = res['results'];
      this.buscando = false;
    })
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }



}
