import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false

  }

}
