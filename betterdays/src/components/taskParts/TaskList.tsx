import React from 'react';
import { Task } from '../../utils/props/Objects';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  openModal : (task:Task)=>void;
  removeTask: (taskId:string)=>Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, openModal, removeTask }) => {
  if (tasks.length === 0) {
    return <p className="text-sm text-[#666]">No tasks yet.</p>;
  }

  return (
    <ul className="list-none p-0 m-0">
      {tasks.map((task) => (
        // TODO: replace JSON.stringify with a real TaskItem once
        // task shape is finalised
        <li key={task.id} className="mb-2 text-sm">
          <TaskItem task={task} openModal={openModal} removeTask={removeTask}/>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
