import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage, private toastController: ToastController) {
    this.initDB();
    this.cargarFavoritos();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
    });

    await toast.present();
  }


  async initDB() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPelicula(pelicula: PeliculaDetalle) {

    const existe: boolean = !!this.peliculas.find(pel => pel.id === pelicula.id);
    let mensaje: string = '';

    if (existe) {
      this.peliculas = this.peliculas.filter(pel => pel.id !== pelicula.id);
      mensaje = 'Borrado de favoritos'
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos'
    }

    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;

  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(pel => pel.id === id);
    return existe ? true : false;
  }
}
