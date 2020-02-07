import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StubPlanillaService } from 'src/services/planilla.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent {

  constructor(public dialogRef: MatDialogRef<SearchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private planillaService: StubPlanillaService, private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  crearPlanilla() {
    let nuevaPlanilla = this.planillaService.crearPlanilla(this.data.fecha)
    this.router.navigate(['planilla/', nuevaPlanilla.id])
  }
}
