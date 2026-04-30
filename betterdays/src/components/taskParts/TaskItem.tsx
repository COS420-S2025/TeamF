import React, { useState } from 'react';
import { Task, Tag } from '../../utils/props/Objects';
import { getTextColor } from '../../utils/ColorContrast';
import xButton from '../../assets/icons/Xsquare.png';

type CheckboxStatus = 0 | 1 | 2;
//helped with AI for getting the changing checkboxes. may change to
//a 2 for unfilled
const CHECKBOX_SYMBOLS: Record<CheckboxStatus, string> = {
  0: '☐',
  1: '☑',
  2: '☒',
};

interface TaskItemProps {
  task: Task;
  tagOptions: Tag[];
  openModal: (task: Task) => void;
  removeTask: (taskId: string) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, tagOptions, openModal, removeTask }) => {
  const [status, setStatus] = useState<CheckboxStatus>(task.completed ?? 0);

  function cycleBox(): void {
    setStatus((prev) => ((prev + 1) % 3) as CheckboxStatus);
  }
  //
  function getTagById(tagId: string): Tag {
    const savedTag = tagOptions.find((tag) => tag.id === tagId);
    //fallback in case tag option is deleted
    return savedTag ?? {
      id: tagId,
      name: tagId,
      color: '#E0E0E0',
    };
  }
  //show only the first two tags 
  const taskTags = task.tags ? task.tags.map(getTagById) : [];
  const visibleTags = taskTags.slice(0, 2);
  const hasMoreTags = taskTags.length > 2;

  return (
    <div className="flex items-center gap-2 p-3 border border-[#ccc] rounded-lg mb-4 min-w-0">
      <button
        onClick={cycleBox}
        className="text-[28px] border-none bg-transparent cursor-pointer shrink-0"
        aria-label="Cycle task checkbox state"
      >
        {CHECKBOX_SYMBOLS[status]}
      </button>

      <span className="min-w-0 flex-1 truncate">{task.title}</span>

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

          {hasMoreTags && (
            <span className="text-xs rounded-md border border-[#999] px-2 py-0.5 bg-[#E0E0E0] text-black">
              ...
            </span>
          )}
        </span>
      )}

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