import { trigger, style, animate, transition } from "@angular/animations";
// import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { debounceTime, map, switchAll, take, tap } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import * as url from "url";
import { isJSON } from "validator";

import * as AppActions from "./app.actions";
import { AppState } from "./app.state";
import { HttpService } from "./http.service";
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
  sideMenu: Observable<boolean>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    // private readonly breakpointObserver: BreakpointObserver,
    private readonly formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router,
    private readonly store: Store<{ app: AppState }>
  ) {
    this.searchForm = this.formBuilder.group({ searchInput: [""] });
    this.searchInput = this.searchForm.controls["searchInput"];
  }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.queryParams
        .pipe(
          tap(() => {
            this.searching = true;
          }),
          map(queryParams => {
            if (queryParams.key) this.searchInput.setValue(queryParams.key);
            return this.httpService.search(queryParams.key);
          }),
          switchAll(),
          tap(() => {
            this.searching = false;
          })
        )
        .subscribe(
          (searchResponse: searchResponseInterface) =>
            (this.searchResponse = searchResponse)
        )
    );

    this.subscription.add(
      this.searchInput.valueChanges
        .pipe(debounceTime(400))
        .subscribe(value => this.updateQueryParams({ key: value }))
    );

    this.subscription.add(
      this.store
        .select(state => state.app.toast)
        .subscribe(payload => {
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
        })
    );

    this.subscription.add(
      this.store
        .select(state => state.app.toastAction)
        .subscribe(payload => {
          if (payload && isJSON(payload)) {
            const toastAction = JSON.parse(payload);

            switch (toastAction.action) {
              case "open_in_browser":
                window.open(toastAction.actionData);
                break;
            }
          }
        })
    );

    // this.breakpointObserver
    //   .observe(["(max-width: 768px)"])
    //   .pipe(take(1))
    //   .subscribe(breakpoint => {
    //     if (!breakpoint.matches)
    //       this.store.dispatch(AppActions.sideMenuToggle());
    //   });

    this.sideMenu = this.store.select(state => state.app.sideMenu);
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
    this.store.dispatch(AppActions.sideMenuToggle());
  }

  openInBrowser(twitterId) {
    window.open(url.resolve(environment.twitter_url, twitterId));
  }

  underConstruction() {
    this.store.dispatch(
      AppActions.toast({
        toast: JSON.stringify({
          args: [
            "under construction",
            "DETAILS",
            {
              duration: 3000,
              panelClass: ["mat-body"]
            }
          ],
          action: JSON.stringify({
            action: "open_in_browser",
            actionData: "https://twitter.com/kandamkori"
          })
        })
      })
    );
  }
}
