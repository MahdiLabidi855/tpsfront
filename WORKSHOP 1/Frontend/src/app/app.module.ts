import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEquipeComponent } from './components/list-equipe/list-equipe.component';
import { AddEquipeComponent } from './components/add-equipe/add-equipe.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },      // page d'inscription
  { path: 'signin', component: SigninComponent },      // page de connexion
 { path: 'list-equipe', component: ListEquipeComponent, canActivate: [authGuard] },
{ path: 'add-equipe', component: AddEquipeComponent, canActivate: [authGuard] },

  { path: '', redirectTo: 'signup', pathMatch: 'full' }, // page par défaut : Sign Up
  { path: '**', redirectTo: 'signup' }                 // redirection pour toutes les routes inconnues
];
@NgModule({
  declarations: [
    AppComponent,
    ListEquipeComponent,
    AddEquipeComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
        FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
