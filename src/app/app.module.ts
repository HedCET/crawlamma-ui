import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { EffectsModule } from "@ngrx/effects";
import {
  routerReducer as RouterReducer,
  StoreRouterConnectingModule,
} from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import { routerStoreFeatureName as RouterStoreFeatureName } from "./app.constants";
import {
  featureName as AppFeatureName,
  reducer as AppReducer,
} from "./app.reducers";
import { AppRoutingModule } from "./app.routing.module";
import { HttpService } from "./http.service";
import { ObjectKeys } from "./objectKeys.pipe";
import { Serializer } from "./router.state.serializer";
import { TwitterComponent } from "./twitter.component";
import { TwitterWordartComponent } from "./twitter.wordart.component";
import { WordartApiEffects } from "./wordart.effects";
import {
  featureName as WordartApiFeatureName,
  reducer as WordartApiReducer,
} from "./wordart.reducers";
import { environment } from "../environments/environment";
import { MaterialComponents } from "../material.components";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ObjectKeys,
    TwitterComponent,
    TwitterWordartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponents,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([WordartApiEffects]),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreModule.forFeature(AppFeatureName, AppReducer),
    StoreModule.forFeature(WordartApiFeatureName, WordartApiReducer),
    StoreModule.forFeature(RouterStoreFeatureName, RouterReducer),
    StoreRouterConnectingModule.forRoot({ serializer: Serializer }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 10,
    }),
  ],
  providers: [
    HttpService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: "left",
        panelClass: ["mat-body"],
      },
    },
  ],
})
export class AppModule {}
