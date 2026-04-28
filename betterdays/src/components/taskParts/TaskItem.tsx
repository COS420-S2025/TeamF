import React, { useState } from 'react';
import { Task } from '../../utils/props/Objects';

type CheckboxStatus = 0 | 1 | 2;

const CHECKBOX_SYMBOLS: Record<CheckboxStatus, string> = {
  0: '☐',
  1: '☑',
  2: '☒',
};

interface TaskItemProps {
  task: Task;
  openModal : (task:Task)=>void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, openModal }) => {
  const [status, setStatus] = useState<CheckboxStatus>(0);

  function cycleBox(): void {
    setStatus((prev) => ((prev + 1) % 3) as CheckboxStatus);
  }

  return (
    <div className="flex items-center gap-3 p-3 border border-[#ccc] rounded-lg mb-4">
      <button
        onClick={cycleBox}
        className="text-[28px] border-none bg-transparent cursor-pointer"
        aria-label="Cycle task checkbox state"
      >
        {CHECKBOX_SYMBOLS[status]}
      </button>

      <span>{task.title}</span>

      {/* TODO: remove — debug only, will be saved to object in next deliverable */}
      <span className="ml-auto text-xs text-[#666]">
        <button onClick={()=>openModal(task)}>Edit</button>
        status: {status}
      </span>
      
    </div>
  );
};

export default TaskItem;
