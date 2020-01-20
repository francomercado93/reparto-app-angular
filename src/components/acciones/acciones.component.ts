import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Planilla } from 'src/domain/planilla';
import { Router } from '@angular/router';
import { mostrarError } from 'src/domain/mostrarErros';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit {

  @Input() planilla: Planilla
  opcionesFecha: {}
  fechaPlanilla: any = {}
  planillaForm: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  async ngOnInit() {

    this.fechaPlanilla = {
      date: this.convertirANuevoDate(new Date())
    }
    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy'
    }
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
    } catch (error) {
      mostrarError(this, error)
    }
  }

  convertirANuevoDate(fecha: Date) {
    return {
      year: fecha.getFullYear(),
      month: fecha.getMonth() + 1,
      day: fecha.getDate()
    }
  }

  convertirADate(fecha: any): Date {
    if (!fecha) {
      return null
    }
    return new Date(fecha.year, fecha.month - 1, fecha.day)
  }

  onSubmit() {
    console.log("test")
  }

  volver() {
    console.log("test")
  }

}
