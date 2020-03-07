import { createAction, props } from "@ngrx/store";

export const searchType = "[Search API] request";
export const search = createAction(searchType, props<{ payload: string }>());

export const searchErrorType = "[Search API] request.error";
export const searchError = createAction(
  searchErrorType,
  props<{ error: Error }>()
);

export const searchSuccessType = "[Search API] request.success";
export const searchSuccess = createAction(
  searchSuccessType,
  props<{ response }>()
);

export const toastType = "[Twitter Page] toast";
export const toast = createAction(toastType, props<{ toast: string }>());

export const toastActionType = "[Twitter Page] toastAction";
export const toastAction = createAction(
  toastActionType,
  props<{ toastAction: string }>()
);

export const wordartType = "[Wordart API] request";
export const wordart = createAction(wordartType, props<{ payload: string }>());

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
