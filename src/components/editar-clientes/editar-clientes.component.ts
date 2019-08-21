import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Celda } from 'src/domain/celda';
import { Cliente } from 'src/domain/cliente';
import { Producto } from 'src/domain/producto';
import { StubClienteService } from 'src/services/cliente.service';
import { StubProductoService } from 'src/services/producto.service';
import { Fila } from 'src/domain/fila';

function mostrarError(component, error) {
  console.log("error", error)
  component.errors.push(error._body)
}

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClienteComponent implements OnInit {

  productos: Array<Producto> = []
  fila: Fila = new Fila()
  errors = []
  nuevoNombre: string
  alta: boolean = false

  constructor(private clienteService: StubClienteService, private productoService: StubProductoService, private router: Router, private route: ActivatedRoute) {
    // Revisar esto que ya lo hace en el boton de la toolbar
    this.clienteService.initCliente()
  }

  async ngOnInit() {
    this.fila.cliente = new Cliente()
    // Averiguar diferencia entre this.route.snapshot.params.id y  this.route.params.subscribe(params => {...
    const paramId = this.route.snapshot.params.id
    this.alta = paramId == 'new'
    try {
      if (!this.alta) {  //Si no es un nuevo cliente lo buscamos con el service
        this.route.params.subscribe(params => {
          this.fila.cliente = this.clienteService.getClienteById(params['id'])
          if (!this.fila.cliente) {
            this.volver()
            return
          }
        })
        this.nuevoNombre = this.fila.cliente.nombre
      }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
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
    this.router.navigate(['/clientes'])
  }

  async aceptar() {
    try {
      this.validarNombre()
      this.fila.cliente.nombre = this.nuevoNombre
      this.fila.asignarGanancias()
      this.crearOActualizar();
      this.volver()
    } catch (e) {
      this.errors.push(e)
    }
  }

  private crearOActualizar() {
    if (this.alta) {
      this.clienteService.nuevoCliente(this.fila.cliente);
    }
    else {
      this.clienteService.actualizarCliente(this.fila.cliente);
    }
  }

  private validarNombre() {
    this.errors = [];
    if (this.nuevoNombre == null || this.nuevoNombre == "")
      throw "Debe elegir un nombre valido";
  }
}