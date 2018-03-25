
import { Routes, RouterModule, PreloadAllModules, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import { EventEmitter } from '@angular/core';

/** components */
import { ManageSystemComponent } from './manage-system.component';
import { FormSystemComponent } from './form-system/form-system.component';
import { FormUrlsComponent } from './form-urls/form-urls.component';

export const routes: Routes = [
  { 
    path: '', 
    component: ManageSystemComponent, 
    pathMatch: 'full' 
  },
  {
    path: 'manage-system',
    component: ManageSystemComponent
  },
  {
    path: 'form-system',
    component: FormSystemComponent
  },
  {
    path: 'form-urls',
    component: FormUrlsComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
