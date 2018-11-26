import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Arreglo de los nuevos lanzamientos en Spotify
   */
  arNewReleases: any[] = [];

  /**
   * Flag que indica si ya se cargó la información de los lanzamientos
   */
  blLoading: boolean;

  /**
  * @method constructor
  * Constructor
  * Obtiene la información inicial: Nuevos lanzamientos "Releases" en Spotify
  */
  constructor(private spotify: SpotifyService, private router: Router) {
    this.blLoading = true;
    this.spotify.getToken().subscribe((obToken: any) => {
      this.spotify.getNewReleases(obToken.access_token).subscribe((response: any) => {
        this.arNewReleases = response;
        this.blLoading = false;
      });
    });

  }

  /**
   * @method showArtist
   * Método que muestra la información de un artista.
   *
   * @param  {Object}        obArtist  Información del artista
   */
  showArtist(obArtist: any) {
    this.router.navigate(['/artista', obArtist.id]);
  }

  ngOnInit() {
  }

}