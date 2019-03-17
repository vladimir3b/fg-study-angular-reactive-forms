export interface IEventModel {
  id: string | number;
  title: string;
  description: string;
  timeZone: string;
  startingMoment: string;
  endingMoment: string;
  allDay: boolean;
  recurrenceRule?: string;
  recurrenceId?: string | number;
  recurrenceException?: Array<Date>;
}
