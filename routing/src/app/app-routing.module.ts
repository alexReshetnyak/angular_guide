import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { ServersComponent } from './components/servers/servers.component';
import { ServerComponent } from './components/servers/server/server.component';
import { EditServerComponent } from './components/servers/edit-server/edit-server.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

import { CanDeactivateGuard } from './components/servers/edit-server/can-deactivate-guard.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { ServerResolver } from './components/servers/server/server-resolver.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ]},
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
