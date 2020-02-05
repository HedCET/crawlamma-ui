// import { HashLocationStrategy, LocationStrategy } from '@ansgular/common'
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TwitterDashboardComponent } from "./twitter.dashboard.component";
import { TwitterComponent } from "./twitter.component";
import { WordartComponent } from "./wordart.component";

const twitterRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  { component: TwitterDashboardComponent, path: "dashboard" }
];

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "twitter" },
  { children: twitterRoutes, component: TwitterComponent, path: "twitter" },
  { component: WordartComponent, path: "wordart" }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
