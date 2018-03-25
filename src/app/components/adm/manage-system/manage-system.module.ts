import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { ImageUploadModule } from 'angular2-image-upload';
import { NgxMaskModule } from 'ngx-mask';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

/** routing */
import { routing } from './manage-system.routing';

/** components */
import { ManageSystemComponent } from './manage-system.component';
import { FormSystemComponent } from './form-system/form-system.component';
import { FormUrlsComponent } from './form-urls/form-urls.component';


@NgModule({
  declarations: [
    ManageSystemComponent,
    FormSystemComponent,
    FormUrlsComponent
  ],
  imports: [
    MaterializeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(), 
    NgxMaskModule.forRoot(),
    ImageUploadModule.forRoot(),
    routing
  ],
  providers: [

  ]
})

export class ManageSystemModule {

 }
