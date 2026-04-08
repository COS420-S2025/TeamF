import React from "react";
import { Task } from "../utils/props/Objects";

export default function TaskPage({tasks}: {tasks: Task[]}): React.JSX.Element {
    console.log("Does this run?");
    return (<div><h1>Tasks</h1>
        <ul>{tasks.map(
            (task)=><li key={task.id}>{JSON.stringify(task)}
            </li>)}
        </ul>
    </div>);
}