/***
 *    ██████╗  █████╗ ███████╗██╗ ██████╗
 *    ██╔══██╗██╔══██╗██╔════╝██║██╔════╝
 *    ██████╔╝███████║███████╗██║██║
 *    ██╔══██╗██╔══██║╚════██║██║██║
 *    ██████╔╝██║  ██║███████║██║╚██████╗
 *    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝
 *
 *    ██╗  ██╗███████╗███╗   ██╗██████╗  ██████╗
 *    ██║ ██╔╝██╔════╝████╗  ██║██╔══██╗██╔═══██╗
 *    █████╔╝ █████╗  ██╔██╗ ██║██║  ██║██║   ██║
 *    ██╔═██╗ ██╔══╝  ██║╚██╗██║██║  ██║██║   ██║
 *    ██║  ██╗███████╗██║ ╚████║██████╔╝╚██████╔╝
 *    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝
 *
 *    ███████╗ ██████╗ ██████╗ ███╗   ███╗
 *    ██╔════╝██╔═══██╗██╔══██╗████╗ ████║
 *    █████╗  ██║   ██║██████╔╝██╔████╔██║
 *    ██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║
 *    ██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║
 *    ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
 *
 *     ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
 *    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
 *    ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║
 *    ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║
 *    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║
 *     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝
 *
 *    ███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
 *    ██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
 *    ███████╗██║     ██████╔╝██║██████╔╝   ██║
 *    ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║
 *    ███████║╚██████╗██║  ██║██║██║        ██║
 *    ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝
 *
 */
import '@progress/kendo-date-math/tz/Europe/Bucharest';
import { CreateFormGroupArgs } from '@progress/kendo-angular-scheduler/dist/es2015/editing-directives/create-form-group-args.interface';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { Subscription } from 'rxjs';

// MY IMPORTS
import { ManageEventsService } from './../../../../data/services/events-services/manage-events.service';


@Component({
  selector: 'fg-basic-kendo-form',
  templateUrl: './basic-kendo-form.component.html',
  styleUrls: ['./basic-kendo-form.component.scss']
})
export class BasicKendoFormComponent implements OnInit {

/***
 *    ┌─┐┬─┐┌─┐┌─┐┌─┐┬─┐┌┬┐┬┌─┐┌─┐
 *    ├─┘├┬┘│ │├─┘├┤ ├┬┘ │ │├┤ └─┐
 *    ┴  ┴└─└─┘┴  └─┘┴└─ ┴ ┴└─┘└─┘
 */
  public events: Array<SchedulerEvent>;
  public formGroup: FormGroup;
  public subscriptions: Array<Subscription>;

/***
 *    ┌─┐┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┌─┐┬─┐
 *    │  │ ││││└─┐ │ ├┬┘│ ││   │ │ │├┬┘
 *    └─┘└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ └─┘┴└─
 */
  public constructor(
    private _manageEvents: ManageEventsService,
    private _formBuilder: FormBuilder
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
    this.subscriptions = [];
  }

 /***
 *    ┬  ┬┌─┐┌─┐
 *    │  │├┤ ├┤
 *    ┴─┘┴└  └─┘
 *    ┌─┐┬ ┬┌─┐┬  ┌─┐
 *    │  └┬┘│  │  ├┤
 *    └─┘ ┴ └─┘┴─┘└─┘
 *    ┬ ┬┌─┐┌─┐┬┌─┌─┐
 *    ├─┤│ ││ │├┴┐└─┐
 *    ┴ ┴└─┘└─┘┴ ┴└─┘
 */
  public ngOnInit(): void {
    this.subscriptions.push(this._manageEvents.inputEvents()
      .subscribe(
        (events: Array<SchedulerEvent>) => {
          this.events = events;
        }
      ));
  }


/***
 *    ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
 *    │││├┤  │ ├─┤│ │ ││└─┐
 *    ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘
 */
  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    this.formGroup = this._formBuilder.group({
        'start': [args.dataItem.start, Validators.required],
        'end': [args.dataItem.end, Validators.required],
        'startTimezone': [args.dataItem.startTimezone],
        'endTimezone': [args.dataItem.endTimezone],
        'isAllDay': args.dataItem.isAllDay,
        'title': args.dataItem.title,
        'description': args.dataItem.description,
        'recurrenceRule': args.dataItem.recurrenceRule,
        'recurrenceId': args.dataItem.recurrenceId
    });
    return this.formGroup;
  }

  public submit(): void {
    this._manageEvents.outputEvents(this.events);
  }
}
