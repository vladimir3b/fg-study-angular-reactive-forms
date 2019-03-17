/***
 *    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗
 *    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝
 *    ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗
 *    ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝
 *    ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗
 *    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 *
 *    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
 *    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
 *    █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
 *    ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
 *    ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
 *    ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
 *
 *    ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗
 *    ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝
 *    ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗
 *    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝
 *    ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗
 *    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';

// MY IMPORTS
import { IEventModel } from './../../models/event.model';
import { ReadEventsService } from './read-events.service';
import { WriteEventsService } from './write-events.service';

@Injectable({
  providedIn: 'root'
})
export class ManageEventsService {

/***
 *    ┌─┐┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┌─┐┬─┐
 *    │  │ ││││└─┐ │ ├┬┘│ ││   │ │ │├┬┘
 *    └─┘└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ └─┘┴└─
 */
  constructor(
    private _readEvents: ReadEventsService,
    private _writeEvents: WriteEventsService
  ) { }

/***
 *    ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
 *    │││├┤  │ ├─┤│ │ ││└─┐
 *    ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘
 */
  public inputEvents(): Observable<Array<SchedulerEvent>> {
    return this._readEvents.getEvents().pipe(
      map((events: Array<IEventModel>) => events.map((event: IEventModel) => {
        return {
          id: event.id,
          title: event.title,
          start: new Date(event.startingMoment),
          end: new Date(event.endingMoment),
          startTimezone: event.timeZone,
          endTimezone: event.timeZone,
          description: event.description,
          isAllDay: event.allDay,
          recurrenceId: event.recurrenceId,
          recurrenceRule: event.recurrenceRule,
          recurrenceExceptions: event.recurrenceException
        };
      }))
    );
  }

  public outputEvents(events: Array<SchedulerEvent>): void {
    console.log(events.map((event: SchedulerEvent) => {
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        timeZone: event.startTimezone,
        startingMoment: event.start,
        endingMoment: event.end,
        allDay: event.isAllDay,
        recurrenceRule: event.recurrenceRule,
        recurrenceId: event.recurrenceId,
        recurrenceException: event.recurrenceExceptions
      }
    }));
  }

}
