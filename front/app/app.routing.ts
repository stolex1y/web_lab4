import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {FormComponent} from './form/form.component';
import {TableComponent} from './table/table.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './guard/auth.guard';
import {NotFoundComponent} from './error/notFound.component';
import {ModelResolver} from './model/model.resolver';
/*import { TableComponent } from "./core/table.component";
import { TableComponent } from "./core/form.component";*/
const routes: Routes = [
/*  { path: "form/edit", component: TableComponent },
  { path: "form/create", component: TableComponent },*/
  {
    path: '', component: AppComponent, children: [
      {path: '', redirectTo: 'auth', pathMatch: 'full'},
      {path: 'auth', component: LoginComponent},
      // {path: '**', redirectTo: 'auth'}
    ]
  },
  {
    path: '',
    component: AppComponent,
    data: {authenticated: true},
    canActivateChild: [AuthGuard],
    resolve: {model: ModelResolver},
    children: [
      {path: 'table', component: TableComponent},
      {path: 'form', component: FormComponent},
      {path: '**', component: NotFoundComponent}
    ]
  },
];
export const routing = RouterModule.forRoot(routes);
