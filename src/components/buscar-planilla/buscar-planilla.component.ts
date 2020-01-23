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
  
  @Input() planilla: Planilla
  opcionesFecha: {}
  fechaModel: any = {}

  constructor(private planillaService: StubPlanillaService) { }

  ngOnInit() {
    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy'
    }
    this.fechaModel = {
      date: this.convertirANuevoDate(new Date())
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
    console.log(this.fechaModel)
    var fechaDate = this.convertirADate(this.fechaModel)
    console.log(fechaDate)
    try {
      this.planilla = await this.planillaService.getPlanillaFecha(fechaDate)
      console.log(this.planilla)
    } catch (error) {
      mostrarError(this, error)
    }
  }

}
