import { Task } from '../utils/props/Objects';
import TaskList from '../components/taskParts/TaskList';
import TaskItem from '../components/taskParts/TaskItem';
import { useTasks } from "../services/databaseManager";
import { useEffect, useMemo, useState } from 'react';

// Defines the shape for each date-based accordion group.
type TaskGroup = {
  date: string;
  tasks: Task[];
};

// Props passed down from App so this page can open the task edit modal.
interface TaskProps {
  openModal: (task: Task) => void;
}

// Displays all tasks and groups tasks by start date for the accordion list.
const TaskPage: React.FC<TaskProps> = ({ openModal }) => {
  // Page state and task data loaded from the database manager hook.
  const [openDate, setOpenDate] = useState<string | null>(null);
  const { tasks, tagOptions, refreshTasks} = useTasks();

  // Refreshes the task list when the task page loads.
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  // Groups all tasks by their start date so they can be displayed in date accordions.
  // This does not hide filtered tasks. Filtered tasks still display, but their row turns pink.
  const groupedTasks = useMemo(() => {
    const groups: { [key: string]: Task[] } = {};

    tasks.forEach((task) => {
      // Skip tasks that do not have a start date.
      if (!task.start) {
        return;
      }

      const startDate = new Date(task.start);

      // Skip tasks with invalid start date values.
      if (isNaN(startDate.getTime())) {
        return;
      }

      // Format the date into a readable label for the accordion heading.
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

    // Sort date groups from newest to oldest before displaying them.
    return Object.keys(groups)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map((date) => ({
        date,
        tasks: groups[date],
      }));
  }, [tasks]);

  // Opens the selected date accordion, or closes it if it is already open.
  function toggleAccordion(date: string): void {
    setOpenDate((currentDate) => (currentDate === date ? null : date));
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Main task list showing all current tasks. Filtered tasks are colored pink, not hidden. */}
      <TaskList
        tasks={tasks}
        tagOptions={tagOptions}
        openModal={openModal}
      />

      {/* Date accordion view showing all tasks grouped by start date. */}
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
                        taskID={task.id}
                        tagOptions={tagOptions}
                        openModal={openModal}
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