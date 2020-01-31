// import { APP_BASE_HREF } from '@ansgular/common'
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { TestComponent } from "./test.component";
import { TestService } from "./test.service";
import { MaterialComponents } from "../material.components";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, TestComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialComponents,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    TestService
    // { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class AppModule {}
