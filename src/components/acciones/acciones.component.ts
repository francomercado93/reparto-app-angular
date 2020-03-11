import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Planilla } from 'src/domain/planilla';
import { StubPlanillaService } from 'src/services/planilla.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit {

  @Input() planilla: Planilla
  opcionesFecha: {}
  fechaModel: any = {}

  constructor(private router: Router, private planillaService: StubPlanillaService) { }

  ngOnInit() {
    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy'
    }
    // console.log("fecha")
    // console.log(this.planilla.fecha)
    this.fechaModel = {
      date: this.convertirANuevoDate(this.planilla.fecha)
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

  restablecer(form: NgForm) {
    // form.reset()
    form.setValue({
      gastos: this.planilla.gastos,
      recaudacion: this.planilla.recaudacion,
    })
    this.fechaModel = {
      date: this.convertirANuevoDate(this.planilla.fecha)
    }
    // form.getControl('')
  }

  guardarPlanilla(form: NgForm) {
    this.planilla.fecha = this.convertirADate(form.value['fecha'].date)
    this.planilla.gastos = form.value['gastos']
    this.planilla.recaudacion = form.value['recaudacion']
    console.log(this.planilla)
    this.planillaService.actualizarPlanilla(this.planilla)

  }

}
