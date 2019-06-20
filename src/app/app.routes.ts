import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CalendarComponent} from './calendar/calendar.component';
import {SaveEventComponent} from './save-event/save-event.component';

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
