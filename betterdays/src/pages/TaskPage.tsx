
// export default TaskPage;
import { Task } from '../utils/props/Objects';
import TaskList from '../components/taskParts/TaskList';
import TaskItem from '../components/taskParts/TaskItem';
import { useTasks } from "../services/databaseManager";
import { useAuth } from '../hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';
//this section was heavily updated and edited with AI
//used for date accordian folds
type TaskGroup = {
  date: string;
  tasks: Task[];
};
//lets this open task edit modal
interface TaskProps {
  openModal : (task:Task)=>void;
}
//displays tasks and groups by start date for accordian list
const TaskPage: React.FC<TaskProps> = ( {openModal} ) => {
  const { user } = useAuth();
  const [openDate, setOpenDate] = useState<string | null>(null);
  const {tasks, tagOptions, refreshTasks, removeTask } = useTasks();

  //refresh task list on change
  useEffect(() => {
      refreshTasks()
    }, [refreshTasks]);

    //groups by start date so they can be displayed in data accordian
  const groupedTasks = useMemo(() => {
    const groups: { [key: string]: Task[] } = {};
    //skips if no start date
    tasks.forEach((task) => {
      if (!task.start) {
        return;
      }

      const startDate = new Date(task.start);
      //skips invalid date values
      if (isNaN(startDate.getTime())) {
        return;
      }
      //date in readable label for accordian header
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
    //sort date groups from newest to oldest
    return Object.keys(groups)
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  .map((date) => ({
    date,
    tasks: groups[date],
  }));
  }, [tasks]);
  //close or open the accordian
  function toggleAccordion(date: string): void {
    setOpenDate((currentDate) => (currentDate === date ? null : date));
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <TaskList
        tasks={tasks}
        tagOptions={tagOptions}
        openModal={openModal}
        removeTask={removeTask}
      />
      {/* date accordian view showing tasks by start date. */}
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
                  <div className="text-sm">
                    {group.tasks.map((task) => (
                      <TaskItem
                        key={`${group.date}-${task.id}`}
                        task={task}
                        tagOptions={tagOptions}
                        openModal={openModal}
                        removeTask={removeTask}
                      />
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