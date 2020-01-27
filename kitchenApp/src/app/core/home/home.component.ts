import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromCore from '../store/core.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @HostBinding('style.display') private display = 'none';
  private subs: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.subs = this.store.select('core').subscribe((coreState: fromCore.State) => {
      this.display = coreState.loading ? 'flex' : 'none';
    });
  }


  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }

}
