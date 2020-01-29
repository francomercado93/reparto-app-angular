import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarProductosComponent } from 'src/components/editar-productos/editar-productos.component';
import { PlanillaComponent } from 'src/components/planilla/planilla.component';
import { EditarClienteComponent } from 'src/components/editar-clientes/editar-clientes.component';
import { ClientesComponent } from 'src/components/clientes/clientes.component';
import { AgregarFilaComponent } from 'src/components/agregar-fila/agregar-fila.component';
import { EditarPlantillaComponent } from 'src/components/editar-plantilla/editar-plantilla.component';

export const routes: Routes = [
  { path: '', redirectTo: "planilla", pathMatch: 'full' },
  { path: 'editar-productos', component: EditarProductosComponent },
  { path: 'planilla', component: PlanillaComponent },
  { path: 'editar-cliente/:id', component: EditarClienteComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'agregar-fila', component: AgregarFilaComponent },
  { path: 'editar-planilla/:id', component: EditarPlantillaComponent }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [EditarProductosComponent, PlanillaComponent, EditarClienteComponent, ClientesComponent, AgregarFilaComponent, EditarPlantillaComponent]
