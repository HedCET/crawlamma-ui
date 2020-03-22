// import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { isJSON } from "validator";

import * as AppActions from "./app.actions";
import { toast, toastAction } from "./app.selectors";

@Component({
  selector: "twitter-component",
  styleUrls: ["./twitter.component.css"],
  templateUrl: "./twitter.component.html"
})
export class TwitterComponent implements OnInit {
  private subscription = new Subscription();

  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly store: Store<any>
  ) {}

  ngOnInit() {
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
