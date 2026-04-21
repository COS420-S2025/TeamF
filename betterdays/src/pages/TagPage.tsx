import React, { useState } from 'react';
import {Tag} from "../utils/props/Objects";
import { useTags } from "../services/databaseManager";

const AddTags: React.FC = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [editTagId, setEditTagId] = useState<string | null>(null);
  const {tags, saveTag, removeTag,} = useTags();
  function resetForm() {
      setName("");
      setColor("");
      setEditTagId(null);
    }
    function loadTagIntoForm(item: Tag) {
        setEditTagId(item.id);
        setName(item.name);
        setColor(item.color);
    }
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name.trim()) return;
  if (!color) {
      alert("Please choose a color.");
      return;
  }
  const tagPayload = {
      name: name.trim(),
      color: color.trim(),
  };
    saveTag(editTagId, tagPayload);
  };
  
return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <div style={rowStyle}>
                    <h2 style={{ flexGrow: 1, textAlign: "center", margin: 0 }}>
                        Add Tags
                    </h2>
                    <button
                        type="submit"
                        form="tagForm"
                        style={submitButtonStyle}
                    >
                        ✅
                    </button>
                </div>

                <form
                    id="tagForm"
                    onSubmit={handleSubmit}
                    style={{
                        padding: "8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}
                >
                    <div style={rowStyle}>
                        <label style={{ width: "100px" }}>Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ flexGrow: 1, padding: "8px" }}
                        />
                    </div>
                    <div style={rowStyle}>
                        <label style={{ width: "100px" }}>Color *</label>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                            style={{ flexGrow: 1, padding: "8px" }}
                        />
                    </div>
                </form>

                <hr />

                <div>
                    <h3>Saved Tags</h3>
                    {tags.length === 0 ? (
                        <p>No tags yet.</p>
                    ) : (
                        tags.map((item, i) => (
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
                                <div>Name: {item.name}</div>
                                <div>Color: {item.color}</div>
                                <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    <button
                                        onClick={() =>
                                            loadTagIntoForm(item)
                                        }
                                    >
                                        Edit
                                    </button>
                                    
                                    <button
                                    onClick={async () => {
                                        try {
                                        removeTag(item.id)

                                        if (editTagId === item.id) {
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
                </div>
            </div>
        </div>
    );
};

export default AddTags;

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "90vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    zIndex: 1000
};

const modalStyle: React.CSSProperties = {
    width: "100vw",
    height: "90vh",
    backgroundColor: "#fff",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    position: "relative",
    padding: "16px",
    overflowY: "auto"
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