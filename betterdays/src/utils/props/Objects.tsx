export interface Tag {
  id: string;
  name: string;
  color: string;
};

export type ViewType = 'day' | 'week' | 'month' | 'To Do' | 'FAQ' | 'Settings' | 'Add Tags';

export interface Task {
  id: string; //uuid
  title: string; //name
  event: boolean; //is it an event
  tags: string[]; // what tags does it have
  description: string;
  start: Date; // start date
  end: Date; // end date
  completed: boolean;
};