// import { HashLocationStrategy, LocationStrategy } from '@ansgular/common'
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  {
    component: DashboardComponent,
    path: "dashboard"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
