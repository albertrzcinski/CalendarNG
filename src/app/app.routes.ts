import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AddEventComponent} from './add-event/add-event.component';
import {CalendarComponent} from './calendar/calendar.component';

const appRoutes: Routes = [
  {
    path: 'home',
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
      { enableTracing: false,
      onSameUrlNavigation: 'reload'}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting {}
