import { Component, OnInit, Input } from '@angular/core';
import { Planilla } from 'src/domain/planilla';
import { StubPlanillaService } from 'src/services/planilla.service';
import { mostrarError } from 'src/domain/mostrarErros';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Router } from '@angular/router';

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

  constructor(private planillaService: StubPlanillaService, public dialog: MatDialog, private router: Router) { }

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
      if (this.planilla == null || this.planilla == undefined) {
        this.openDialog(fechaDate)
        // this.error = 'No existe la planilla para la fecha ingresada'
      }
      else {
        this.router.navigate(['planilla/', this.planilla.id])
      }
    } catch (error) {
      mostrarError(this, error)
    }
  }

  openDialog(fechaDate: Date): void {
    const dialogRef = this.dialog.open(SearchModalComponent, {
      width: '250px',
      data: { fecha: fechaDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
