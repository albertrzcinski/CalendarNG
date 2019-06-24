import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CalendarComponent} from './calendar/calendar.component';
import {SaveEventComponent} from './save-event/save-event.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: CalendarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    // TODO redirect to login (check all redicection) [if user logged redirect to /home from /login] [if user not logged redirect to /login]
    redirectTo: '/home',
    pathMatch: 'full'
  },
  /*{ path: '**',
    // TODO create component for 404
    component: AppComponent
  },*/
  {
    path: 'save/:eventId',
    component: SaveEventComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false,
      onSameUrlNavigation: 'reload'}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting {}
