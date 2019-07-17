import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Celda } from 'src/domain/celda';
import { Cliente } from 'src/domain/cliente';
import { Producto } from 'src/domain/producto';
import { ClienteService } from 'src/services/cliente.service';
import { ProductoService } from 'src/services/producto.service';

function mostrarError(component, error) {
  console.log("error", error)
  component.errors.push(error._body)
}

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  clientes: Array<Cliente> = []
  productos: Array<Producto> = []
  celda: Celda
  nuevoNombre: string = ""
  nuevoPrecioFinal: number
  errors = []

  constructor(private clienteService: ClienteService, private productoService: ProductoService, private router: Router) { }

  async ngOnInit() {
    // Truco para que refresque la pantalla 
    this.celda = new Celda()
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.clientes = await this.clienteService.getClientes()
      this.productos = await this.productoService.getProductos()
    } catch (error) {
      mostrarError(this, error)
    }
  }

  volver() {
    // this.router.navigate(['planilla'])
    console.log(this.clientes)
  }

  async actualizarCliente() {
    try {
      this.celda.cambiarNombreCliente(this.nuevoNombre)
      await this.clienteService.actualizarCliente(this.celda.cliente)
      this.volver()
    } catch (error) {
      mostrarError(this, error)
    }
  }

  precioFinal(): number {
    return this.celda.precioFinal
  }
}
