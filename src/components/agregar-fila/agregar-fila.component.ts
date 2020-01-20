import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/domain/cliente';
import { Producto } from 'src/domain/producto';
import { Planilla } from 'src/domain/planilla';
import { Fila } from 'src/domain/fila';
import { Router } from '@angular/router';
import { StubClienteService } from 'src/services/cliente.service';
import { StubProductoService } from 'src/services/producto.service';
import { mostrarError } from 'src/domain/mostrarErros';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-fila',
  templateUrl: './agregar-fila.component.html',
  styleUrls: ['./agregar-fila.component.css']
})
export class AgregarFilaComponent implements OnInit {

  @Input() planilla: Planilla
  clientes: Cliente[]
  productos: Producto[]
  nuevaFila: Fila = new Fila()

  constructor(private router: Router, private clienteService: StubClienteService, private productoService: StubProductoService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.clientes = await this.clienteService.getClientes()
      this.productos = await this.productoService.getProductos()
      // Cambiar para que reciba una planilla por service
      // this.planilla.initFilas(this.clientes, this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }

  crearCeldas() {
    this.nuevaFila.crearCeldas(this.productos)
  }

  limpiar() {
    this.nuevaFila.cliente = null
  }

  agregarFila() {
    if (!this.cantidadesSonValidas()) {
      // if (window.confirm("Crear nueva fila?")) {
      console.log(this.nuevaFila)
      this.planilla.crearNuevaFila(this.nuevaFila)
      this.nuevaFila = new Fila()
      this._snackBar.open("Fila agregada a la planilla", "OK", {
        duration: 2000,
      });
      // }
      console.log(this.planilla)
    } else {
      console.log("no creo")
      console.log(this.planilla)
    }
  }

  cantidadesSonValidas(): boolean {
    return !this.nuevaFila.celdas.every(celda => celda.cantidad >= 0)
  }

  cantidadEsValida(cantidad: number) {
    console.log(cantidad)
    return false
  }
}
