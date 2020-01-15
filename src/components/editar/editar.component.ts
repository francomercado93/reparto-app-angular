import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/domain/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService, StubProductoService } from 'src/services/producto.service';
import { mostrarError } from 'src/domain/mostrarErros';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  producto: Producto

  productoForm: FormGroup

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private productoService: StubProductoService, private router: Router) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.productoForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      nombre: this.formBuilder.control('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      precioBase: this.formBuilder.control('', [Validators.required, Validators.min(0)])
    })
    try {
      this.producto = await this.productoService.getProductoId(id)
      this.productoForm.setValue(this.producto)
    } catch (error) {
      mostrarError(this, error)
    }
  }

  getErrorMessageNombre() {
    return this.nombre.hasError('required') ? 'El nombre es requerido' :
      this.nombre.hasError('pattern') ?
        'No se permiten caracteres especiales ni numeros' : ''
  }

  getErrorMessagePrecioBase() {
    return this.precioBase.hasError('required') ? 'El precio es requerido' :
      this.precioBase.hasError('min') ?
        'Debe ingresar un precio valido' : ''
  }

  get nombre() {
    return this.productoForm.get('nombre')
  }

  get precioBase() {
    return this.productoForm.get('precioBase')
  }


  onSubmit() {
    this.productoService.actualizarProducto(this.productoForm.value)
    this.volverEditarProductos()
  }

  volverEditarProductos() {
    this.router.navigate(['/editar-productos']);
  }

}
