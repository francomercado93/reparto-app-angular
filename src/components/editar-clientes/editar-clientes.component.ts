import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Celda } from 'src/domain/celda';
import { Cliente } from 'src/domain/cliente';
import { Producto } from 'src/domain/producto';
import { StubClienteService } from 'src/services/cliente.service';
import { StubProductoService } from 'src/services/producto.service';
import { Fila } from 'src/domain/fila';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

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
  clienteForm: FormGroup
  listaProdForm: FormGroup

  constructor(private clienteService: StubClienteService, private productoService: StubProductoService,
    private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    // Revisar esto que ya lo hace en el boton de la toolbar
    this.clienteService.initCliente()
  }

  async ngOnInit() {
    this.listaProdForm = this.formBuilder.group({
      prods: this.formBuilder.array([
      ])
    })
    try {
      this.productos = await this.productoService.getProductos()
      this.productos.forEach(prod => this.prods.push(this.addProdForm(prod)))
    }
    catch (error) {
      mostrarError(this, error)
    }
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
      nombre: this.formBuilder.control('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      precioBase: this.formBuilder.control('', Validators.required)
    })
  }

  getTest() {
    return false
  }

  getErrorMessagePrecioBase() {
    // return this.
  }

  // this.setValidators()

  // this.fila.cliente = new Cliente()
  // // Averiguar diferencia entre this.route.snapshot.params.id y  this.route.params.subscribe(params => {...
  // const paramId = this.route.snapshot.params.id
  // this.alta = paramId == 'new'
  // try {
  //   if (!this.alta) {  //Si no es un nuevo cliente lo buscamos con el service
  //     this.route.params.subscribe(params => {
  //       this.fila.cliente = this.clienteService.getClienteById(params['id'])
  //       this.clienteForm.setValue({
  //         id: this.fila.cliente.id,
  //         nombre: this.fila.cliente.nombre
  //       })
  //       // this.clienteForm.setValue(this.fila.cliente)
  //       if (!this.fila.cliente) {
  //         this.volver()
  //         return
  //       }
  //     })
  //   }
  //   console.log(this.fila.cliente)
  //   console.log(this.clienteForm)
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false
  //   this.productos = await this.productoService.getProductos()
  //   this.fila.crearCeldas(this.productos)
  // } catch (error) {
  //   mostrarError(this, error)
  // }
  // }

  private setValidators() {
    this.clienteForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.pattern('[a-zA-Z1-9 ]+')])
    })
  }

  get nombre() {
    return this.clienteForm.get('nombre')
  }

  getErrorMessage() {
    return this.clienteForm.get('nombre').hasError('minlength') ? 'El nombre tiene que tener 3 caracteres como minimo' :
      this.nombre.hasError('required') ? 'El nombre es obligatorio' :
        this.nombre.hasError('pattern') ? 'No se admiten numeros ni caracteres especiales' :
          '';
  }

  get celdas() {
    return this.fila.celdas
  }

  volver() {
    console.log(this.prods[1])
    // this.router.navigate(['/clientes'])
  }

  async onSubmit() {
    console.log(this.clienteForm.value)
    // console.log(this.nombre.))
    // try {
    //   this.validarNombre()
    //   this.fila.cliente.nombre = this.nuevoNombre
    //   this.fila.asignarGanancias()
    //   this.crearOActualizar();
    //   this.volver()
    // } catch (e) {
    //   this.errors.push(e)
    // }
  }

  // private crearOActualizar() {
  //   if (this.alta) {
  //     this.clienteService.nuevoCliente(this.fila.cliente);
  //   }
  //   else {
  //     this.clienteService.actualizarCliente(this.fila.cliente);
  //   }
  // }

  // private validarNombre() {
  //   this.errors = [];
  //   if (this.nuevoNombre == null || this.nuevoNombre == "")
  //     throw "Debe elegir un nombre valido";
  // }


}