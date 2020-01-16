import { Component, OnInit } from '@angular/core';
import { ProductoService, StubProductoService } from 'src/services/producto.service';
import { Producto } from 'src/domain/producto';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';

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
  nuevoPrecio: number
  errors = []
  listaProdForm: FormGroup

  constructor(private productoService: StubProductoService, private router: Router, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.listaProdForm = this.formBuilder.group({
      prods: this.formBuilder.array([
      ])
    })
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.productos = await this.productoService.getProductos()
      this.productos.forEach(prod => this.prods.push(this.addProdForm(prod)))
      console.log(this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }

  async onSubmit() {
    try {
      this.errors = []
      await this.productoService.actualizarListaProductos(this.prods.value)
    } catch (error) {
      mostrarError(this, error)
    }
    this.volver()
  }

  volver() {
    this.router.navigate(['planilla'])
  }

  addProdForm(prod: Producto) {
    var form = this.createProdForm()
    form.setValue(prod)
    return form
  }

  get prods() {
    return this.listaProdForm.get('prods') as FormArray
  }

  createProdForm() {
    return this.formBuilder.group({
      id: this.formBuilder.control(''),
      nombre: this.formBuilder.control('', [Validators.required, Validators.pattern('[a-zA-Z1-9 ]+')]),
      precioBase: this.formBuilder.control('', [Validators.required, Validators.min(0)])
    })
  }
  getErrorMessagePrecioBase(prod: FormGroup) {
    return prod.get('precioBase').hasError('required') ? 'El precio es requerido' :
      prod.get('precioBase').hasError('min') ? 'El precio debe ser mayor a cero' : ''
  }

  getErrorMessageNombre(prod: FormGroup) {
    return prod.get('nombre').hasError('required') ? 'El nombre es requerido' :
      prod.get('nombre').hasError('pattern') ? 'No se admiten caracteres especiales' : ''
  }

}