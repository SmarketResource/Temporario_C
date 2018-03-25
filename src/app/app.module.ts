import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { ImageUploadModule } from "angular2-image-upload";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxMaskModule } from 'ngx-mask';
import { NguiInfiniteListModule } from '@ngui/infinite-list';

/** components */
import { AppComponent } from './app.component';

/** guards */
import { AuthGuard } from './guards/auth-guard';

/** routing */
import { routing } from './app.routing';

/** services */
import { HttpUtilService } from './services/http-util.service';
import { AuthenticationService } from './services/authentication.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ImageUploadModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxGaugeModule,
    InfiniteScrollModule,
    NgxMaskModule.forRoot(),
    routing
  ],
  providers: [
    HttpUtilService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

