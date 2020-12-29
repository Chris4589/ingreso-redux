import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path:'', redirectTo:'dashboard', pathMatch:'full'},
    { path: 'dashboard', 
    
        component: DashboardComponent, 
        canActivate: [ AuthGuard ],
        children:[
            { path: '', component: EstadisticaComponent },
            { path: 'ingreso-egreso', component: IngresoEgresoComponent },
            { path: 'detalle', component: DetalleComponent }
        ]   
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
