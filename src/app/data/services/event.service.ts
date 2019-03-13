import { IEventModel } from './../models/event.model';
import { Injectable } from '@angular/core';
import { EVENTS } from '../fake-data/events.fake-data';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public currentYear: number;
  public displayDate: Date;
  public sampleData: Array<SchedulerEvent>;
  public sampleDataWithResources: Array<SchedulerEvent>;
  public sampleDataWithCustomSchema: Array<IEventModel>;

  constructor() {
    this.currentYear = new Date().getFullYear();
    this.displayDate = new Date(this.currentYear, 5, 24);

    this.sampleData = EVENTS.map((dataItem: IEventModel ) => ({
      id: dataItem.TaskID,
      start: this.parseAdjust(dataItem.Start.toString()),
      startTimezone: dataItem.StartTimezone,
      end: this.parseAdjust(dataItem.End.toString()),
      endTimezone: dataItem.EndTimezone,
      isAllDay: dataItem.IsAllDay,
      title: dataItem.Title,
      description: dataItem.Description,
      recurrenceRule: dataItem.RecurrenceRule,
      recurrenceId: dataItem.RecurrenceID,
      recurrenceException: dataItem.RecurrenceException,
      roomId: dataItem.RoomID,
      ownerID: dataItem.OwnerID
    } as SchedulerEvent));

    this.sampleDataWithResources = EVENTS.map((dataItem: IEventModel ) => ({
      id: dataItem.TaskID,
      start: this.parseAdjust(dataItem.Start.toString()),
      startTimezone: dataItem.StartTimezone,
      end: this.parseAdjust(dataItem.End.toString()),
      endTimezone: dataItem.EndTimezone,
      isAllDay: dataItem.IsAllDay,
      title: dataItem.Title,
      description: dataItem.Description,
      recurrenceRule: dataItem.RecurrenceRule,
      recurrenceId: dataItem.RecurrenceID,
      recurrenceException: dataItem.RecurrenceException,
      roomId: this.randomInt(1, 2),
      attendees: [ this.randomInt(1, 3) ]
    } as SchedulerEvent));

    this.sampleDataWithCustomSchema = EVENTS.map((dataItem: IEventModel ) => ({
      ...dataItem,
      Start: this.parseAdjust(dataItem.Start.toString()),
      End: this.parseAdjust(dataItem.End.toString())
    }));

  }

  public parseAdjust(eventDate: string): Date {
    const date = new Date(eventDate);
    date.setFullYear(this.currentYear);
    return date;
  }

  public randomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
