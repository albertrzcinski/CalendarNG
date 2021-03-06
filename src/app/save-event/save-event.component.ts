import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-save-event',
  templateUrl: './save-event.component.html',
  styleUrls: ['./save-event.component.css']
})
export class SaveEventComponent implements OnInit {

  model: EventViewModel = {
    id: null,
    title: '',
    start: '',
    end: '',
    username: ''
  };

  param = '';

  dateStart: Date;
  dateEnd: Date;

  spinnerDayStart: string;
  selectedMonthStart: string;
  spinnerYearStart: string;

  spinnerDayEnd: string = this.spinnerDayStart;
  selectedMonthEnd: string = this.selectedMonthStart;
  spinnerYearEnd: string = this.spinnerYearStart;

  timeStart: Date;
  timeEnd: Date;

  // true - Add event, false - Change event
  addFlag = true;

  checkedFlag = false;

  constructor(private route: ActivatedRoute, private eventService: EventService,
              private router: Router, private messageService: MessageService,
              private loginService: LoginService, private confirmationService: ConfirmationService) {

    if (sessionStorage.getItem('username') != null) {
      this.model.username = sessionStorage.getItem('username');
    }
  }

  setupComponent(someParam) {
    if (someParam.toString().search('-') === -1) {
      this.model.id = someParam;
      this.model.title = this.eventService.title;
      this.dateStart = new Date(this.eventService.start);
      this.dateEnd = new Date(this.eventService.end);
      this.spinnerDayStart = this.dateStart.getDate().toString();
      this.selectedMonthStart = '0' + (this.dateStart.getMonth() + 1);
      this.spinnerYearStart = this.dateStart.getFullYear().toString();
      this.spinnerDayEnd = this.dateEnd.getDate().toString();
      this.selectedMonthEnd = '0' + (this.dateEnd.getMonth() + 1);
      this.spinnerYearEnd = this.dateEnd.getFullYear().toString();
      this.timeStart = this.dateStart;
      this.timeEnd = this.dateEnd;
      this.addFlag = false;
      if (this.eventService.eventAllDay) {
        this.checkedFlag = true;
      }
    } else {
      this.param = someParam;
      this.dateStart = new Date(this.param);
      this.spinnerDayStart = this.dateStart.getDate().toString();
      this.selectedMonthStart = '0' + (this.dateStart.getMonth() + 1);
      this.spinnerYearStart = this.dateStart.getFullYear().toString();
      this.spinnerDayEnd = this.spinnerDayStart;
      this.selectedMonthEnd = this.selectedMonthStart;
      this.spinnerYearEnd = this.spinnerYearStart;
      this.timeStart = new Date(this.eventService.start);
      this.timeEnd = this.timeStart;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.setupComponent( params.eventId );
    });
  }

  addEvent() {
      const sDS: number = +this.spinnerDayStart;
      const sDE: number = +this.spinnerDayEnd;

      let sDSS = '';
      let sDES = '';

      if (sDS < 10) {
        sDSS = '0' + sDS;
      } else {
        sDSS = sDS.toString();
      }
      if (sDE < 10) {
        sDES = '0' + sDE;
      } else {
        sDES = sDE.toString();
      }

      if (this.checkedFlag) {
       this.timeStart = null;
       this.timeEnd = null;
    }

      if (this.timeStart) {
          if (this.timeEnd) {
            const tsH = this.timeStart.getHours();
            const tsM = this.timeStart.getMinutes();
            const teH = this.timeEnd.getHours();
            const teM = this.timeEnd.getMinutes();

            let tsHS = '';
            let tsMS = '';
            let teHS = '';
            let teMS = '';

            if (tsH < 10) {
              tsHS = '0' + tsH;
            } else {
              tsHS = tsH.toString();
            }
            if (tsM < 10) {
              tsMS = '0' + tsM;
            } else {
              tsMS = tsM.toString();
            }
            if (teH < 10) {
              teHS = '0' + teH;
            } else {
              teHS = teH.toString();
            }
            if (teM < 10) {
              teMS = '0' + teM;
            } else {
              teMS = teM.toString();
            }

            this.model.start = this.spinnerYearStart + '-' + this.selectedMonthStart + '-' + sDSS +
              'T' + tsHS + ':' + tsMS + ':' + '00';

            this.dateStart = new Date(this.model.start);

            this.model.end = this.spinnerYearEnd + '-' + this.selectedMonthEnd + '-' + sDES +
              'T' + teHS + ':' + teMS + ':' + '00';

            this.dateEnd = new Date(this.model.end);
          }
      } else {
        this.model.start = this.spinnerYearStart + '-' + this.selectedMonthStart + '-' + sDSS;
        this.dateStart = new Date(this.model.start);
        this.model.end = this.spinnerYearEnd + '-' + this.selectedMonthEnd + '-' + sDES;
        this.dateEnd = new Date(this.model.end);
      }

      if (this.dateStart > this.dateEnd) {
        this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Change the end date or time of event !'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      } else {
          this.eventService.addEvent(this.model).subscribe(
          res => {
            if (this.addFlag) {
              this.eventService.setAddFlag(true);
            } else {
              this.eventService.setChangeFlag(true);
            }
            this.emailConfirm();
          },
          err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error while saving event!'});
            setTimeout(() => {
              this.messageService.clear();
            }, 5000);
            }
          );
      }
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }

  public logout() {
    this.loginService.logoutUser();
    this.router.navigateByUrl('/login');
  }

  emailConfirm() {
    this.confirmationService.confirm({
      key: 'save',
      message: 'Would you like to send reminder to your email ?',
      header: 'Confirmation',
      icon: 'pi pi-envelope',
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Sending', detail: 'The email is sent...'});
        setTimeout(() => {
          this.messageService.clear();
        }, 8000);

        this.eventService.sendEmail(this.model).subscribe(
          res => {
            this.router.navigateByUrl('/home');
          },
          err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error while sending email!'});
            setTimeout(() => {
              this.messageService.clear();
            }, 5000);
          }
        );
      },
      reject: () => {
        this.router.navigateByUrl('/home');
      }
    });
  }
}

export interface EventViewModel {
  id: number;
  title: string;
  start: string;
  end: string;
  username: string;
}
