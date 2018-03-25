import { Routes, RouterModule, PreloadAllModules, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/** components */
import { LoginComponent } from './components/login/login.component';
import { AdmComponent } from './components/adm/adm.component';

/** guards */
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'adm',
    pathMatch: 'full'
  },
  {
    path: 'adm',
    loadChildren: 'app/components/adm/adm.module#AdmModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: 'app/components/login/login.module#LoginModule'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  // useHash: true
});


