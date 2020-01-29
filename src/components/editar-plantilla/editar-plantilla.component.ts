import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Planilla } from 'src/domain/planilla';
import { mostrarError } from 'src/domain/mostrarErros';
import { StubPlanillaService } from 'src/services/planilla.service';
import { Fila } from 'src/domain/fila';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-editar-plantilla',
  templateUrl: './editar-plantilla.component.html',
  styleUrls: ['./editar-plantilla.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
  ]
})
export class EditarPlantillaComponent implements OnInit {

  opcionesFecha: {}
  fechaModel: any = {}
  planilla: Planilla
  alta: boolean = false

  constructor(private planillaService: StubPlanillaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.planilla = new Planilla()
    const paramId = this.route.snapshot.params.id
    this.alta = paramId == 'new'
    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy'
    }
    const fechaPlanilla = this.planilla.fecha
    this.fechaModel = {
      date: this.convertirANuevoDate(fechaPlanilla)
    }

    try {
      this.planilla = this.planillaService.getPlanillaById(0)
      // if (!this.alta) {  //Si no es un nuevo cliente lo buscamos con el service
      //   this.route.params.subscribe(params => {
      //     // Deberia buscar por id o por fecha ?
      //     // this.planilla = this.planillaService.getPlanillaById(params['id']) 
      //     if (!this.planilla) {
      //       this.volver()
      //       return
      //     }
      //   })
      // }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
    } catch (error) {
      mostrarError(this, error)
    }
  }

  volver() {
    this.router.navigate(['/planilla'])
  }

  getSaldoActual(fila: Fila) {
    return fila.pago - fila.subtotal
  }

  convertirANuevoDate(fecha: Date) {
    return {
      year: fecha.getFullYear(),
      month: fecha.getMonth() + 1,
      day: fecha.getDate()
    }
  }

  convertirADate(fecha: any): Date {
    if (!fecha) return null
    return new Date(fecha.date.year, fecha.date.month - 1, fecha.date.day)
  }

  get fechaPlanilla() {
    return this.convertirADate(this.fechaModel)
  }

  nuevaFila() {
    this.router.navigate(['/agregar-fila'])
  }

}
