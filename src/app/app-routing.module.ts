import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from 'src/components/clientes/clientes.component';
import { EditarClienteComponent } from 'src/components/editar-clientes/editar-clientes.component';
import { EditarProductosComponent } from 'src/components/editar-productos/editar-productos.component';
import { PlanillaComponent } from 'src/components/planilla/planilla.component';

export const routes: Routes = [
  { path: '', redirectTo: "planilla", pathMatch: 'full' },
  { path: 'editar-productos', component: EditarProductosComponent },
  { path: 'planilla', component: PlanillaComponent },
  { path: 'editar-cliente/:id', component: EditarClienteComponent },
  { path: 'clientes', component: ClientesComponent },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [EditarProductosComponent, PlanillaComponent, EditarClienteComponent, ClientesComponent]
