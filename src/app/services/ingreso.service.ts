import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ingreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(
    private firestore:AngularFirestore,
    private authState:AuthService
  ) { }
    //borrar id
  crearIngresoEgreso(ingresoEgreso: Ingreso){
    return this.firestore.doc(`${this.authState.getUser.uid}/ingresos-egresos`).collection('items')
        .add({...ingresoEgreso})
  }
}
