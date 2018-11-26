import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtistComponent } from './components/artist/artist.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'lanzamientos', component: HomeComponent },
    { path: 'artista/:id', component: ArtistComponent }
];