import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: any[];

  title: string;
  start: Date;
  end: Date;

  added = false;
  changed = false;

  // TODO zmieniac id za kazdym dodaniem
  // id: string;

  constructor() {
    this.events = [
      {
        id: '1',
        title: 'All Day Event',
        start: '2019-05-01'
      },
      {
        id: '2',
        title: 'Long Event',
        start: '2019-05-07',
        end: '2019-05-10'
      },
      {
        id: '3',
        title: 'Repeating Event',
        start: '2019-05-09T16:00:00'
      },
      {
        id: '4',
        title: 'Repeating Event',
        start: '2019-05-16T16:00:00'
      },
      {
        id: '5',
        title: 'Lecture',
        start: '2019-05-11T13:30:00',
        end: '2019-05-11T15:00:00',
      }
    ];
  }

  getEvents(): any[] {
    return this.events;
  }

  addEvent(pTitle: string, pStart: string, pEnd: string) {
    this.events = [...this.events, {
        // id = ..
        title: pTitle,
        start: pStart,
        end: pEnd
      }];
    }
}

