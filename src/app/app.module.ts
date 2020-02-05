// import { APP_BASE_HREF } from '@ansgular/common'
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { TwitterDashboardComponent } from "./twitter.dashboard.component";
import { TwitterDashboardService } from "./twitter.dashboard.service";
import { TwitterComponent } from "./twitter.component";
import { WordartComponent } from "./wordart.component";
import { environment } from "../environments/environment";
import { MaterialComponents } from "../material.components";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    TwitterComponent,
    TwitterDashboardComponent,
    WordartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialComponents,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [TwitterDashboardService]
})
export class AppModule {}
