import React, { useEffect, useState } from 'react';
import { Task, Tag } from '../../utils/props/Objects';
import { getTextColor } from '../../utils/ColorContrast';
import xButton from '../../assets/icons/Xsquare.png';
import { useTasks } from '../../services/databaseManager';

type CheckboxStatus = 0 | 1 | 2;

// Symbols used for the task's three checkbox states.
const CHECKBOX_SYMBOLS: Record<CheckboxStatus, string> = {
  0: '☐',
  1: '☑',
  2: '☒',
};

interface TaskItemProps {
  taskID: string;
  tagOptions: Tag[];
  openModal: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ taskID, tagOptions, openModal}) => {
  // Stores the current checkbox state for this task row.
  // const [status, setStatus] = useState<CheckboxStatus>(task.completed ?? 0);
  const {tasks, removeTask, refreshTasks, saveTask} = useTasks();
  
  useEffect(() => {
      refreshTasks();
    }, [refreshTasks]);
    
  let tempTask = tasks.find((task)=>task.id===taskID);
  if(tempTask===undefined) {
    console.log("Invalid Task ID");
    return <div></div>
  }
  const task = tempTask as Task;

  // Cycles the checkbox display between incomplete, complete, and failed.
  function cycleBox(): void {
    //setStatus((prev) => ((prev + 1) % 3) as CheckboxStatus);
    saveTask(task.id, {...task, completed: ((task.completed +1) % 3) as CheckboxStatus})
  }

  // Tasks store tag IDs, so this finds the matching full tag object for display.
  function getTagById(tagId: string): Tag {
    const savedTag = tagOptions.find((tag) => tag.id === tagId);

    return savedTag ?? {
      // Fallback display if a task references a tag that is no longer in tagOptions.
      id: tagId,
      name: tagId,
      color: '#E0E0E0',
    };
  }

  // Show only the first two tags to keep task rows readable on small screens.
  const taskTags = task.tags ? task.tags.map(getTagById) : [];
  const visibleTags = taskTags.slice(0, 2);
  const hasMoreTags = taskTags.length > 2;

  // Uses the original filter color behavior: normal tasks are blue, filtered tasks are pink.
  const taskBackgroundColor = task.filterNum ? '#fde3e3' : '#e3f2fd';

  return (
    <div
      className="flex items-center gap-2 p-3 border border-[#ccc] rounded-lg mb-4 min-w-0"
      style={{ backgroundColor: taskBackgroundColor }}
    >
      {/* Checkbox button for cycling the task status display. */}
      <button
        onClick={cycleBox}
        className="text-[28px] border-none bg-transparent cursor-pointer shrink-0"
        aria-label="Cycle task checkbox state"
      >
        {CHECKBOX_SYMBOLS[task.completed]}
      </button>

      {/* Task title. Truncate prevents long titles from forcing the row wider than the screen. */}
      <span className="min-w-0 flex-1 truncate">{task.title}</span>

      {/* Tag display. Shows at most two tags, then an overflow marker if more tags exist. */}
      {taskTags.length > 0 && (
        <span className="flex items-center gap-1 shrink-0 max-w-[45%] overflow-hidden">
          {visibleTags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs rounded-md border border-[#999] px-2 py-0.5 truncate max-w-[80px]"
              style={{
                backgroundColor: tag.color,
                color: getTextColor(tag.color),
              }}
            >
              {tag.name}
            </span>
          ))}

          {/* Shows that this task has more tags than can fit in the compact task row. */}
          {hasMoreTags && (
            <span className="text-xs rounded-md border border-[#999] px-2 py-0.5 bg-[#E0E0E0] text-black">
              ...
            </span>
          )}
        </span>
      )}

      {/* Task action buttons. */}
      <span className="ml-auto flex items-center gap-2 text-xs text-[#666] shrink-0">
        <button
          onClick={() => openModal(task)}
          style={{
            color: 'black',
            verticalAlign: 'center',
            fontSize: '15px',
            margin: '10px',
          }}
        >
          Edit
        </button>

        <button onClick={() => removeTask(task.id)}>
          <img
            src={xButton}
            alt="Remove task"
            width="30px"
            height="30px"
            style={{ display: 'block' }}
          />
        </button>
      </span>
    </div>
  );
};

export default TaskItem;