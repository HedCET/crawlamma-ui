// import { APP_BASE_HREF } from '@ansgular/common'
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { DeviceDetectorModule } from "ngx-device-detector";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { MatInputAutoFocusDirective } from "./matInputAutoFocus.drective";
import { TwitterComponent } from "./twitter.component";
import { TwitterWordartComponent } from "./twitter.wordart.component";
import { TwitterWordartService } from "./twitter.wordart.service";
import { environment } from "../environments/environment";
import { MaterialComponents } from "../material.components";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MatInputAutoFocusDirective,
    TwitterComponent,
    TwitterWordartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DeviceDetectorModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialComponents,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [TwitterWordartService]
})
export class AppModule {}
