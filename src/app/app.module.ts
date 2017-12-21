import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {InputWithButtonComponent} from './common/input-with-button/input-with-button.component';
import {MainBackendService} from "./backend/main_backend_service/main-backend.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CustomPopoverDirective} from './common/custom-popover/custom-popover.directive';
import {BusyModule} from "angular2-busy";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomAutocompleteComponent} from './common/custom-autocomplete/custom-autocomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    InputWithButtonComponent,
    CustomPopoverDirective,
    CustomAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BusyModule,
    BrowserAnimationsModule
  ],
  providers: [MainBackendService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
