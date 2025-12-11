import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ListEquipeComponent } from './components/list-equipe/list-equipe.component';
import { AddEquipeComponent } from './components/add-equipe/add-equipe.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },

  // Routes protégées
  { path: 'list-equipe', component: ListEquipeComponent, canActivate: [authGuard] },
  { path: 'add-equipe', component: AddEquipeComponent, canActivate: [authGuard] },

  // Route par défaut
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  // Page not found → redirection
  { path: '**', redirectTo: 'signup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
