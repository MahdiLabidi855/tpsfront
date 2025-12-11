import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html',
  styleUrls: ['./add-equipe.component.css']
})
export class AddEquipeComponent {

equipe = { nom: '', country: '' };  // ajouter le champ country

  constructor(private equipeService: EquipeService, private router: Router) { }

  ajouterEquipe() {
    this.equipeService.addEquipe(this.equipe).subscribe(() => {
      this.router.navigate(['/list-equipe']);
    });
  }
}
