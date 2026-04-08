import React, { useState } from "react";
import moment from "moment";
import { importJSON, exportJSON } from "../../utils/ImportExport";
import { Task,Tag } from '../../utils/props/Objects';


interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type EditField = "all" | "name" | "start" | "end" | null;

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
    const [list, setList] = useState<Task[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editField, setEditField] = useState<EditField>(null);

    const [group1Selected, setGroup1Selected] = useState<string | null>(null);
    const [group2Selected, setGroup2Selected] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");
    const [allDay, setAllDay] = useState(false);

    if (!isOpen) return null;

    const group1Options = [
        "Option A",
        "Option B",
        "Option C",
        "Option D",
        "Option E"
    ];
    const group2Options = [
        "Choice 1",
        "Choice 2",
        "Choice 3",
        "Choice 4",
        "Choice 5"
    ];

    function resetForm() {
        setTitle("");
        setDescription("");
        setStartTime("");
        setEndTime("");
        setDate("");
        setAllDay(false);
        setGroup1Selected(null);
        setGroup2Selected(null);
        setEditIndex(null);
        setEditField(null);
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

    function buildTags(): Tag[] | null {
        const tags: Tag[] = [];

        if (group1Selected) {
            tags.push({ id: 1, name: group1Selected });
        }
        if (group2Selected) {
            tags.push({ id: 2, name: group2Selected });
        }
        if (description.trim()) {
            tags.push({ id: 3, name: description.trim() });
        }

        return tags.length > 0 ? tags : null;
    }

    const handleSubmit = (e: React.FormEvent) => {
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

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: title.trim(),
            subtask: false,
            tags: buildTags(),
            tasks: null,
            start: startDate,
            end: endDate
        };

        if (editIndex !== null) {
            setList(
                list.map((item, i) => {
                    if (i !== editIndex) return item;

                    if (editField === "name") {
                        return {
                            ...item,
                            title: title.trim()
                        };
                    }

                    if (editField === "start") {
                        return {
                            ...item,
                            start: startDate
                        };
                    }

                    if (editField === "end") {
                        return {
                            ...item,
                            end: endDate
                        };
                    }

                    return {
                        ...item,
                        title: title.trim(),
                        tags: buildTags(),
                        start: startDate,
                        end: endDate
                    };
                })
            );
        } else {
            setList([...list, newTask]);
        }

        resetForm();
    };

    function loadTaskIntoForm(item: Task, index: number, field: EditField) {
        setEditIndex(index);
        setEditField(field);

        setTitle(item.title);

        const tag1 = item.tags?.find((tag) => tag.id === 1)?.name ?? null;
        const tag2 = item.tags?.find((tag) => tag.id === 2)?.name ?? null;
        const desc = item.tags?.find((tag) => tag.id === 3)?.name ?? "";

        setGroup1Selected(tag1);
        setGroup2Selected(tag2);
        setDescription(desc);

        setDate(moment(item.start).format("YYYY-MM-DD"));
        setStartTime(moment(item.start).format("HH:mm"));
        setEndTime(moment(item.end).format("HH:mm"));

        const isFullDay =
            moment(item.start).format("HH:mm") === "00:00" &&
            moment(item.end).format("HH:mm") === "23:59";

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

                <div style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
                    <button onClick={() => exportJSON(list)}>Export JSON</button>
                    <input
                        type="file"
                        accept=".json"
                        onChange={(e) => importJSON(e, setList)}
                    />
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
                            <label>Radio Group 1:</label>
                            <div style={scrollRowStyle}>
                                {group1Options.map((opt) => (
                                    <div
                                        key={opt}
                                        style={{
                                            ...chipStyle,
                                            backgroundColor:
                                                group1Selected === opt
                                                    ? "#4CAF50"
                                                    : "#E0E0E0",
                                            color:
                                                group1Selected === opt
                                                    ? "#fff"
                                                    : "#000"
                                        }}
                                        onClick={() => setGroup1Selected(opt)}
                                    >
                                        {opt}
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
                        <label>Radio Group 2:</label>
                        <div style={scrollRowStyle}>
                            {group2Options.map((opt) => (
                                <div
                                    key={opt}
                                    style={{
                                        ...chipStyle,
                                        backgroundColor:
                                            group2Selected === opt
                                                ? "#4CAF50"
                                                : "#E0E0E0",
                                        color:
                                            group2Selected === opt
                                                ? "#fff"
                                                : "#000"
                                    }}
                                    onClick={() => setGroup2Selected(opt)}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    </div>

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

                <hr />

                <div>
                    <h3>Saved Tasks</h3>
                    {list.length === 0 ? (
                        <p>No tasks yet.</p>
                    ) : (
                        list.map((item, i) => (
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
                                        ? item.tags.map((tag) => tag.name).join(", ")
                                        : "None"}
                                </div>

                                <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    <button
                                        onClick={() =>
                                            loadTaskIntoForm(item, i, "all")
                                        }
                                    >
                                        Edit All
                                    </button>

                                    <button
                                        onClick={() =>
                                            loadTaskIntoForm(item, i, "name")
                                        }
                                    >
                                        Edit Name
                                    </button>

                                    <button
                                        onClick={() =>
                                            loadTaskIntoForm(item, i, "start")
                                        }
                                    >
                                        Edit Start
                                    </button>

                                    <button
                                        onClick={() =>
                                            loadTaskIntoForm(item, i, "end")
                                        }
                                    >
                                        Edit End
                                    </button>

                                    <button
                                        onClick={() => {
                                            setList(
                                                list.filter((_, index) => index !== i)
                                            );
                                            if (editIndex === i) {
                                                resetForm();
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
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