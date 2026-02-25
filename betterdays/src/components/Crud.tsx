import React, { useState } from "react";

export default function Crud() {
  const [list, setList] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  function handleAddOrUpdate() {
    const value = text.trim();
    if (!value) return;

    //update
    if (editIndex !== null) {
      setList(list.map((item, i) => (i === editIndex ? value : item)));
      setEditIndex(null);
      setText("");
      return;
    }

    //craete
    setList([...list, value]);
    setText("");
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />

      <button onClick={handleAddOrUpdate}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      {list.map((item, i) => (
        <div key={i}>
          {item}{" "}

          <button
            onClick={() => {
              setText(item);  
              setEditIndex(i);
            }}
          >
            Edit
          </button>{" "}

          <button
            onClick={() => {
              setList(list.filter((_, index) => index !== i));
              if (editIndex === i) {
                setEditIndex(null);
                setText("");
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}