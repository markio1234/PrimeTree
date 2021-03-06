import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateUser } from './can-activate-user.model';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { ListingOverviewViewportComponent } from '../model/listings/listing/preview/listing-overview-viewport.component';

const routes: Routes = [
  {
    path: 'home',
    component: ListingOverviewViewportComponent,
    canActivate: [ CanActivateUser ]
  }, {
    path: 'user/login',
    component: AuthenticationComponent
  },
  {
    path: '',
    component: ListingOverviewViewportComponent,
    canActivate: [ CanActivateUser ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateUser ]
})
export class RoutingModule {

}
