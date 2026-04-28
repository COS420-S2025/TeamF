import React, { useEffect, useState } from "react";
import moment from "moment";
import { Task, CheckboxStatus} from "../../utils/props/Objects";
import { useTasks } from "../../services/databaseManager";
import {getTextColor} from "../../utils/ColorContrast"
import checkButton from '../../assets/icons/CheckSquare.png';
import xButton from '../../assets/icons/Xsquare.png';

const CHECKBOX_SYMBOLS: Record<CheckboxStatus, string> = {
  0: '☐',
  1: '☑',
  2: '☒',
};
interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, task }) => {
    const [editTaskId, setEditTaskId] = useState<string | null>(task ? task.id : null);
    const [tags, setTags] = useState<string[]>(task ? task.tags : []); // tags the user picked
    const [title, setTitle] = useState(task ? task.title : "");
    const [description, setDescription] = useState(task ? task.description : "");
    const [startTime, setStartTime] = useState(task ? moment(task.start).format("HH:mm") : "");
    const [endTime, setEndTime] = useState(task ? moment(task.end).format("HH:mm") : "");
    const [date, setDate] = useState(task ? moment(task.start).format("YYYY-MM-DD") : "");
    const [status, setStatus] = useState<CheckboxStatus>(0);

  function cycleBox(): void {
    setStatus((prev) => ((prev + 1) % 3) as CheckboxStatus);
  }

    const [allDay, setAllDay] = useState(task ? 
            moment(task.start).format("HH:mm") === "00:00" &&
            moment(task.end).format("HH:mm") === "23:59" : false);
    const {tasks, tagOptions, saveTask, removeTask, refreshTags, refreshTasks } = useTasks();
    useEffect(() => {
        if (isOpen) {
            refreshTasks();
            refreshTags();
        }
    }, [isOpen, refreshTasks, refreshTags]);
    
    if (!isOpen) return null;
    function toggleTag(tagToDeleteOrAdd: string){
        const idTag = tags.find((x) => (tagToDeleteOrAdd === x)); // is it already in the array?
        idTag ? setTags((prev) => prev.filter((tag) => tag !== tagToDeleteOrAdd)) // if yes remove it
        : setTags([...tags,tagToDeleteOrAdd]); // if no add it
    }
    
    function combineDateAndTime(dateStr: string, timeStr: string): Date {
        if (!dateStr) {
            return moment().toDate();
        }

        if (!timeStr) {
            return moment(dateStr, "YYYY-MM-DD").startOf("day").toDate();
        }

        return moment(
            `${dateStr} ${timeStr}`,
            "YYYY-MM-DD HH:mm"
        ).toDate();
    }
    function isValidDateObject(value: Date): boolean {
        return !isNaN(value.getTime());
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;
        if (!date) {
            alert("Please choose a date.");
            return;
        }

        const startDate = allDay
            ? moment(date, "YYYY-MM-DD").startOf("day").toDate()
            : combineDateAndTime(date, startTime);

        const endDate = allDay
            ? moment(date, "YYYY-MM-DD").endOf("day").toDate()
            : combineDateAndTime(date, endTime);

        if (!isValidDateObject(startDate) || !isValidDateObject(endDate)) {
            alert("Invalid date or time.");
            return;
        }

        if (startDate > endDate) {
            alert("Start must be before end.");
            return;
        }

        const taskPayload = {
            title: title.trim(),
            description: description.trim(),
            completed: status,
            event: false,
            tags: tags,
            start: startDate,
            end: endDate,
            filterNum : 0
        };
        saveTask(editTaskId, taskPayload);
        onClose();
    };
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <div style={rowStyle}>
                    <button style={exitButtonStyle} onClick={onClose}>
                        <img 
                        src={xButton} 
                        alt="Exit" 
                        width='40px'
                        height='40px'
                        style={{ display: 'block' }} 
                        />
                    </button>
                    <h2 style={{ flexGrow: 1, textAlign: "center", margin: 0 }}>
                        Add To Calendar
                    </h2>
                    <button
                        type="submit"
                        form="calendarForm"
                        style={submitButtonStyle}
                        onClick={handleSubmit}
                    >
                        <img 
                        src={checkButton} 
                        alt="Confirm" 
                        width='40px'
                        height='40px'
                        style={{ display: 'block' }} 
                        />
                    </button>
                </div>
                <form
                    id="calendarForm"
                    //onSubmit={handleSubmit}
                    style={{
                        padding: "8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}
                >
                    <div style={rowStyle}>
                        <label style={{ width: "100px" }}>Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ flexGrow: 1, padding: "8px", border: "1px solid #000" }}
                        />
                    </div>
                    
                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            //marginLeft: "12px",
                            padding: "8px",
                            border: "1px solid #000"
                        }}
                    />

                    <div style={rowStyle}>
                        <div style={{ flexGrow: 1 }}>
                            <label>Tags:</label>
                            <div style={scrollRowStyle}>
                                {tagOptions.map((opt) => (
                                    <div
                                        key={opt.name}
                                        style={{
                                            ...chipStyle,
                                            border: "1px solid rgba(0,0,0,0.15)",
                                            backgroundColor:
                                                tags.find((x) => (opt.id === x))
                                                    ? opt.color
                                                    : "#E0E0E0",
                                            color:
                                                tags.find((x) => (opt.id === x))
                                                    ? getTextColor(opt.color)
                                                    : "#000"
                                        }}
                                        onClick={() => toggleTag(opt.id)}
                                    >
                                        {opt.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>

                    {!allDay && (
                        <div style={rowStyle}>
                            <div>
                                <label>Start:</label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    style={{ marginLeft: "4px", border: "1px solid #000" }}
                                />
                            </div>
                            <div style={{ marginLeft: "16px" }}>
                                <label>End:</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    style={{ marginLeft: "4px", border: "1px solid #000" }}
                                />
                            </div>
                        </div>
                    )}

                    <div style={rowStyle}>
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ marginLeft: "4px" }}
                        />
                        <div
                            style={{
                                marginLeft: "16px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={allDay}
                                onChange={(e) => setAllDay(e.target.checked)}
                            />
                            <span style={{ marginLeft: "4px" }}>All Day</span>
                        </div>
                    </div>
                    
                </form>
                
                <div
                            style={{
                                marginLeft: "16px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                                  <button
        onClick={cycleBox}
        className="text-[28px] border-none bg-transparent cursor-pointer"
        aria-label="Cycle task checkbox state"
      >
        {CHECKBOX_SYMBOLS[status as CheckboxStatus]}
      </button>
                            <span style={{ marginLeft: "4px" }}>Completed</span>
                        </div>
                
                {task && (<button onClick={()=>{removeTask(task.id); onClose();}}>Remove Task</button>)}

                <hr />

                {/* <div>
                    <h3>Saved Tasks</h3>
                    {tasks.length === 0 ? (
                        <p>No tasks yet.</p>
                    ) : (
                        tasks.map((item, i) => (
                            <div
                                key={item.id}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    marginBottom: "10px"
                                }}
                            >
                                <div>ID: {item.id}</div>
                                <div>Title: {item.title}</div>
                                <div>
                                    Start: {moment(item.start).format("M/D/YYYY h:mm A")}
                                </div>
                                <div>
                                    End: {moment(item.end).format("M/D/YYYY h:mm A")}
                                </div>
                                <div>
                                    Tags:{" "}
                                    {item.tags
                                        ? item.tags
                                        .map((tag) => 
                                            tagOptions.find((option) => (tag === option.id))?.name)
                                        .filter(Boolean)
                                        .join(", ")
                                        : "None"}
                                </div>

                                <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    <button
                                        onClick={() =>
                                            loadTaskIntoForm(item)
                                        }
                                    >
                                        Edit
                                    </button>
                                    
                                    <button
                                    onClick={async () => {
                                        try {
                                        removeTask(item.id)

                                        if (editTaskId === item.id) {
                                            resetForm();
                                        }
                                        } catch (error) {
                                        console.error("Error deleting task:", error);
                                        alert("Failed to delete task.");
                                        }
                                    }}
                                    >
                                    Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default FormModal;

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "80vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    zIndex: 1000
};

const modalStyle: React.CSSProperties = {
    width: "100vw",
    height: "80vh",
    backgroundColor: "#fff",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    position: "relative",
    padding: "16px",
    overflowY: "auto"
};

const exitButtonStyle: React.CSSProperties = {
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer"
};

const submitButtonStyle: React.CSSProperties = {
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer"
};

const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
};

const scrollRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    paddingTop: "8px",
    paddingBottom: "8px"
};

const chipStyle: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "16px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    userSelect: "none",
    flexShrink: 0
    
};