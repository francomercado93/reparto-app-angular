import { Component, OnInit } from '@angular/core';
import { StubClienteService } from 'src/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private clienteService: StubClienteService, private router: Router) { }

  ngOnInit() {
  }

  nuevoCliente() {
    this.clienteService.initCliente()
    this.router.navigate(['/editar-cliente/new'])
  }

}
