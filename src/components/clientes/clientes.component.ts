import { Component, OnInit } from '@angular/core';
import { StubClienteService } from 'src/services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/domain/cliente';
import { Producto } from 'src/domain/producto';
import { Fila } from 'src/domain/fila';



function mostrarError(component, error) {
  console.log("error", error)
  component.errors.push(error._body)
}
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  clientes: Cliente[]

  // Para mostrar los precios es necesario crear una planilla(con filas para cada cliente)

  constructor(private clienteService: StubClienteService, private router: Router) { }

  async ngOnInit() {
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.clientes = await this.clienteService.getClientes()
    } catch (error) {
      mostrarError(this, error)
    }
  }

}
