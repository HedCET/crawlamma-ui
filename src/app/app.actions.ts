import { createAction, props } from "@ngrx/store";

export const sideMenuToggleActionType = "[Twitter Page] sideMenuToggle";
export const sideMenuToggle = createAction(sideMenuToggleActionType);

export const toastType = "[Twitter Page] toast";
export const toast = createAction(toastType, props<{ toast: string }>());

export const toastActionType = "[Twitter Page] toastAction";
export const toastAction = createAction(
  toastActionType,
  props<{ toastAction: string }>()
);
