import { Component, OnInit } from '@angular/core';
import { StubClienteService } from 'src/services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/domain/cliente';
import { Producto } from 'src/domain/producto';
import { Fila } from 'src/domain/fila';
import { Planilla } from 'src/domain/planilla';
import { StubProductoService } from 'src/services/producto.service';
import { mostrarError } from 'src/domain/mostrarErros';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  clientes: Cliente[]
  planilla: Planilla = new Planilla(1)
  productos: Producto[]

  constructor(private clienteService: StubClienteService, private productoService: StubProductoService, private router: Router) { }

  async ngOnInit() {
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.clientes = await this.clienteService.getClientes()
      this.productos = await this.productoService.getProductos()
      this.planilla.initFilas(this.clientes, this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }

}
