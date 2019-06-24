import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {FullCalendar} from 'primeng/fullcalendar';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {EventService} from '../services/event.service';
import {HttpClient} from '@angular/common/http';
import {compareLogSummaries} from '@angular/core/src/render3/styling/class_and_style_bindings';
import {callNgModuleLifecycle} from '@angular/core/src/view/ng_module';
import {EventViewModel} from '../save-event/save-event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild('md') modDialog;
  @ViewChild('fc') fullCal: FullCalendar;

  events: any[];

  options: any;

  dateValue: Date = new Date();

  model: EventViewModel = {
    id: null,
    title: '',
    start: '',
    end: ''
  };

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router, private  eventService: EventService) {}

  ngOnInit() {
    this.getAllEvents();

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      editable: true,
      eventTextColor: 'white',
      header: {
        left: 'prev, today, next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,timeGridYear'
      },
      dateClick: (e) => {
        let tmp: string;
        if (e.dateStr.length > 10) {
          tmp = e.dateStr.slice(0, 10) + ' at ' + e.dateStr.slice(11, 19);
        } else {
          tmp = e.dateStr;
        }
        this.eventService.start = e.date;

        this.confirmationService.confirm({
          key: 'date',
          message: 'Would you like to add an event to ' + tmp + ' ?',
          header: 'Confirmation',
          icon: 'pi pi-calendar-plus',
          accept: () => {
            this.router.navigateByUrl('/save/' + e.dateStr);
          },
          reject: () => {
            // this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected....'}];
          }
        });
      },
      eventClick: (e) => {
        this.modDialog.showDialog(e.event);
        this.eventService.eventAllDay = e.event.allDay;
      },
      eventResize: (e) => {
        this.saveEventChanging(e.event);
      },
      eventDrop: (e) => {
        this.saveEventChanging(e.event);
      },
      views: {
        timeGridYear: {
          type: 'dayGrid',
          duration: {year: 1},
          buttonText: 'year',
        }
      }
    };
  }

  viewMonth(): void {
    this.fullCal.getCalendar().gotoDate(this.dateValue);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.eventService.getAddFlag()) {
        this.messageService.add({severity: 'success', summary: 'Added', detail: 'You have added an event!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
        this.eventService.setAddFlag(false);
      }
      if (this.eventService.getChangeFlag()) {
        this.messageService.add({severity: 'success', summary: 'Changed', detail: 'You have changed an event!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
        this.eventService.setChangeFlag(false);
      }
    }, 100);
  }

  public getAllEvents() {
    this.eventService.getAllEvents().subscribe(
      res => {
        this.events = res;
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error while fetching events!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
    });
  }

  public saveEventChanging(event: any) {
    this.model.id = event.id;
    this.model.title = event.title;
    this.model.start = event.start;
    this.model.end = event.end;

    this.eventService.addEvent(this.model).subscribe(
      res => {
        this.messageService.add({severity: 'success', summary: 'Changing', detail: 'You have changed an event!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error while changing event!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      }
    );
  }
}
