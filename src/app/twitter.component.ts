import { trigger, style, animate, transition } from "@angular/animations";
// import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { debounceTime, take } from "rxjs/operators";
import { Subscription } from "rxjs";
import * as url from "url";
import { isJSON } from "validator";

import * as AppActions from "./app.actions";
import {
  routerState,
  searchApiState,
  toast,
  toastAction
} from "./app.selectors";
import { searchResponseInterface } from "./search.inerface";
import { environment } from "../environments/environment";

@Component({
  animations: [
    trigger("sideMenuAnimation", [
      transition("void => *", [
        style({ transform: "translateX(-100%)" }),
        animate(200)
      ]),
      transition("* => void", [
        animate(200, style({ transform: "translateX(-100%)" }))
      ])
    ])
  ],
  selector: "twitter-component",
  styleUrls: ["./twitter.component.css"],
  templateUrl: "./twitter.component.html"
})
export class TwitterComponent implements OnInit {
  private subscription = new Subscription();

  searchForm: FormGroup;
  searchInput: AbstractControl;
  searchResponse: searchResponseInterface = { hits: [], total: 0 };
  searching = false;
  sideMenu: boolean;
  sideMenuToggled: boolean;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    // private readonly breakpointObserver: BreakpointObserver,
    private readonly formBuilder: FormBuilder,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router,
    private readonly store: Store<any>
  ) {
    this.searchForm = this.formBuilder.group({ searchInput: [""] });
    this.searchInput = this.searchForm.controls["searchInput"];
  }

  ngOnInit() {
    this.subscription.add(
      this.store.pipe(select(routerState)).subscribe(route => {
        if (
          route.queryParams.search &&
          route.queryParams.search != this.searchInput.value
        )
          this.searchInput.setValue(route.queryParams.search);

        this.sideMenu = !!route.queryParams.sideMenu;
        if (this.sideMenu) this.sideMenuToggled = false;
        else
          setTimeout(() => {
            this.sideMenuToggled = true;
          }, 400);
      })
    );

    this.subscription.add(
      this.searchInput.valueChanges.pipe(debounceTime(400)).subscribe(value => {
        this.store.dispatch(AppActions.search({ payload: value }));
        this.updateQueryParams({ search: value });
      })
    );

    // this.subscription.add(
    this.store.pipe(select(toast)).subscribe(payload => {
      if (payload && isJSON(payload)) {
        const toast = JSON.parse(payload);

        this.snackbar.open
          .apply(this.snackbar, toast.args)
          .onAction()
          .pipe(take(1))
          .subscribe(() => {
            if (toast.action)
              this.store.dispatch(
                AppActions.toastAction({ toastAction: toast.action })
              );
          });
      }
    });
    // );

    // this.subscription.add(
    this.store.pipe(select(toastAction)).subscribe(payload => {
      if (payload && isJSON(payload)) {
        const toastAction = JSON.parse(payload);

        switch (toastAction.key) {
          case "open_in_browser":
            window.open(toastAction.value);
            break;
        }
      }
    });
    // );

    // this.breakpointObserver
    //   .observe(["(max-width: 768px)"])
    //   .pipe(take(1))
    //   .subscribe(breakpoint => {
    //     if (!breakpoint.matches)
    //       this.store.dispatch(AppActions.sideMenuToggle());
    //   });

    this.subscription.add(
      this.store.pipe(select(searchApiState)).subscribe(r => {
        this.searchResponse = r.resultSet.response;
        this.searching = r.loading;

        if (r.error)
          this.store.dispatch(
            AppActions.toast({
              toast: JSON.stringify({
                args: [r.error.message]
              })
            })
          );
      })
    );

    setTimeout(() => {
      if (!this.searchResponse.total)
        this.store.dispatch(AppActions.search({ payload: "" }));
    }, 400);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateQueryParams(queryParams: Params) {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: "merge",
      relativeTo: this.activatedRoute
    });
  }

  sideMenuToggle() {
    this.updateQueryParams({ sideMenu: undefined });
  }

  openInBrowser(twitterId) {
    window.open(url.resolve(environment.twitter_url, twitterId));
  }

  underConstruction() {
    this.store.dispatch(
      AppActions.toast({
        toast: JSON.stringify({
          args: ["under construction", "DETAILS"],
          action: JSON.stringify({
            key: "open_in_browser",
            value: "https://twitter.com/rough_record"
          })
        })
      })
    );
  }
}
