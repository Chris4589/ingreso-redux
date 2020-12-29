import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

export interface AppState {
   ui: ui.State;
   auth: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.counterReducer,
   auth: auth.counterReducer
   //otro module
}

//storemodule.forFeacture('module' reducer); en el modulo pages, carga perezosa 
// para usar select
// import interface algo extends AppState
//store<algo>