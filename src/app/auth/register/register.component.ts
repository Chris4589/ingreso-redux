import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app-reducer.module';
import { AuthService } from 'src/app/services/auth.service';
import { Loading, stopLoading } from 'src/app/shared/us.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  reduxLoading:Subscription;
  cargando:boolean = false;
  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store:Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      correo:   ['', [Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
    });

    this.reduxLoading = this.store.select('ui').subscribe(({ isLoading })=>{
      this.cargando = isLoading;
      console.log(isLoading);
    });
  }
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.reduxLoading.unsubscribe();
}
  
  crearUsuario() {

    if ( this.registroForm.invalid ) { return; }
    this.store.dispatch(Loading());
    /*Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });*/


    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        console.log(credenciales);
        this.store.dispatch(stopLoading());
        //Swal.close();

        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }
}
