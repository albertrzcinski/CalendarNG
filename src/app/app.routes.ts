import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AddEventComponent} from './add-event/add-event.component';
import {CalendarComponent} from './calendar/calendar.component';

const appRoutes: Routes = [
  {
    path: 'home',
    // TODO create main(home) component (split components from calendar)
    component: CalendarComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  /*{ path: '**',
    // TODO create component for 404
    component: AppComponent
  },*/
  {
    path: 'add/:eventId',
    component: AddEventComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting {}
