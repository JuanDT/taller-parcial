import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './crear-usuario/user.service';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    CrearUsuarioComponent,
    ListarUsuarioComponent,
    EditarUsuarioComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
