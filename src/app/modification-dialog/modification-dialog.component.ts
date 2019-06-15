import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-modification-dialog',
  templateUrl: './modification-dialog.component.html',
  styleUrls: ['./modification-dialog.component.css']
})
export class ModificationDialogComponent implements OnInit {

  constructor(private messageService: MessageService, private router: Router, private eventService: EventService) { }

  display = false;

  event: any;

  // events: any[];

  ngOnInit() {
  }

  showDialog(event: any) {
    this.display = true;
    this.event = event;
  }

  changeEvent() {
    this.router.navigateByUrl('/add/' + this.event.id);
    this.eventService.title = this.event.title;
    this.eventService.start = this.event.start;
    this.eventService.end = this.event.end;
    // console.log(this.event.start);
   // console.log(this.event.end);
  }

  deleteEvent() {
    /*this.events = this.eventService.events;
    this.events = this.events.filter( e => e !== this.event);
    this.eventService.events = {...this.events};*/

    this.event.remove();
    this.display = false;

    this.messageService.add({severity: 'info', summary: 'Deleted', detail: 'You have deleted an event!'});
    setTimeout(() => {
      this.messageService.clear();
    }, 5000);
  }
}
