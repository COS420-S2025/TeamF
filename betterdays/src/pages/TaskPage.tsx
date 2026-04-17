import { Task } from '../utils/props/Objects';
import SampleTask from '../components/taskParts/SampleTask';
import TaskList from '../components/taskParts/TaskList';
import { fetchTasks } from "../services/taskService";
import { useEffect, useState } from 'react';

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchTasks(); // resolve promise here
      setTasks(data);
    }

    load();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <SampleTask />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskPage;
