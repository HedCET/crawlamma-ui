import { createAction, props } from "@ngrx/store";

export const toastType = "[Twitter Page] toast";
export const toast = createAction(toastType, props<{ toast: string }>());

export const toastActionType = "[Twitter Page] toastAction";
export const toastAction = createAction(
  toastActionType,
  props<{ toastAction: string }>()
);

export const wordartType = "[Wordart API] request";
export const wordart = createAction(
  wordartType,
  props<{ payload: { key: string; tags?: string } }>()
);

export const wordartErrorType = "[Wordart API] request.error";
export const wordartError = createAction(
  wordartErrorType,
  props<{ error: Error }>()
);

export const wordartSuccessType = "[Wordart API] request.success";
export const wordartSuccess = createAction(
  wordartSuccessType,
  props<{ response }>()
);
