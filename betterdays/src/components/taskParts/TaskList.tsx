import React from 'react';
import { Task, Tag } from '../../utils/props/Objects';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  tagOptions: Tag[];
  openModal: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, tagOptions, openModal}) => {
  // Shows a simple message if there are no tasks to display.
  if (tasks.length === 0) {
    return <p className="text-sm text-[#666]">No tasks yet.</p>;
  }

  return (
    <ul className="list-none p-0 m-0">
      {tasks.map((task) => (
        <li key={task.id} className="mb-2 text-sm">
          {/* Displays one task row, including tag chips and filter background color. */}
          <TaskItem
            taskID={task.id}
            tagOptions={tagOptions}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;