import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarProductosComponent } from 'src/components/editar-productos/editar-productos.component';
import { PlanillaComponent } from 'src/components/planilla/planilla.component';
import { EditarClientesComponent } from 'src/components/editar-clientes/editar-clientes.component';
import { CrearClienteComponent } from 'src/components/crear-cliente/crear-cliente.component';

export const routes: Routes = [
  { path: '', redirectTo: "planilla", pathMatch: 'full' },
  { path: 'editar-productos', component: EditarProductosComponent },
  { path: 'planilla', component: PlanillaComponent },
  { path: 'editar-clientes', component: EditarClientesComponent },
  { path: 'crear-cliente', component: CrearClienteComponent }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [EditarProductosComponent, PlanillaComponent, EditarClientesComponent, CrearClienteComponent]
