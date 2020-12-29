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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading:boolean = false;
  reduxLoading:Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store:Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
    });

    this.reduxLoading = this.store.select('ui').subscribe((sto)=>{
      console.log(sto.isLoading);
      this.loading = sto.isLoading;
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.reduxLoading.unsubscribe();
  }
  login() {

    if ( this.loginForm.invalid ) { return; }

    this.store.dispatch(Loading());

    /*Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });*/

    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password )
      .then( credenciales => {
        console.log(credenciales);
        //Swal.close();
        this.store.dispatch(stopLoading());
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
