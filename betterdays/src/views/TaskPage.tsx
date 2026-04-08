import React, { useState } from "react";
import { Task } from "../utils/props/Objects";



function SampleTask(): React.JSX.Element {
    //Tom's contribution. This is not fully integrated with how tasks
    //work as we were having issues with having the task object move to event and 
    //the calendar. That said, this 'sampletask' is a function that has 
    //default string and when the checkbox is clicked, it will switch
    //between three states based on status.
    // 0 = incomplete, 1 = complete, 2 = failed

    //at present there is a display for status. This will be eliminated once
    //we have task integration

    //Since this is a later addition and we didn't have the integration, the status
    //just exists on task page but in the future it will be part of the
    // src/utils/props/Objects.ts to save into the object itself. 
    // However we don't want to break anything with backend data saving on this
    //deliverable
    const [status, setStatus] = useState<number>(0);

    function cycleBox(): void {
        setStatus((prev: number) => (prev + 1) % 3);
    }

    function getBoxSymbol(): string {
        //uses 
        if (status === 0) {
            return "☐";
        }
        if (status === 1) {
            return "☑";
        }
        //really this is status 2, but it's in even things go wrong
        return "☒";
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "16px"
            }}
        >
            <button
                //this is the button that changes
                //the checkbox when clicked
                onClick={cycleBox}
                style={{
                    fontSize: "28px",
                    border: "none",
                    background: "none",
                    cursor: "pointer"
                }}
                //we will eliminate this. It's to just display state at moment
                //for next deliverable this will instead be saved to object and
                //not displayed to the viewer
                aria-label="Cycle task checkbox state"
            >
                {getBoxSymbol()}
            </button>

            <span>Tom&apos;s coding contribution</span>

            <span style={{ marginLeft: "auto", fontSize: "12px", color: "#666" }}>
                status: {status}
            </span>
        </div>
    );
}

export default function TaskPage({ tasks }: { tasks: Task[] }): React.JSX.Element {
    console.log("Does this run?");
    return (
        <div>
            <h1>Tasks</h1>
            <SampleTask />
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{JSON.stringify(task)}</li>
                ))}
            </ul>
        </div>
    );
}
