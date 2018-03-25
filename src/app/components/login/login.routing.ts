
import { Routes, RouterModule, PreloadAllModules, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/** components */
import { LoginComponent } from './login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
