import { Component, OnInit, OnDestroy, HostBinding, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { PlaceholderDirective } from 'src/app/shared/directives/placeholder/placeholder.directive';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

import * as fromApp     from '../../store/app.reducers';
import * as fromCore    from '../store/core.reducers';
import * as CoreActions from '../store/core.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // @HostBinding('style.display') private display = 'none';
  public showSpinner = false;

  @ViewChild(PlaceholderDirective, { static: false }) private alertHost: PlaceholderDirective;
  private loadingSub: Subscription;
  private popupSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.loadingSub = this.store.select('core').subscribe((coreState: fromCore.State) => {
      // this.display = coreState.loading ? 'flex' : 'none';
      this.showSpinner !== coreState.loading && (this.showSpinner = coreState.loading);
      coreState.err && coreState.err.message && this.showErrorAlert(coreState.err.message)
    });
  }

  ngOnDestroy() {
    this.loadingSub && this.loadingSub.unsubscribe();
    this.popupSub && this.popupSub.unsubscribe();
  }

  private showErrorAlert(message: string): void {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.popupSub = componentRef.instance.close.subscribe(() => {
      this.store.dispatch(new CoreActions.SetError(null));
      this.popupSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
