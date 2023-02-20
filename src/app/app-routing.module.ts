import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '', component: TodoComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
