import React, { useState } from "react";
import { type Tag, type Task } from './props/Objects';
import {importJSON,exportJSON} from './ImportExport';
import moment from "moment";
let field = "name"

export default function Crud() {
  const [list, setList] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const [startDate, setStart] = useState<Date>(moment("2026-01-01").toDate());
  const [endDate, setEnd] = useState<Date>(moment("2026-01-01").toDate());
  const [editIndex, setEditIndex] = useState<number | null>(null); // which item you are editing
  function isValidDate(str: string) {
    const d = new Date(str);
    return !isNaN(d.getTime());
  }
  function handleAddOrUpdate(field:String) {

    const value = text.toString().trim(); // trimmed input
    const newTask = {
      id: crypto.randomUUID(),
      title: "", //name
      state: undefined, //we need to make this change if it's a todotask
      subtask: false, //is it a subtask?
      tags: null, // what tags does it have
      tasks:  null, // what subtasks does it have
      start: startDate, //start date
      end: endDate //end date //we should change to undefined
};
//EDIT
    if (!value) return; // ignore empty field

    if (editIndex !== null) {
      setList(list.map((item, i) => (i === editIndex ? {
          ...item,
          title: field === "name" ? text.trim() : item.title, // if field = name: text.trim, else return
          start: field === "start" ? isValidDate(text) ? new Date(text) : (alert("Invalid start date"), item.start) : item.start, // if field = start: validate input as a valid date, if invalid play an alert, else return
          end: field === "end" ? isValidDate(text) ? new Date(text) : (alert("Invalid end date"), item.end) : item.end, // if field = end: validate input as a valid date, if invalid play an alert, else return
        } : item))); 

      setEditIndex(null);
      setText("");

      //reset when done
      return;
    }
    //if the object is not nothing , set the item to your new item

//CREATE    
    newTask.title = value;
    setList([...list, newTask]);
    setText("");
  }

  return (
    <div>
      <button onClick={() => exportJSON(list)}>Export JSON</button>
      <input type="file" accept=".json" onChange={(e) => importJSON(e, setList)} />
      <input value={text} placeholder="type here" onChange={(e) => setText(e.target.value)} /> {/* blank input box for the name */}
      <button onClick={() => handleAddOrUpdate(field)}> 
        {editIndex !== null ? "Update" : "Add"} {/* when button is clicked, if editIndex? button says Update, if not editIndex button says Add */}
      </button>

      {list.map((item, i) => ( 
        <div key={i}>
          <div>
              ID: {item.id} <br />
              Name: {item.title} <br />
              Start date: {item.start.toLocaleDateString()}<br />
              End date: {item.end.toLocaleDateString()}
          </div>{" "} {/* for i in list, display id, name, start, end */}


          <button
            onClick={() => {
              setText(item.title);  
              setEditIndex(i);
              field = "name";
            }} 

          >
            Edit name
          </button>{" "}{/* still in the for loop, if edit button clicked, set the editIndex to the item, and set the text to the item's text */}
          <button
            onClick={() => {
              setText(item.start.toLocaleDateString());  
              setEditIndex(i);
              field = "start";
            }} 

          >
            Edit start date
          </button>{" "}{/* still in the for loop, if edit button clicked, set the editIndex to the item, and set the text to the item's text */}
          <button
            onClick={() => {
              setText(item.end.toLocaleDateString());  
              setEditIndex(i);
              field = "end";
            }} 

          >
            Edit end date
          </button>{" "}{/* still in the for loop, if edit button clicked, set the editIndex to the item, and set the text to the item's text */}
          <button
            onClick={() => {
              setList(list.filter((_, index) => index !== i));
              console.log(i)
              if (editIndex === i) {
                setEditIndex(null);
                setText("");
              }
            }}
          >
            Delete
          </button> {/* still in the for loop, if delete button is clicked, filter out the item, if the editIndex is pointing to the item, failsafe */}
        </div>
        
      ))}
    </div>
  );
}