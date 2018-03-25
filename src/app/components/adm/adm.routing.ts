
import { Routes, RouterModule, PreloadAllModules, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/** components */
import { AdmComponent } from './adm.component';
import { DashboardAdmComponent } from './dashboard-adm/dashboard-adm.component';
import { ManageStatusComponent } from './manage-status/manage-status.component';
import { ManageSystemComponent } from './manage-system/manage-system.component';
import { MotoristaComponent } from './motorista/motorista.component';
import { TransladoComponent } from './translado/translado.component';
import { EstudanteComponent } from './estudante/estudante.component';

export const routes: Routes = [
  {
    path: '',
    component: AdmComponent,
    children: [
      {
        path: '',
        component: DashboardAdmComponent
      },
      {
        path: 'dashboard-adm',
        component: DashboardAdmComponent
      },
      {
        path: 'motorista',
        component: MotoristaComponent
      },
      {
        path: 'estudante',
        component: EstudanteComponent
      },
      {
        path: 'translado',
        component: TransladoComponent
      },
      {
        path: 'manage-system',
        loadChildren: 'app/components/adm/manage-system/manage-system.module#ManageSystemModule'
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
