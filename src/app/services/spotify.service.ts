import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  /**
   * API de Spotify
   */
  API_ENDPOINT = 'https://api.spotify.com/v1';

  /**
  * @method constructor
  * Constructor
  * Inicio de los servicios de Spotify
  */
  constructor(private httpClient: HttpClient) {
    console.log('Spotify service ready');
  }

  /**
   * @method getToken
   * Método que realiza la petición para obtener el TOKEN.
   * Este TOKEN es utilizado para el acceso a los servicios de Spotify.
   */
  getToken() {
    const sbClientId = 'bfbcb2dfd21348b2829e843cdbff0be3';
    const sbClientSecret = '3c845a97f9a5496a89b1444415cce65b';

    return this.httpClient.get(`https://spotify-get-token.herokuapp.com/spotify/${sbClientId}/${sbClientSecret}`);
  }

  /**
   * @method getNewReleases
   * Método que realiza la petición para obtener los nuevos lanzamientos. 
   *
   * @param  {string}        sbToken  Token para autorización
   */
  getNewReleases(sbToken: string) {
    const headers = new HttpHeaders({
      'Authorization': `[{"key":"Authorization","value":"Bearer ${sbToken}"}]`
    });
    return this.httpClient.get(this.API_ENDPOINT + '/browse/new-releases', { headers })
      .pipe(map(response => {
        return response['albums'].items
      }));
  }

  /**
   * @method getArtist
   * Método que realiza la petición para obtener la información de un artista. 
   *
   * @param  {string}        sbArtistId  Identificador del artista
   * @param  {string}        sbToken     Token para autorización
   */
  getArtist(sbArtistId: string, sbToken: string) {
    const headers = new HttpHeaders({
      'Authorization': `[{"key":"Authorization","value":Bearer ${sbToken}"}]`
    });
    return this.httpClient.get(this.API_ENDPOINT + `/artists/${sbArtistId}`, { headers });
  }

  /**
   * @method getTracks
   * Método que realiza la petición para obtener el listado de canciones 
   * y álbumes principales de un artista. 
   *
   * @param  {string}        sbArtistId  Identificador del artista
   * @param  {string}        sbToken     Token para autorización
   */
  getTracks(sbArtistId: string, sbToken: string) {
    const headers = new HttpHeaders({
      'Authorization': `[{"key":"Authorization","value":Bearer ${sbToken}"}]`
    });
    return this.httpClient.get(this.API_ENDPOINT + `/artists/${sbArtistId}/top-tracks?country=us`, { headers })
      .pipe(map(response => {
        return response['tracks'];
      }));
  }
}
