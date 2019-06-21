import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventViewModel} from '../save-event/save-event.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private URL = 'http://localhost:8080/events';
  private ALL_EVENTS_URL = `${this.URL}\\all`;
  private ONE_EVENT_BY_ID_URL = `${this.URL}\\`;
  private SAVE_EVENT_URL = `${this.URL}\\save`;
  private REMOVE_EVENT_URL = `${this.URL}\\remove\\`;

  title: string;
  start: Date;
  end: Date;
  eventAllDay: boolean;

  addFlag = false;
  changeFlag = false;

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.ALL_EVENTS_URL);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(this.ONE_EVENT_BY_ID_URL + id);
  }

  addEvent(event: EventViewModel): Observable<any> {
    return this.http.post(this.SAVE_EVENT_URL, event);
  }

  removeEvent(id: string): Observable<any> {
    return this.http.delete(this.REMOVE_EVENT_URL + id);
  }

  getAddFlag(): boolean {
    return this.addFlag;
  }

  setAddFlag(flag: boolean): void {
    this.addFlag = flag;
  }

  getChangeFlag(): boolean {
    return this.changeFlag;
  }

  setChangeFlag(value: boolean) {
    this.changeFlag = value;
  }
}
