import React from 'react';
import { Task, Tag } from '../../utils/props/Objects';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  tagOptions: Tag[];
  openModal: (task: Task) => void;
  removeTask: (taskId: string) => Promise<void>;
}
//changes here made with AI to help get the tasks tags to display in task list
const TaskList: React.FC<TaskListProps> = ({ tasks, tagOptions, openModal, removeTask }) => {
  if (tasks.length === 0) {
    return <p className="text-sm text-[#666]">No tasks yet.</p>;
  }

  return (
    <ul className="list-none p-0 m-0">
      {tasks.map((task) => (
        <li key={task.id} className="mb-2 text-sm">
          <TaskItem
            task={task}
            tagOptions={tagOptions}
            openModal={openModal}
            removeTask={removeTask}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;