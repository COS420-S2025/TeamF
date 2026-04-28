// // import { Task } from '../utils/props/Objects';
// // import SampleTask from '../components/taskParts/SampleTask';
// // import TaskList from '../components/taskParts/TaskList';
// // import { fetchTasks } from "../services/taskService";
// // import { useEffect, useState } from 'react';

// // const TaskPage: React.FC = () => {
// //   const [tasks, setTasks] = useState<Task[]>([]);

// //   useEffect(() => {
// //     async function load() {
// //       const data = await fetchTasks(); // resolve promise here
// //       setTasks(data);
// //     }

// //     load();
// //   }, []);

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-2xl font-bold mb-4">Tasks</h1>
// //       <SampleTask />
// //       <TaskList tasks={tasks} />
// //     </div>
// //   );
// // };

// // export default TaskPage;

// //AI added by Tom (forgot to mention here, thought it was overall in the readme that we used AI
// //not for each part of key)

// import { Task } from '../utils/props/Objects';
// import TaskList from '../components/taskParts/TaskList';
// import TaskItem from '../components/taskParts/TaskItem';
// import { fetchTasks } from "../services/taskService";
// import { useEffect, useState } from 'react';

// const TaskPage: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [openDate, setOpenDate] = useState<string | null>(null);

//   useEffect(() => {
//     async function load() {
//       const data = await fetchTasks();
//       setTasks(data);
//     }

//     load();
//   }, []);

//   function toggleAccordion(date: string): void {
//     setOpenDate((currentDate) => (currentDate === date ? null : date));
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>

//       <TaskList tasks={tasks} />

//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Dummy Past Days</h2>

//         <section style={{ borderTop: '1px solid #000' }}>
//           <article style={{ borderBottom: '1px solid #000' }}>
//             <button
//               type="button"
//               onClick={() => toggleAccordion('April 15, 2026')}
//               aria-expanded={openDate === 'April 15, 2026'}
//               style={{
//                 width: '100%',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '20px 0',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 textAlign: 'left',
//               }}
//             >
//               <span style={{ fontSize: '24px', color: '#111111' }}>
//                 April 15, 2026
//               </span>

//               <span
//                 style={{
//                   fontSize: '24px',
//                   color: '#111111',
//                   display: 'inline-block',
//                   transform:
//                     openDate === 'April 15, 2026' ? 'rotate(90deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.2s',
//                 }}
//               >
//                 ›
//               </span>
//             </button>

//             {openDate === 'April 15, 2026' && (
//               <div style={{ paddingBottom: '20px' }}>
//                 <TaskItem label="Tom's coding contribution" />
//                 <TaskItem label="Tom's second contribution" />
//                 <TaskItem label="Tom's third contribution" />
//               </div>
//             )}
//           </article>

//           <article style={{ borderBottom: '1px solid #000' }}>
//             <button
//               type="button"
//               onClick={() => toggleAccordion('April 14, 2026')}
//               aria-expanded={openDate === 'April 14, 2026'}
//               style={{
//                 width: '100%',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '20px 0',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 textAlign: 'left',
//               }}
//             >
//               <span style={{ fontSize: '24px', color: '#111111' }}>
//                 April 14, 2026
//               </span>

//               <span
//                 style={{
//                   fontSize: '24px',
//                   color: '#111111',
//                   display: 'inline-block',
//                   transform:
//                     openDate === 'April 14, 2026' ? 'rotate(90deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.2s',
//                 }}
//               >
//                 ›
//               </span>
//             </button>

//             {openDate === 'April 14, 2026' && (
//               <div style={{ paddingBottom: '20px' }}>
//                 <TaskItem label="Tom's coding contribution" />
//                 <TaskItem label="Tom's second contribution" />
//                 <TaskItem label="Tom's third contribution" />
//               </div>
//             )}
//           </article>

//           <article style={{ borderBottom: '1px solid #000' }}>
//             <button
//               type="button"
//               onClick={() => toggleAccordion('April 13, 2026')}
//               aria-expanded={openDate === 'April 13, 2026'}
//               style={{
//                 width: '100%',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '20px 0',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 textAlign: 'left',
//               }}
//             >
//               <span style={{ fontSize: '24px', color: '#111111' }}>
//                 April 13, 2026
//               </span>

//               <span
//                 style={{
//                   fontSize: '24px',
//                   color: '#111111',
//                   display: 'inline-block',
//                   transform:
//                     openDate === 'April 13, 2026' ? 'rotate(90deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.2s',
//                 }}
//               >
//                 ›
//               </span>
//             </button>

//             {openDate === 'April 13, 2026' && (
//               <div style={{ paddingBottom: '20px' }}>
//                 <TaskItem label="Tom's coding contribution" />
//                 <TaskItem label="Tom's second contribution" />
//                 <TaskItem label="Tom's third contribution" />
//               </div>
//             )}
//           </article>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default TaskPage;
import { Task } from '../utils/props/Objects';
import TaskList from '../components/taskParts/TaskList';
import TaskItem from '../components/taskParts/TaskItem';
import { fetchTasks, useTasks } from "../services/databaseManager";
import { useAuth } from '../hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';

type TaskGroup = {
  date: string;
  tasks: Task[];
};

interface TaskProps {
  openModal : (task:Task)=>void;
}

const TaskPage: React.FC<TaskProps> = ( {openModal} ) => {
  const { user } = useAuth();
  const [openDate, setOpenDate] = useState<string | null>(null);
  const {tasks, refreshTasks } = useTasks();

  useEffect(() => {
      refreshTasks()
    }, [refreshTasks]);

  const groupedTasks = useMemo(() => {
    const groups: { [key: string]: Task[] } = {};

    tasks.forEach((task) => {
      if (!task.start) {
        return;
      }

      const startDate = new Date(task.start);

      if (isNaN(startDate.getTime())) {
        return;
      }

      const dateLabel = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }

      groups[dateLabel].push(task);
    });

    return Object.keys(groups)
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  .map((date) => ({
    date,
    tasks: groups[date],
  }));
  }, [tasks]);

  function toggleAccordion(date: string): void {
    setOpenDate((currentDate) => (currentDate === date ? null : date));
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <TaskList tasks={tasks} openModal={openModal} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Tasks by Start Date</h2>

        <section style={{ borderTop: '1px solid #000' }}>
          {groupedTasks.map((group: TaskGroup) => {
            const isOpen = openDate === group.date;

            return (
              <article key={group.date} style={{ borderBottom: '1px solid #000' }}>
                <button
                  type="button"
                  onClick={() => toggleAccordion(group.date)}
                  aria-expanded={isOpen}
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
                    {group.date}
                  </span>

                  <span
                    style={{
                      fontSize: '24px',
                      color: '#111111',
                      display: 'inline-block',
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    ›
                  </span>
                </button>

                {isOpen && (
                  <div style={{ paddingBottom: '20px' }}>
                    {group.tasks.map((task) => (
                      <TaskItem key={`${group.date}-${task.id}`} task={task} openModal={openModal}/>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default TaskPage;