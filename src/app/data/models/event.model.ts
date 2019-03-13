export interface IEventModel {
  TaskID: number;
  OwnerID: number;
  RoomID?: number;
  Title: string;
  Description: string;
  StartTimezone: string;
  Start: Date;
  End: Date;
  EndTimezone: string;
  RecurrenceRule: string;
  RecurrenceID: any;
  RecurrenceException: Array<Date>;
  IsAllDay: boolean;
}
