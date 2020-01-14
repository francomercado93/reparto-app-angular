import { Component, OnInit } from '@angular/core';
import { ProductoService, StubProductoService } from 'src/services/producto.service';
import { Producto } from 'src/domain/producto';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

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
  listaProdsForm: FormGroup

  constructor(private productoService: StubProductoService, private router: Router, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.createListProdForm()
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.productos = await this.productoService.getProductos()
      this.productos.forEach(prod => this.addProdForm(prod))
    } catch (error) {
      mostrarError(this, error)
    }
  }

  createListProdForm() {
    this.listaProdsForm = this.formBuilder.group({
      prods: this.formBuilder.array([
      ])
    })
  }

  //No logro hacerlo funcionar en el html
  createProdForm() {
    return this.formBuilder.group({
      id: this.formBuilder.control(''),
      nombre: this.formBuilder.control('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      precioBase: this.formBuilder.control('')
    })
  }

  addProdForm(prod: Producto) {
    var prodFrom = this.createProdForm()
    prodFrom.setValue(prod)
    this.prods.push(prodFrom)
  }

  get prods() {
    return this.listaProdsForm.get('prods') as FormArray
  }


  async onSubmit() {
    // try {
    //   this.errors = []
    //   this.productoSeleccionado.precioBase = this.nuevoPrecio
    //   await this.productoService.actualizarProducto(this.productoSeleccionado)
    // } catch (error) {
    //   mostrarError(this, error)
    // }
    // this.volver()
  }
  volver() {

    console.log(this.prods.controls)

    // this.router.navigate(['planilla'])
  }


}
