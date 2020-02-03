import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatTabsModule
} from "@angular/material";

@NgModule({
  exports: [MatButtonModule, MatIconModule, MatSelectModule, MatTabsModule]
})
export class MaterialComponents {}
