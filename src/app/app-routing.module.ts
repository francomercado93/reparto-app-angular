import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPlanillaComponent } from 'src/components/buscar-planilla/buscar-planilla.component';
import { ClientesComponent } from 'src/components/clientes/clientes.component';
import { EditarClienteComponent } from 'src/components/editar-clientes/editar-clientes.component';
import { EditarProductosComponent } from 'src/components/editar-productos/editar-productos.component';
import { PlanillaComponent } from 'src/components/planilla/planilla.component';

export const routes: Routes = [
  { path: '', redirectTo: "buscar-planilla", pathMatch: 'full' },
  { path: 'editar-productos', component: EditarProductosComponent },
  { path: 'buscar-planilla', component: BuscarPlanillaComponent },
  { path: 'editar-cliente/:id', component: EditarClienteComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'planilla/:id', component: PlanillaComponent }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [EditarProductosComponent, BuscarPlanillaComponent, EditarClienteComponent, ClientesComponent, PlanillaComponent]
