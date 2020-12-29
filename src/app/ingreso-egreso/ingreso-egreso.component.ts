import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingreso } from '../models/ingreso-egreso.model';
import { IngresoService } from '../services/ingreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingreso:boolean = true;
  ingresoForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private ingres:IngresoService
  ) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }
  guardar(){
    if(this.ingresoForm.invalid)
      return;
    const{ descripcion, monto } = this.ingresoForm.value;
    let ingreso;

    if(this.ingreso){
      ingreso = new Ingreso(descripcion, monto, 'ingreso')
    }
    else{
      ingreso = new Ingreso(descripcion, monto, 'egreso')
    }
    this.ingres.crearIngresoEgreso(ingreso).then((res)=>{
      console.log(res);
    }).catch(Err=>console.log(Err));
  }
  cambiarTipo(){
    this.ingreso = !this.ingreso;
  }
}
