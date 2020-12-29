import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app-reducer.module';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSub:Subscription;

  private _user:Usuario;
  constructor( public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store:Store<AppState>) { }

  get getUser(){
    return this._user;
  }

  initAuthListener() {

    this.auth.authState.subscribe( fuser => {
      console.log( fuser );

      if(fuser){
        this.userSub = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe((fbUser:any)=>{
          this._user = fbUser;
          const user = Usuario.fromFB(fbUser);
          this.store.dispatch(setUser({user}));
        })
      }
      else{
        this._user = null;
        this.store.dispatch(unSetUser());
        if(this.userSub) this.userSub.unsubscribe();
      }
    })

  }



  crearUsuario( nombre:string, email: string, password: string ) {

    // console.log({ nombre, email, password });
    return this.auth.createUserWithEmailAndPassword( email, password )
            .then( ({ user }) => {

              const newUser = new Usuario( user.uid, nombre, user.email );

              return this.firestore.doc(`${ user.uid }/usuario`).set({ ...newUser });

            });

  }

  loginUsuario( email:string, password:string) {
    return this.auth.signInWithEmailAndPassword( email, password );
  }

  logout() {
    this.store.dispatch(unSetUser());
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }

}
