import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {InputWithButtonComponent} from './common/input-with-button/input-with-button.component';
import {MainBackendService} from "./backend/main_backend_service/main-backend.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CustomPopoverDirective} from './common/custom-popover/custom-popover.directive';


@NgModule({
  declarations: [
    AppComponent,
    InputWithButtonComponent,
    CustomPopoverDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MainBackendService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
