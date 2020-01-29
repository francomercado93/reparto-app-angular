import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/domain/cliente';
import { Producto } from 'src/domain/producto';
import { Planilla } from 'src/domain/planilla';
import { Fila } from 'src/domain/fila';
import { Router } from '@angular/router';
import { StubClienteService } from 'src/services/cliente.service';
import { StubProductoService } from 'src/services/producto.service';
import { mostrarError } from 'src/domain/mostrarErros';
import { Celda } from 'src/domain/celda';

@Component({
  selector: 'app-agregar-fila',
  templateUrl: './agregar-fila.component.html',
  styleUrls: ['./agregar-fila.component.css']
})
export class AgregarFilaComponent implements OnInit {

  clientes: Cliente[]
  productos: Producto[]
  planilla: Planilla = new Planilla()
  nuevaFila: Fila = new Fila()

  constructor(private router: Router, private clienteService: StubClienteService, private productoService: StubProductoService) { }

  async ngOnInit() {
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.clientes = await this.clienteService.getClientes()
      this.productos = await this.productoService.getProductos()
      // Cambiar para que reciba una planilla por service
      this.planilla.initFilas(this.clientes, this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }

  crearCeldas() {
    this.nuevaFila.crearCeldas(this.productos)
  }

  limpiar() {
    this.nuevaFila = new Fila()
  }

  cantidadValida(celda: Celda) {
    return celda.cantidad < 0
  }

  get subtotalFila() {
    return this.nuevaFila.subtotal
  }

  agregar() {
  }

  // warningDeuda() {
  //   var saldo = this.nuevaFila.pago - this.nuevaFila.subtotal
  //   if (saldo < 0) {
  //     return "El cliente " + this.nuevaFila.cliente.nombre + " debe " + saldo
  //   }
  //   if (saldo >= 0)
  //     return "El saldo a favor del cliente " + this.nuevaFila.cliente.nombre + " es " + saldo
  // }

}
