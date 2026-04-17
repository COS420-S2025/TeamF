import { Task, Tag } from "../../utils/props/Objects";
import moment from "moment";
import {fetchTags } from "../../services/taskService";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {getTextColor} from "../../utils/ColorContrast"

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    taskRaw: Task| null;
}
const Popup: React.FC<PopupProps> = ({ isOpen, onClose, taskRaw }) => {
    const [task, setTask] = useState<Task| null>(taskRaw);
    const [editTaskId, setEditTaskId] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]); // tags the user picked
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");
    const [allDay, setAllDay] = useState(false);
    const [tagOptions, setTagOptions] = useState<Tag[]>([]); // tags the user created

    function toggleTag(tagToDeleteOrAdd: string){
        const idTag = tags.find((x) => (tagToDeleteOrAdd === x)); // is it already in the array?
        idTag ? setTags((prev) => prev.filter((tag) => tag !== tagToDeleteOrAdd)) // if yes remove it
        : setTags([...tags,tagToDeleteOrAdd]); // if no add it
    }
    useEffect(() => {
    if (isOpen) {
        fetchTags().then(setTagOptions);

    }
    }, [isOpen]);

    useEffect(() => {
    setTask(taskRaw);

    if (taskRaw) {
      setEditTaskId(taskRaw.id);
      setTitle(taskRaw.title);
      setTags(taskRaw.tags ?? []);
      setDescription(taskRaw.description);
      setDate(moment(taskRaw.start).format("YYYY-MM-DD"));
      setStartTime(moment(taskRaw.start).format("HH:mm"));
      setEndTime(moment(taskRaw.end).format("HH:mm"));
      setCompleted(taskRaw.completed);

      const isFullDay =
        moment(taskRaw.start).format("HH:mm") === "00:00" &&
        moment(taskRaw.end).format("HH:mm") === "23:59";

      setAllDay(isFullDay);
    }
  }, [taskRaw]);
    if (!isOpen) return null;
    if (!task) return null;
  if (!isOpen || !task) return null;
    function resetForm() {
        setTitle("");
        setDescription("");
        setStartTime("");
        setEndTime("");
        setDate("");
        setCompleted(false);
        setAllDay(false);
        setTags([]);
        setEditTaskId(null);
        setTask(task);

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
        completed: completed,
        event: false,
        tags: tags,
        start: startDate,
        end: endDate
    };

    try {
        if (editTaskId) {
        const taskRef = doc(db, "tasks", editTaskId);
            await updateDoc(taskRef, taskPayload);
        }
        else {
        await addDoc(collection(db, "tasks"), taskPayload);
        }
        resetForm();
    } catch (error) {
        console.error("Error saving task:", error);
        alert("Failed to save task.");
    }
    };

    function loadTaskIntoForm(task: Task) {
        setEditTaskId(task.id);
        setTitle(task.title);
        setTags(task.tags);
        setDescription(task.description);
        setDate(moment(task.start).format("YYYY-MM-DD"));
        setStartTime(moment(task.start).format("HH:mm"));
        setEndTime(moment(task.end).format("HH:mm"));
        setCompleted(task.completed);
        const isFullDay =
            moment(task.start).format("HH:mm") === "00:00" &&
            moment(task.end).format("HH:mm") === "23:59";

        setAllDay(isFullDay);
    }

    return (
            <div style={overlayStyle}>
                <div style={modalStyle}>
                    <div style={rowStyle}>
                        <button style={exitButtonStyle} onClick={onClose}>
                            ×
                        </button>
                        <h2 style={{ flexGrow: 1, textAlign: "center", margin: 0 }}>
                            Add To Calendar
                        </h2>
                        <button
                            type="submit"
                            form="calendarForm"
                            style={submitButtonStyle}
                        >
                            ✅
                        </button>
                    </div>

                    <form
                        id="calendarForm"
                        onSubmit={handleSubmit}
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
                                style={{ flexGrow: 1, padding: "8px" }}
                            />
                        </div>
    
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
                            <input
                                type="text"
                                placeholder="Description (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    marginLeft: "12px",
                                    flexBasis: "200px",
                                    padding: "8px"
                                }}
                            />
                        </div>
    
                        {!allDay && (
                            <div style={rowStyle}>
                                <div>
                                    <label>Start:</label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        style={{ marginLeft: "4px" }}
                                    />
                                </div>
                                <div style={{ marginLeft: "16px" }}>
                                    <label>End:</label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        style={{ marginLeft: "4px" }}
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
                        <div
                                style={{
                                    marginLeft: "16px",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={completed}
                                    onChange={(e) => setCompleted(e.target.checked)}
                                />
                                <span style={{ marginLeft: "4px" }}>Completed</span>
                            </div>
                    </form>
    
                    <hr />
    
                                <div
                                    key={task.id}
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        padding: "12px",
                                        marginBottom: "10px"
                                    }}
                                >
                                    <div>ID: {task.id}</div>
                                    <div>Title: {task.title}</div>
                                    <div>
                                        Start: {moment(task.start).format("M/D/YYYY h:mm A")}
                                    </div>
                                    <div>
                                        End: {moment(task.end).format("M/D/YYYY h:mm A")}
                                    </div>
                                    <div>
                                        Tags:{" "}
                                        {task.tags
                                            ? task.tags
                                            .map((tag) => 
                                                tagOptions.find((option) => (tag === option.id))?.name)
                                            .filter(Boolean)
                                            .join(", ")
                                            : "None"}
                                    </div>
    
                                    <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                        <button
                                            onClick={() =>
                                                loadTaskIntoForm(task)
                                            }
                                        >
                                            Edit
                                        </button>
                                        
                                        <button
                                        onClick={async () => {
                                            try {
                                            await deleteDoc(doc(db, "tasks", task.id));
    
                                            if (editTaskId === task.id) {
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
                    </div>
                </div>
            
        );
    };
    
export default Popup;
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
    flexWrap: "wrap"
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