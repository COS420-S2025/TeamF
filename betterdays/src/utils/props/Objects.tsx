export interface Tag {
  id: string;
  name: string;
  color: string;
  //add heirarchy
};

export type ViewType = 'day' | 'week' | 'month' | 'To Do' | 'FAQ' | 'Settings' | 'Add Tags' | 'Filter' | 'Habit Tracker' | 'hday' | 'hweek' | 'hmonth';

export type CheckboxStatus = 0 | 1 | 2;

export interface Task {
  id: string; //uuid
  title: string; //name
  event: boolean; //is it an event
  tags: string[]; // what tags does it have
  description: string;
  start: Date; // start date
  end: Date; // end date
  completed: CheckboxStatus; 
  userId: string;
  filterNum : number; //doing it like this because a simple bool cant handle it being visible for more than one filter, now im counting how many filters its visible from
};