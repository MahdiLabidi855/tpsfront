import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-list-equipe',
  templateUrl: './list-equipe.component.html',
  styleUrls: ['./list-equipe.component.css']
})
export class ListEquipeComponent implements OnInit {

  equipes: any[] = [];

  constructor(private equipeService: EquipeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEquipes();
  }

  loadEquipes() {
    this.equipeService.getEquipes().subscribe(data => this.equipes = data);
  }

  supprimer(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette équipe ?')) {
      this.equipeService.deleteEquipe(id).subscribe(() => {
        this.loadEquipes();
      });
    }
  }

  modifier(equipe: any) {
    const nouveauNom = prompt('Nouveau nom:', equipe.nom);
    const nouveauCountry = prompt('Nouveau pays:', equipe.country);
    if (nouveauNom && nouveauCountry) {
      this.equipeService.updateEquipe(equipe.id, { nom: nouveauNom, country: nouveauCountry })
        .subscribe(() => this.loadEquipes());
    }
  }
}