import { Component, ElementRef, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import * as moment from "moment";
import { Subscription } from "rxjs";
import * as url from "url";

import * as AppActions from "./app.actions";
import { wordartApiState } from "./app.selectors";
import { AppState } from "./app.state.interface";
import { HttpService } from "./http.service";
import { wordartResponseInterface } from "./wordart.interface";
import { environment } from "../environments/environment";
import { reloadScriptTag } from "../functions";

@Component({
  selector: "wordart-component",
  styleUrls: ["./twitter.wordart.component.css"],
  templateUrl: "./twitter.wordart.component.html"
})
export class TwitterWordartComponent implements OnInit {
  private subscription = new Subscription();

  loading = true;
  selectForm: FormGroup;
  selected: AbstractControl;
  wordartResponse: wordartResponseInterface = {};

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef,
    private readonly formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private readonly router: Router,
    private readonly store: Store<{ app: AppState }>
  ) {
    this.selectForm = this.formBuilder.group({ selected: ["favourites"] });
    this.selected = this.selectForm.controls["selected"];
  }

  sideMenuToggle() {
    this.store.dispatch(AppActions.sideMenuToggle());
  }

  ngOnInit() {
    this.store.dispatch(AppActions.wordart({ payload: "" }));

    this.subscription.add(
      this.store.pipe(select(wordartApiState)).subscribe(r => {
        this.wordartResponse = r.resultSet.response;
        this.loading = r.loading;

        if (r.error) {
          this.store.dispatch(
            AppActions.toast({
              toast: JSON.stringify({
                args: [r.error.message]
              })
            })
          );
        } else {
          reloadScriptTag(environment.wordart_min_js);
          this.addEventListener();
        }
      })
    );

    this.subscription.add(
      this.selected.valueChanges.subscribe(selectedValue => {
        this.updateSelectedParam(selectedValue);
        reloadScriptTag(environment.wordart_min_js);
        this.addEventListener();
      })
    );

    this.subscription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (
          params.selected &&
          -1 <
            [
              "favourites",
              "followers",
              "friends",
              "lists",
              "tweeted_at"
            ].indexOf(params.selected)
        ) {
          if (params.selected != this.selected.value)
            this.selected.setValue(params.selected);
        }
      })
    );

    window["DISPLAY_CLOUD_REDEFINE_URL_PATTERN"] = "https://twitter.com/";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateSelectedParam(selectedValue: string = "favourites") {
    this.router.navigate(["../", selectedValue], {
      relativeTo: this.activatedRoute
    });
  }

  getSrc(selectedValue: string = "favourites") {
    return url.resolve(
      environment.server_base_url,
      `wordart?key=${selectedValue}`
    );
  }

  getTimeString(ms?: number) {
    return moment(ms).format("YYYY-MM-DD hh:mm:ss A");
  }

  addEventListener() {
    const handle = setInterval(() => {
      const document = this.elementRef.nativeElement;
      const elementRef = document.querySelector("a.wordart-anchor");

      if (elementRef) {
        elementRef.addEventListener("click", this.clickEvent.bind(this));
        clearInterval(handle);

        document
          .querySelector("div.tagul-word-cloud")
          .setAttribute(
            "style",
            `height: ${
              document.querySelector("div.tagul-word-cloud")["offsetHeight"]
            }px; width: ${
              document.querySelector("div.tagul-word-cloud")["offsetWidth"]
            }px;`
          );
      }
    }, 1000);
  }

  clickEvent(event: Event) {
    event.preventDefault();

    const document = this.elementRef.nativeElement;
    const elementRef = document.querySelector("a.wordart-anchor");

    if (elementRef && elementRef.href)
      this.store.dispatch(
        AppActions.toast({
          toast: JSON.stringify({
            args: [elementRef.href, "OPEN"],
            action: JSON.stringify({
              key: "open_in_browser",
              value: elementRef.href
            })
          })
        })
      );
  }
}
