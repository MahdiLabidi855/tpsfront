import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
private apiUrl = 'http://localhost:82/equipes';


  constructor(private http: HttpClient) { }

  // Obtenir toutes les équipes
  getEquipes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Ajouter une équipe
  addEquipe(equipe: any): Observable<any> {
    return this.http.post(this.apiUrl, equipe);
  }
  // Modifier une équipe
updateEquipe(id: number, equipe: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, equipe);
}

// Supprimer une équipe
deleteEquipe(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
