// import { HashLocationStrategy, LocationStrategy } from '@ansgular/common'
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth.guard";
import { TestComponent } from "./test.component";

// export const children: Routes = [ // declare inside module
//   { component: TestRouterComponent, path: ':handle' }, // this.router.navigate(['./', handle], { relativeTo: this.activatedRoute })
// ]

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    /*canActivate: [AuthGuard],*/ /*children,*/ component: TestComponent,
    path: "home"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule {}
