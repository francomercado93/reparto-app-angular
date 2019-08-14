import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/domain/cliente';
import { Fila } from 'src/domain/fila';
import { Producto } from 'src/domain/producto';
import { ClienteService } from 'src/services/cliente.service';
import { ProductoService } from 'src/services/producto.service';
import { Celda } from 'src/domain/celda';

function mostrarError(component, error) {
  console.log("error", error)
  component.errors.push(error._body)
}

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  productos: Array<Producto> = []
  fila: Fila = new Fila()
  errors = []
  nuevoPrecio: number

  constructor(private clienteService: ClienteService, private productoService: ProductoService, private router: Router) { }


  async ngOnInit() {
    this.fila.cliente = new Cliente()
    try {
      this.productos = await this.productoService.getProductos()
      this.fila.crearCeldas(this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }
  get celdas() {
    return this.fila.celdas
  }

  volver() {
    this.router.navigate(['planilla'])
    // console.log(this.fila.celdas[0].precioFinal)
    // this.fila.celdas.forEach(celda => console.log(celda.precioFinal))
    // console.log(this.fila.cliente.ganancias)
  }

  async aceptar() {
    try {
      this.clienteService.nuevoCliente(this.fila.cliente)
    } catch (error) {
      mostrarError(this, error)
    }
    this.volver()
  }

  cambiarPrecio(celda: Celda) {
    try {
      celda.setPrecioFinal(celda.precioFinal, this.fila.cliente)
    } catch (error) {
      mostrarError(this, error)
    }
  }

}
