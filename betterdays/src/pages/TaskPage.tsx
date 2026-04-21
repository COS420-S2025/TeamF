// import { Task } from '../utils/props/Objects';
// import SampleTask from '../components/taskParts/SampleTask';
// import TaskList from '../components/taskParts/TaskList';
// import { fetchTasks } from "../services/taskService";
// import { useEffect, useState } from 'react';

// const TaskPage: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     async function load() {
//       const data = await fetchTasks(); // resolve promise here
//       setTasks(data);
//     }

//     load();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>
//       <SampleTask />
//       <TaskList tasks={tasks} />
//     </div>
//   );
// };

// export default TaskPage;

import { Task } from '../utils/props/Objects';
import TaskList from '../components/taskParts/TaskList';
import TaskItem from '../components/taskParts/TaskItem';
import { fetchTasks } from "../services/databaseManager";
import { useEffect, useState } from 'react';

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDate, setOpenDate] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await fetchTasks();
      setTasks(data);
    }

    load();
  }, []);

  function toggleAccordion(date: string): void {
    setOpenDate((currentDate) => (currentDate === date ? null : date));
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <TaskList tasks={tasks} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Dummy Past Days</h2>

        <section style={{ borderTop: '1px solid #000' }}>
          <article style={{ borderBottom: '1px solid #000' }}>
            <button
              type="button"
              onClick={() => toggleAccordion('April 15, 2026')}
              aria-expanded={openDate === 'April 15, 2026'}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '24px', color: '#111111' }}>
                April 15, 2026
              </span>

              <span
                style={{
                  fontSize: '24px',
                  color: '#111111',
                  display: 'inline-block',
                  transform:
                    openDate === 'April 15, 2026' ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                ›
              </span>
            </button>

            {openDate === 'April 15, 2026' && (
              <div style={{ paddingBottom: '20px' }}>
                <TaskItem label="Tom's coding contribution" />
                <TaskItem label="Tom's second contribution" />
                <TaskItem label="Tom's third contribution" />
              </div>
            )}
          </article>

          <article style={{ borderBottom: '1px solid #000' }}>
            <button
              type="button"
              onClick={() => toggleAccordion('April 14, 2026')}
              aria-expanded={openDate === 'April 14, 2026'}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '24px', color: '#111111' }}>
                April 14, 2026
              </span>

              <span
                style={{
                  fontSize: '24px',
                  color: '#111111',
                  display: 'inline-block',
                  transform:
                    openDate === 'April 14, 2026' ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                ›
              </span>
            </button>

            {openDate === 'April 14, 2026' && (
              <div style={{ paddingBottom: '20px' }}>
                <TaskItem label="Tom's coding contribution" />
                <TaskItem label="Tom's second contribution" />
                <TaskItem label="Tom's third contribution" />
              </div>
            )}
          </article>

          <article style={{ borderBottom: '1px solid #000' }}>
            <button
              type="button"
              onClick={() => toggleAccordion('April 13, 2026')}
              aria-expanded={openDate === 'April 13, 2026'}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '24px', color: '#111111' }}>
                April 13, 2026
              </span>

              <span
                style={{
                  fontSize: '24px',
                  color: '#111111',
                  display: 'inline-block',
                  transform:
                    openDate === 'April 13, 2026' ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                ›
              </span>
            </button>

            {openDate === 'April 13, 2026' && (
              <div style={{ paddingBottom: '20px' }}>
                <TaskItem label="Tom's coding contribution" />
                <TaskItem label="Tom's second contribution" />
                <TaskItem label="Tom's third contribution" />
              </div>
            )}
          </article>
        </section>
      </div>
    </div>
  );
};

export default TaskPage;