import React from 'react';
import { Task } from '../utils/props/Objects';
import SampleTask from '../components/taskParts/SampleTask';
import TaskList from '../components/taskParts/TaskList';

interface TaskPageProps {
  tasks: Task[];
}

const TaskPage: React.FC<TaskPageProps> = ({ tasks }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <SampleTask />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskPage;
