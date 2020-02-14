export interface AppState {
  sideMenu: boolean;
  toast?: string;
  toastAction?: string;
}

export const initialState: AppState = { sideMenu: false };
