import { filters } from "../utils/Filters";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useTasks } from "../services/databaseManager";
import {getTextColor} from "../utils/ColorContrast"

const FilterPage: React.FC = () => {
    const {tagOptions} = useTasks();
    // const [tags, setTags] = useState<string[]>([]); // tags the user picked

    const { filterByStart, filterByEnd, filterByTag} = filters();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startEnabled, setStartEnabled] = useState(() => {
        const saved = localStorage.getItem("startEnabled");
        return saved === "true";
    });
    const [endEnabled, setEndEnabled] = useState(() => {
        const saved = localStorage.getItem("endEnabled");
        return saved === "true";
    });
    const [tags, setTags] = useState<string[]>(() => {
        const saved = localStorage.getItem("tags");
        return saved ? JSON.parse(saved) : [];
    });

useEffect(() => {
  localStorage.setItem("tags", JSON.stringify(tags));
}, [tags]);    
    function toggleTag(tagToDeleteOrAdd: string){
        const idTag = tags.find((x) => (tagToDeleteOrAdd === x)); // is it already in the array?
        idTag ? setTags((prev) => prev.filter((tag) => tag !== tagToDeleteOrAdd)) // if yes remove it
        : setTags([...tags,tagToDeleteOrAdd]); // if no add it
    }
    useEffect(() => {
        localStorage.setItem("startEnabled", String(startEnabled));
        }, [startEnabled]);
    useEffect(() => {
        localStorage.setItem("endEnabled", String(endEnabled));
        }, [endEnabled]);
    return(
    <div>
        <div style={rowStyle}>
            <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ marginLeft: "4px" }}
                />
                <input
                    type="checkbox"
                    checked={startEnabled}
                    onChange={(e) => {
                        const isChecked = e.target.checked;
                        setStartEnabled(isChecked);

                        if (isChecked) {
                        filterByStart(1, moment(startDate, "YYYY-MM-DD").startOf("day").toDate());
                        } else {
                        filterByStart(-1, moment(startDate, "YYYY-MM-DD").startOf("day").toDate());
                        }
                    }}
                />
            <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ marginLeft: "4px" }}
                />
                <input
                    type="checkbox"
                    checked={endEnabled}
                    onChange={(e) => {
                        const isChecked = e.target.checked;
                        setEndEnabled(isChecked);

                        if (isChecked) {
                        filterByEnd(1, moment(endDate, "YYYY-MM-DD").startOf("day").toDate());
                        } else {
                        filterByEnd(-1, moment(endDate, "YYYY-MM-DD").startOf("day").toDate());
                        }
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
                                                        onClick={() => {
                                                            toggleTag(opt.id)
                                                            filterByTag((tags.find((x) => (opt.id === x))
                                                                    ? -1
                                                                    : 1),opt.id)
                                                        }}
                                                    >
                                                        {opt.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                    </div>
                
                <div>
                    {/* {startDate} */}
                    {startEnabled ? "start enabled" : "start no enabled"}
                    {/* {endEnabled} */}

                </div>
        </div>
    </div>
    );
};
export default FilterPage;
const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    flexDirection: "row"
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