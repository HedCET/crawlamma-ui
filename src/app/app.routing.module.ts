// import { HashLocationStrategy, LocationStrategy } from '@ansgular/common'
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TwitterComponent } from "./twitter.component";
import { TwitterWordartComponent } from "./twitter.wordart.component";

const twitterRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "wordart" },
  { component: TwitterWordartComponent, path: "wordart" },
];

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "twitter" },
  { children: twitterRoutes, component: TwitterComponent, path: "twitter" },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
