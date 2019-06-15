import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event.service';
import {MatFormFieldAppearance} from '@angular/material';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  param = '';

  dateStart: Date;
  dateEnd: Date;

  title = '';
  start = '';
  end = '';

  spinnerDayStart: string;
  selectedMonthStart: string;
  spinnerYearStart: string;

  spinnerDayEnd: string = this.spinnerDayStart;
  selectedMonthEnd: string = this.selectedMonthStart;
  spinnerYearEnd: string = this.spinnerYearStart;

  timeStart: Date;
  timeEnd: Date;

  // true - add, false - change
  aorch = true;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

  setupComponent(someParam) {
    if (someParam.toString().search('-') === -1) {
      this.title = this.eventService.title;
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
      this.aorch = false;
    } else {
      this.param = someParam;
      this.dateStart = new Date(this.param);
      this.spinnerDayStart = this.dateStart.getDate().toString();
      this.selectedMonthStart = '0' + (this.dateStart.getMonth() + 1);
      this.spinnerYearStart = this.dateStart.getFullYear().toString();
      this.spinnerDayEnd = this.spinnerDayStart;
      this.selectedMonthEnd = this.selectedMonthStart;
      this.spinnerYearEnd = this.spinnerYearStart;
    }


  }

  ngOnInit() {
    // this.param = this.route.snapshot.paramMap.get('eventId');
    this.route.params.subscribe(params => {
      this.setupComponent( params.eventId );
    });
    /*this.route.paramMap.forEach(({params}: Params) => {
      this.param = params['eventId']
    })*/
    /*this.route.paramMap.subscribe(params => {
      this.param = params.get('eventId');
    })*/

    // this.eventService.addEvent();
  }

  addEvent() {
    const sDS: number = +this.spinnerDayStart;
    const sDE: number = +this.spinnerDayEnd;

    let sDSS = '';
    let sDES = '';

    if (sDS < 10) {sDSS = '0' + sDS; } else {sDSS = sDS.toString(); }
    if (sDE < 10) {sDES = '0' + sDE; } else {sDES = sDE.toString(); }

    if (this.timeStart) {
      if (this.timeEnd) {
        const tsH = this.timeStart.getHours();
        const tsM = this.timeStart.getMinutes();
        const teH = this.timeStart.getHours();
        const teM = this.timeStart.getMinutes();

        let tsHS = '';
        let tsMS = '';
        let teHS = '';
        let teMS = '';

        if (tsH < 10) { tsHS = '0' + tsH; } else {tsHS = tsH.toString(); }
        if (tsM < 10) { tsMS = '0' + tsM; }  else {tsMS = tsM.toString(); }
        if (teH < 10) { teHS = '0' + teH; }  else {teHS = teH.toString(); }
        if (teM < 10) { teMS = '0' + teM; }  else {teMS = teM.toString(); }

        this.start = this.spinnerYearStart + '-' + this.selectedMonthStart + '-' + sDSS +
          'T' + tsHS + ':' + tsMS + ':' + '00';
        this.end = this.spinnerYearEnd + '-' + this.selectedMonthEnd + '-' + sDES +
          'T' + teHS + ':' + teMS + ':' + '00';
      }
    } else {
      this.start = this.spinnerYearStart + '-' + this.selectedMonthStart + '-' + sDSS;
      this.end = this.spinnerYearEnd + '-' + this.selectedMonthEnd + '-' + sDES;
    }
/*    console.log(this.title);
    console.log('start ' + this.start);
    console.log('end ' + this.end);*/
    this.eventService.addEvent(this.title, this.start, this.end);

    // TODO change to method getAdded()
    if (this.aorch) { this.eventService.added = true; } else { this.eventService.changed = true; }
    this.router.navigateByUrl('/home');
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }
}
