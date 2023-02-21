import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/guard/auth.guard';


const routes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'todo', component: TodoComponent, 
    canActivate: [AuthGuard], // visit todo only if authenticated
  },
  { path: '', pathMatch: 'full', redirectTo: 'todo' }, // redirect to 'todo'
  { path: '**', component: PageNotFoundComponent } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
