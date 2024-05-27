import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path:"register",
    component: RegisterComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "livro/:id",
    component: ViewBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cadastrar-livro",
    component: CreateBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editar-livro/:id",
    component: EditBookComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
