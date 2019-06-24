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

  ngOnInit() {
  }

  showDialog(event: any) {
    this.display = true;
    this.event = event;
  }

  changeEvent() {
    this.eventService.getEventById(this.event.id).subscribe(
      res => {
        this.eventService.title = res.title;
        this.eventService.start = res.start;
        if (res.end == null) { res.end = res.start; }
        this.eventService.end = res.end;
        this.router.navigateByUrl('/save/' + this.event.id);
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error while fetching event!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      }
    );
  }

  deleteEvent() {
    this.eventService.removeEvent(this.event.id).subscribe(
      res => {
        this.event.remove();
        this.display = false;

        this.messageService.add({severity: 'info', summary: 'Deleted', detail: 'You have deleted an event!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      },
      err => {
        this.display = false;
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error while deleting event!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      }
    );
  }
}
