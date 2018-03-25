import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** routing */
import { routing } from './login.routing';

/** components */
import { LoginComponent } from './login.component';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [

  ]
})

export class LoginModule {

 }
