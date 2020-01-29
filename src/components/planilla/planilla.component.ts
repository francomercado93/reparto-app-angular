import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent {

  constructor(private router: Router) { }

  nuevaPlanilla() {
    // this.clienteService.initCliente()
    this.router.navigate(['/editar-planilla/new'])
  }

}
