import { Component, OnInit } from '@angular/core';
import { StubClienteService } from 'src/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  component: String

  constructor(private clienteService: StubClienteService, private router: Router) { }

  ngOnInit() {
  }

}
