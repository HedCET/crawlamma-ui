import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  exports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule]
})
export class MaterialComponents {}
