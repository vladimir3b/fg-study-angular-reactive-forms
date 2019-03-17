/***
 *    ██████╗ ███████╗ █████╗ ██████╗
 *    ██╔══██╗██╔════╝██╔══██╗██╔══██╗
 *    ██████╔╝█████╗  ███████║██║  ██║
 *    ██╔══██╗██╔══╝  ██╔══██║██║  ██║
 *    ██║  ██║███████╗██║  ██║██████╔╝
 *    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

// MY IMPORTS
import { IEventModel } from '../../models/event.model';


@Injectable({
  providedIn: 'root'
})
export class ReadEventsService {

/***
 *    ┌─┐┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┌─┐┬─┐
 *    │  │ ││││└─┐ │ ├┬┘│ ││   │ │ │├┬┘
 *    └─┘└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ └─┘┴└─
 */
  public constructor(private _httpClient: HttpClient) { }

/***
 *    ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
 *    │││├┤  │ ├─┤│ │ ││└─┐
 *    ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘
 */
  public getEvents(): Observable<Array<IEventModel>> {
    return this._httpClient.get('/assets/fake-data/events.json')
      .pipe(map((events: Array<any>) => {
        return events.map((event: any) => {
          return {
            id: event.id,
            title: event.title,
            description: event.description,
            timeZone: event.timeZone,
            startingMoment: event.startingMoment,
            endingMoment: event.endingMoment,
            allDay: event.allDay
          };
      });
    }));
  }

}
