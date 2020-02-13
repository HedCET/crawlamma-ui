// import { APP_BASE_HREF } from '@ansgular/common'
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { reducer } from "./app.reducers";
import { AppRoutingModule } from "./app.routing.module";
import { HttpService } from "./http.service";
import { MatInputAutoFocusDirective } from "./matInputAutoFocus.drective";
import { TwitterComponent } from "./twitter.component";
import { TwitterWordartComponent } from "./twitter.wordart.component";
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
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialComponents,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    StoreModule.forRoot({ app: reducer })
  ],
  providers: [HttpService]
})
export class AppModule {}
