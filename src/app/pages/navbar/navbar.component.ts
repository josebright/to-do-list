import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/app.states';
import { LogOut } from 'src/app/store/actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>

  constructor(
    private store: Store<State>,
  ) {
    this.isAuthenticated$ = store.select('isAuthenticated')
  }


  logOut(): void {
    this.store.dispatch(LogOut())
  }
}
