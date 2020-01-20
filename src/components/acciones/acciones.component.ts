import { Component, OnInit, Input } from '@angular/core';
import { Planilla } from 'src/domain/planilla';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit {

  @Input() planilla: Planilla

  constructor(private router: Router) { }

  ngOnInit() {
  }

  restablecer(form: NgForm) {
    form.reset()
  }

}
