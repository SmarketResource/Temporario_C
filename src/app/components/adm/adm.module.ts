import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { ImageUploadModule } from 'angular2-image-upload';
import { NgxMaskModule } from 'ngx-mask';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

/** routing */
import { routing } from './adm.routing';

/** components */
import { AdmComponent } from './adm.component';
import { HeaderAdmComponent } from './header-adm/header-adm.component';
import { ManageStatusComponent } from './manage-status/manage-status.component';
import { DashboardAdmComponent } from './dashboard-adm/dashboard-adm.component';
import { ManageSystemComponent } from './manage-system/manage-system.component';
import { MotoristaComponent } from './motorista/motorista.component';
import { TransladoComponent } from './translado/translado.component';
import { CalendarioDiarioComponent } from './translado/calendario-diario/calendario-diario.component';
import { CalendarioSemanalComponent } from './translado/calendario-semanal/calendario-semanal.component';
import { CalendarioMensalComponent } from './translado/calendario-mensal/calendario-mensal.component';
import { EstudanteComponent } from './estudante/estudante.component';


@NgModule({
  declarations: [
    AdmComponent,
    MotoristaComponent,
    TransladoComponent,
    DashboardAdmComponent,
    HeaderAdmComponent,
    ManageStatusComponent,
    CalendarioDiarioComponent,
    CalendarioSemanalComponent,
    CalendarioMensalComponent,
    EstudanteComponent
  ],
  imports: [
    MaterializeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxMaskModule.forRoot(),
    routing
  ],
  providers: [

  ]
})

export class AdmModule {

}
