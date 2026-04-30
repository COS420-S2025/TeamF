import React, { useEffect, useState } from "react";
import { useTasks } from "../services/databaseManager";
import { getTextColor } from "../utils/ColorContrast";
import { Task } from "../utils/props/Objects";

const FILTER_START_DATE_KEY = "filterStartDate";
const FILTER_END_DATE_KEY = "filterEndDate";
const FILTER_START_ENABLED_KEY = "filterStartEnabled";
const FILTER_END_ENABLED_KEY = "filterEndEnabled";
const FILTER_SELECTED_TAGS_KEY = "filterSelectedTags";

const FilterPage: React.FC = () => {
    // Gets tasks, tag options, and save/refresh functions from the database manager.
    const { tasks, tagOptions, saveTask, refreshTasks } = useTasks();

    // Stores the date values picked by the user on the filter page.
    const [startDate, setStartDate] = useState(() => {
        return localStorage.getItem(FILTER_START_DATE_KEY) || "";
    });

    const [endDate, setEndDate] = useState(() => {
        return localStorage.getItem(FILTER_END_DATE_KEY) || "";
    });

    // Remembers whether the start date and end date filters are turned on.
    const [startEnabled, setStartEnabled] = useState(() => {
        return localStorage.getItem(FILTER_START_ENABLED_KEY) === "true";
    });

    const [endEnabled, setEndEnabled] = useState(() => {
        return localStorage.getItem(FILTER_END_ENABLED_KEY) === "true";
    });

    // Remembers which tags the user selected for filtering.
    const [selectedTags, setSelectedTags] = useState<string[]>(() => {
        const savedTags = localStorage.getItem(FILTER_SELECTED_TAGS_KEY);
        return savedTags ? JSON.parse(savedTags) : [];
    });

    // Shows a simple message after applying or clearing the filter.
    const [statusMessage, setStatusMessage] = useState("");

    // Loads the current task list when the filter page opens.
    useEffect(() => {
        refreshTasks();
    }, [refreshTasks]);

    // Saves the start date value when it changes.
    useEffect(() => {
        localStorage.setItem(FILTER_START_DATE_KEY, startDate);
    }, [startDate]);

    // Saves the end date value when it changes.
    useEffect(() => {
        localStorage.setItem(FILTER_END_DATE_KEY, endDate);
    }, [endDate]);

    // Saves whether the start date filter is enabled.
    useEffect(() => {
        localStorage.setItem(FILTER_START_ENABLED_KEY, String(startEnabled));
    }, [startEnabled]);

    // Saves whether the end date filter is enabled.
    useEffect(() => {
        localStorage.setItem(FILTER_END_ENABLED_KEY, String(endEnabled));
    }, [endEnabled]);

    // Saves selected tags so the filter page remembers them after navigation.
    useEffect(() => {
        localStorage.setItem(FILTER_SELECTED_TAGS_KEY, JSON.stringify(selectedTags));
    }, [selectedTags]);

    // Adds a tag to the selected tag list, or removes it if it was already selected.
    function toggleTag(tagId: string) {
        setSelectedTags((currentTags) =>
            currentTags.includes(tagId)
                ? currentTags.filter((tag) => tag !== tagId)
                : [...currentTags, tagId]
        );
    }

    // Converts different possible date formats into a regular JavaScript Date.
    function getTaskDate(dateValue: any): Date | null {
        if (!dateValue) {
            return null;
        }

        if (dateValue instanceof Date) {
            return dateValue;
        }

        if (typeof dateValue.toDate === "function") {
            return dateValue.toDate();
        }

        const convertedDate = new Date(dateValue);

        if (isNaN(convertedDate.getTime())) {
            return null;
        }

        return convertedDate;
    }

    // Converts a Date into the same YYYY-MM-DD format used by the date input.
    function getDateInputString(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    // Checks whether a task date matches the date selected in the filter.
    function dateMatches(taskDateValue: any, selectedDate: string) {
        const taskDate = getTaskDate(taskDateValue);

        if (!taskDate) {
            return false;
        }

        return getDateInputString(taskDate) === selectedDate;
    }

    // Checks whether a task matches all currently selected filters.
    function taskMatchesSelectedFilters(task: Task) {
        const matchesStartDate =
            !startEnabled || !startDate || dateMatches(task.start, startDate);

        const matchesEndDate =
            !endEnabled || !endDate || dateMatches(task.end, endDate);

        const matchesSelectedTags =
            selectedTags.length === 0 ||
            selectedTags.every((tagId) => task.tags.includes(tagId));

        return matchesStartDate && matchesEndDate && matchesSelectedTags;
    }

    // Applies the selected filters by changing filterNum.
    // Matching tasks get filterNum 0 and stay blue.
    // Non-matching tasks get filterNum 1 and turn pink.
    async function applyFilter() {
        await Promise.all(
            tasks.map((task) => {
                const matchesFilter = taskMatchesSelectedFilters(task);

                return saveTask(task.id, {
                    ...task,
                    filterNum: matchesFilter ? 0 : 1,
                });
            })
        );

        await refreshTasks();
        setStatusMessage("Filter applied.");
    }

    // Clears all filter controls and resets every task to the normal blue display state.
    async function clearFilter() {
        setStartDate("");
        setEndDate("");
        setStartEnabled(false);
        setEndEnabled(false);
        setSelectedTags([]);

        localStorage.removeItem(FILTER_START_DATE_KEY);
        localStorage.removeItem(FILTER_END_DATE_KEY);
        localStorage.removeItem(FILTER_START_ENABLED_KEY);
        localStorage.removeItem(FILTER_END_ENABLED_KEY);
        localStorage.removeItem(FILTER_SELECTED_TAGS_KEY);

        await Promise.all(
            tasks.map((task) =>
                saveTask(task.id, {
                    ...task,
                    filterNum: 0,
                })
            )
        );

        await refreshTasks();
        setStatusMessage("Filter cleared.");
    }

    return (
        <div style={pageStyle}>
            <div style={filterCardStyle}>
                {/* Page title. */}
                <h1 style={titleStyle}>Filters</h1>

                {/* Date filter section. */}
                <section style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>Date</h2>

                    <div style={dateRowStyle}>
                        <label style={dateLabelStyle}>Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={dateInputStyle}
                        />
                        <input
                            type="checkbox"
                            checked={startEnabled}
                            onChange={(e) => setStartEnabled(e.target.checked)}
                            style={checkboxStyle}
                        />
                    </div>

                    <div style={dateRowStyle}>
                        <label style={dateLabelStyle}>End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={dateInputStyle}
                        />
                        <input
                            type="checkbox"
                            checked={endEnabled}
                            onChange={(e) => setEndEnabled(e.target.checked)}
                            style={checkboxStyle}
                        />
                    </div>
                </section>

                {/* Tag filter section. */}
                <section style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>Tags</h2>

                    <div style={tagGridStyle}>
                        {tagOptions.map((tag) => {
                            const isSelected = selectedTags.includes(tag.id);

                            return (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() => toggleTag(tag.id)}
                                    style={{
                                        ...tagChipStyle,
                                        backgroundColor: isSelected ? tag.color : "#E0E0E0",
                                        color: isSelected ? getTextColor(tag.color) : "#000000",
                                        border: isSelected
                                            ? "2px solid #222222"
                                            : "1px solid #BDBDBD",
                                    }}
                                >
                                    {tag.name}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Action buttons. */}
                <section style={buttonRowStyle}>
                    <button
                        type="button"
                        onClick={applyFilter}
                        style={applyButtonStyle}
                    >
                        Apply Filter
                    </button>

                    <button
                        type="button"
                        onClick={clearFilter}
                        style={clearButtonStyle}
                    >
                        Clear Filter
                    </button>
                </section>

                {/* Status message after applying or clearing. */}
                {statusMessage && (
                    <p style={statusTextStyle}>{statusMessage}</p>
                )}
            </div>
        </div>
    );
};

export default FilterPage;

// Main page layout.
const pageStyle: React.CSSProperties = {
    minHeight: "calc(100vh - 70px)",
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 16px",
};

// Card-style filter container.
const filterCardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "420px",
    border: "2px solid #222222",
    borderRadius: "16px",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
};

// Main filter page title.
const titleStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px 0",
};

// Individual filter section layout.
const sectionStyle: React.CSSProperties = {
    marginBottom: "24px",
};

// Section heading style.
const sectionTitleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 12px 0",
};

// Row layout for date inputs.
const dateRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "90px 1fr 28px",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
};

// Label style for date rows.
const dateLabelStyle: React.CSSProperties = {
    fontSize: "16px",
};

// Date input style.
const dateInputStyle: React.CSSProperties = {
    width: "100%",
    fontSize: "16px",
    padding: "8px",
    border: "1px solid #999999",
    borderRadius: "8px",
    boxSizing: "border-box",
};

// Checkbox style for enabling date filters.
const checkboxStyle: React.CSSProperties = {
    width: "20px",
    height: "20px",
};

// Wraps tag chips into multiple rows.
const tagGridStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
};

// Basic tag chip style.
const tagChipStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: "16px",
    fontSize: "16px",
    cursor: "pointer",
    whiteSpace: "nowrap",
};

// Layout for Apply and Clear buttons.
const buttonRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginTop: "8px",
};

// Apply button style.
const applyButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "2px solid #222222",
    backgroundColor: "#DCEBFF",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
};

// Clear button style.
const clearButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "2px solid #222222",
    backgroundColor: "#F2F2F2",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
};

// Small message after applying or clearing filters.
const statusTextStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "16px",
    fontSize: "14px",
    color: "#444444",
};