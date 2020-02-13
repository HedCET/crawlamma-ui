import { createAction, props } from "@ngrx/store";

export const sideMenuToggleActionType = "[Twitter Page] sideMenuToggle";

export const sideMenuToggle = createAction(
  sideMenuToggleActionType
  // props<{ sideMenu: boolean }>()
);
