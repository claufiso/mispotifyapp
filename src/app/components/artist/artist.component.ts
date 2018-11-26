import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {

  /**
   * Objeto con la información del artista
   */
  obArtist: any = {};

  /**
   * Arreglo de canciones de un artista
   */
  arTracks: any[] = [];

  /**
   * Flag que indica si ya se cargó la información del artista
   */
  blLoadingArtist: boolean;

  /**
 * @method constructor
 * Constructor
 * Se obtiene el Id del artista de la ruta
 */
  constructor(private spotify: SpotifyService, private router: ActivatedRoute) {
    this.blLoadingArtist = true;
    this.router.params.subscribe(params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  /**
   * @method getArtist
   * Método que obtiene la información de un artista.
   *
   * @param  {string}        sbArtistId  Id del artista en spotify
   */
  getArtist(sbArtistId: string) {
    this.blLoadingArtist = true;
    this.spotify.getToken().subscribe((obToken: any) => {
      this.spotify.getArtist(sbArtistId, obToken.access_token)
        .subscribe(obArtistInfo => {
          this.obArtist = obArtistInfo;
          console.log(this.obArtist);
          this.blLoadingArtist = false;
        });
    });

  }

  /**
   * @method getTopTracks
   * Método que obtiene la información de las canciones principales de un artista.
   *
   * @param  {string}        sbArtistId  Id del artista en spotify
   */
  getTopTracks(sbArtistId: string) {
    this.blLoadingArtist = true;
    this.spotify.getToken().subscribe((obToken: any) => {
      this.spotify.getTracks(sbArtistId, obToken.access_token)
        .subscribe(arTracks => {
          this.arTracks = arTracks;
          console.log(this.arTracks);
          this.blLoadingArtist = false;
        });
    });
  }

  ngOnInit() {
  }

}
