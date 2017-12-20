import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {InputWithButtonComponent} from './common/input_with_button/input-with-button/input-with-button.component';
import {MainBackendService} from "./backend/main_backend_service/main-backend.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    InputWithButtonComponent
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
