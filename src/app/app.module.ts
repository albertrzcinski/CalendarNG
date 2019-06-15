import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {SharedModule} from 'primeng/shared';
import {ConfirmDialogModule, DialogModule, MenuModule, MessageModule, MessagesModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/calendar';
import {SpinnerModule} from 'primeng/spinner';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService} from 'primeng/api';
import { ModificationDialogComponent } from './modification-dialog/modification-dialog.component';
import {FormsModule} from '@angular/forms';
import {AppRouting} from './app.routes';
import { AddEventComponent } from './add-event/add-event.component';
import { CalendarComponent } from './calendar/calendar.component';
import {EventService} from './services/event.service';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ModificationDialogComponent,
    AddEventComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    FullCalendarModule,
    ConfirmDialogModule,
    SharedModule,
    MessagesModule,
    MessageModule,
    MenuModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    AppRouting,
    InputTextModule,
    SpinnerModule,
    DropdownModule,
    MatSelectModule
  ],
  providers: [ConfirmationService, MessageService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
