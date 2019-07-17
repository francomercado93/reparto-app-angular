import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/services/producto.service';
import { Producto } from 'src/domain/producto';
import { Router, ActivatedRoute } from '@angular/router';

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
  nuevoPrecio: number = 0
  errors = []

  constructor(private productoService: ProductoService, private router: Router) { }

  async ngOnInit() {
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.productos = await this.productoService.getProductos()
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
