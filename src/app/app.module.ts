import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';
import { AgregarFilaComponent } from 'src/components/agregar-fila/agregar-fila.component';
import { ToolbarComponent } from 'src/components/toolbar/toolbar.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProveedoresComponent } from 'src/components/proveedores/proveedores.component';
import { AccionesComponent } from 'src/components/acciones/acciones.component';
import { TablaPlanillaComponent } from 'src/components/tabla-planilla/tabla-planilla.component';
import { BuscarPlanillaComponent } from 'src/components/buscar-planilla/buscar-planilla.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AgregarFilaComponent,
    ProveedoresComponent,
    AccionesComponent,
    TablaPlanillaComponent,
    BuscarPlanillaComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatGridListModule,
    MatSnackBarModule,
    MyDatePickerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
