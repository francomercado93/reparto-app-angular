import { Component, OnInit } from '@angular/core';
import { ProductoService, StubProductoService } from 'src/services/producto.service';
import { Producto } from 'src/domain/producto';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

function mostrarError(component, error) {
  console.log("error", error)
  component.errors.push(error._body)
}

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {

  productos: Array<Producto> = []
  productoSeleccionado: Producto
  nuevoPrecio: number
  errors = []


  constructor(private productoService: StubProductoService, private router: Router) { }

  displayedColumns: string[] = ['id', 'nombre', 'precioBase']

  async ngOnInit() {
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.productos = await this.productoService.getProductos()
      console.log(this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }

  async actualizar() {
    try {
      this.errors = []
      this.productoSeleccionado.precioBase = this.nuevoPrecio
      await this.productoService.actualizarProducto(this.productoSeleccionado)
    } catch (error) {
      mostrarError(this, error)
    }
    this.volver()
  }
  volver() {
    this.router.navigate(['planilla'])
  }
}