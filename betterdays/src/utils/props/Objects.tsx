export interface Tag {
  id: string;
  name: string;
  color: string;
  //add heirarchy
};

export type ViewType = 'day' | 'week' | 'month' | 'To Do' | 'FAQ' | 'Settings' | 'Add Tags';

export type Status = true | false | undefined;

export interface Task {
  id: string; //uuid
  title: string; //name
  event: boolean; //is it an event
  tags: string[]; // what tags does it have
  description: string;
  start: Date; // start date
  end: Date; // end date
  completed: boolean; 
  //change to true false n/a
  //add visible bool
};