import { Component, OnInit, Input } from '@angular/core';
import { Planilla } from 'src/domain/planilla';
import { StubPlanillaService } from 'src/services/planilla.service';
import { mostrarError } from 'src/domain/mostrarErros';

@Component({
  selector: 'app-buscar-planilla',
  templateUrl: './buscar-planilla.component.html',
  styleUrls: ['./buscar-planilla.component.css']
})
export class BuscarPlanillaComponent implements OnInit {

  planilla: Planilla
  opcionesFecha: {}
  fechaModel: any = {}
  error: String

  constructor(private planillaService: StubPlanillaService) { }

  async ngOnInit() {
    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy'
    }
    this.fechaModel = {
      date: this.convertirANuevoDate(new Date())
    }
    try {
      await this.planillaService.initPlanillas()
    } catch (e) {
      mostrarError(this, e)
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
    return new Date(fecha.date.year, fecha.date.month - 1, fecha.date.day)
  }

  async buscarPlanilla() {
    var fechaDate = this.convertirADate(this.fechaModel)
    try {
      this.planilla = await this.planillaService.getPlanillaFecha(fechaDate)
      // TODO: agregar un modal cuando no encuentre la planilla para la fecha, y preguntar si se quiere crear una planilla nueva
      if (this.planilla == null || this.planilla == undefined) {
        this.error = 'No existe la planilla para la fecha ingresada'
      }
    } catch (error) {
      mostrarError(this, error)
    }
  }

}
