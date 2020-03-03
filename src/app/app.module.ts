// import { APP_BASE_HREF } from '@ansgular/common'
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import {
  featureName as AppFeatureName,
  reducer as AppReducer
} from "./app.reducers";
import { AppRoutingModule } from "./app.routing.module";
import { HttpService } from "./http.service";
// import { MetaReducerModule } from "./meta.reducer.module";
import { ObjectKeys } from "./objectKeys.pipe";
import { MatInputAutoFocusDirective } from "./matInputAutoFocus.drective";
import { SearchApiEffects } from "./search.effects";
import {
  featureName as SearchApiFeatureName,
  reducer as SearchApiReducer
} from "./search.reducers";
import { TwitterComponent } from "./twitter.component";
import { TwitterWordartComponent } from "./twitter.wordart.component";
import { environment } from "../environments/environment";
import { MaterialComponents } from "../material.components";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MatInputAutoFocusDirective,
    ObjectKeys,
    TwitterComponent,
    TwitterWordartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([SearchApiEffects]),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialComponents,
    // MetaReducerModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    StoreModule.forRoot({}),
    StoreModule.forFeature(AppFeatureName, AppReducer),
    StoreModule.forFeature(SearchApiFeatureName, SearchApiReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 10
    })
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000, panelClass: ["mat-body"] }
    },
    HttpService
  ]
})
export class AppModule {}
