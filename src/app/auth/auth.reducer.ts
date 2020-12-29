import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: Usuario; 
}

export const initialState: State = {
   user: null,
}
const _counterReducer = createReducer(initialState,

    on(setUser, (state, {user}) => ({ user: user })),
    on(unSetUser, (state)=> ({user: null}))
);

export function counterReducer(state, action) {
    return _counterReducer(state, action);
}