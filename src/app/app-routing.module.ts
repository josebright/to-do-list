import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './lib/guard/auth.guard';
import { TodoComponent } from './pages/todos/todo.component';


const routes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'todo', component: TodoComponent, 
    canActivate: [AuthGuard] // visit todo only if authenticated
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' }, // redirect to 'login'
  { path: '**', component: PageNotFoundComponent } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
