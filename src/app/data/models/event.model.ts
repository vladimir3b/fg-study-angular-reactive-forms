export interface IEventModel {
  id: string | number;
  title: string;
  description: string;
  timeZone: string;
  startingMoment: string;
  endingMoment: string;
  allDay: boolean;
  RecurrenceRule?: string;
  RecurrenceID?: string | number;
  RecurrenceException?: Array<Date>;
}
