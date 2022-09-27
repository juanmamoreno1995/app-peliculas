import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];
  estrella = 'star-outline';

  slideOptActores = {
    spaceBetween: -5,
    slidesPerView: 3.3,
    freeMode: true,
  };

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {

    this.dataLocal.existePelicula(this.id).then(existe => this.estrella = existe ? 'star' : 'star-outline');
    this.moviesService.getDetallePelicula(this.id).subscribe(res => {
      this.pelicula = res;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe(res => {
      this.actores = res.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    this.estrella = this.dataLocal.guardarPelicula(this.pelicula) ?
      'star' :
      'star-outline';
  }

}
