import React, { useState } from 'react';
import { Tag } from "../utils/props/Objects";
import { useTags } from "../services/databaseManager";
import checkButton from '../assets/icons/CheckSquare.png';
import { getTextColor } from "../utils/ColorContrast";

const AddTags: React.FC = () => {
    // Form state for creating or editing a tag.
    const [name, setName] = useState("");
    const [color, setColor] = useState("#000000");
    const [editTagId, setEditTagId] = useState<string | null>(null);

    // Loads saved tags and database functions from the tag hook.
    const { tags, saveTag, removeTag } = useTags();

    // Clears the form after saving, cancelling, or deleting the tag being edited.
    function resetForm() {
        setName("");
        setColor("#000000");
        setEditTagId(null);
    }

    // Loads an existing tag into the form so it can be edited.
    function loadTagIntoForm(item: Tag) {
        setEditTagId(item.id);
        setName(item.name);
        setColor(item.color);
    }

    // Saves either a new tag or updates the tag currently being edited.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        if (!color) {
            alert("Please choose a color.");
            return;
        }

        const tagPayload = {
            name: name.trim(),
            color: color.trim(),
        };

        await saveTag(editTagId, tagPayload);
        resetForm();
    };

    return (
        <div style={pageStyle}>
            <div style={tagCardStyle}>
                {/* Page title and save button. */}
                <div style={headerRowStyle}>
                    <h1 style={titleStyle}>{editTagId ? "Edit Tag" : "Add Tag"}</h1>

                    <button
                        type="submit"
                        form="tagForm"
                        style={submitButtonStyle}
                        aria-label="Save tag"
                    >
                        <img
                            src={checkButton}
                            alt="Confirm"
                            width="36px"
                            height="36px"
                            style={{ display: 'block' }}
                        />
                    </button>
                </div>

                {/* Tag create/edit form. */}
                <form
                    id="tagForm"
                    onSubmit={handleSubmit}
                    style={formStyle}
                >
                    <label style={inputGroupStyle}>
                        <span style={labelStyle}>Name *</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={textInputStyle}
                        />
                    </label>

                    <label style={inputGroupStyle}>
                        <span style={labelStyle}>Color *</span>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                            style={colorInputStyle}
                        />
                    </label>

                    {/* Shows a quick preview of how the tag will look. */}
                    <div style={previewRowStyle}>
                        <span style={previewLabelStyle}>Preview:</span>
                        <span
                            style={{
                                ...previewChipStyle,
                                backgroundColor: color,
                                color: getTextColor(color),
                            }}
                        >
                            {name.trim() || "New Tag"}
                        </span>
                    </div>

                    {editTagId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            style={cancelEditButtonStyle}
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>

                {/* Saved tag list. */}
                <section style={savedSectionStyle}>
                    <h2 style={sectionTitleStyle}>Saved Tags</h2>

                    {tags.length === 0 ? (
                        <p style={emptyTextStyle}>No tags yet.</p>
                    ) : (
                        <div style={tagListStyle}>
                            {tags.map((item) => (
                                <div
                                    key={item.id}
                                    style={savedTagRowStyle}
                                >
                                    {/* Only show the tag name and color chip instead of the ID and hex text. */}
                                    <div style={savedTagLeftStyle}>
                                        <span
                                            style={{
                                                ...colorDotStyle,
                                                backgroundColor: item.color,
                                            }}
                                            aria-label={`${item.name} color`}
                                        />

                                        <span
                                            style={{
                                                ...savedTagChipStyle,
                                                backgroundColor: item.color,
                                                color: getTextColor(item.color),
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </div>

                                    <div style={buttonGroupStyle}>
                                        <button
                                            type="button"
                                            onClick={() => loadTagIntoForm(item)}
                                            style={smallButtonStyle}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    await removeTag(item.id);

                                                    if (editTagId === item.id) {
                                                        resetForm();
                                                    }
                                                } catch (error) {
                                                    console.error("Error deleting tag:", error);
                                                    alert("Failed to delete tag.");
                                                }
                                            }}
                                            style={deleteButtonStyle}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AddTags;

// Main page layout.
const pageStyle: React.CSSProperties = {
    minHeight: "calc(100vh - 70px)",
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 16px",
};

// Card-style tag container.
const tagCardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "520px",
    border: "2px solid #222222",
    borderRadius: "16px",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
};

// Header row containing the title and save button.
const headerRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "40px 1fr 40px",
    alignItems: "center",
    marginBottom: "20px",
};

// Main page title.
const titleStyle: React.CSSProperties = {
    gridColumn: "2",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    margin: 0,
};

// Save button using the existing check-square icon.
const submitButtonStyle: React.CSSProperties = {
    gridColumn: "3",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
};

// Form layout for name and color inputs.
const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "24px",
};

// Shared label/input layout.
const inputGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
};

// Input label style.
const labelStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "bold",
};

// Text input style.
const textInputStyle: React.CSSProperties = {
    width: "100%",
    fontSize: "16px",
    padding: "10px",
    border: "1px solid #999999",
    borderRadius: "8px",
    boxSizing: "border-box",
};

// Color input style.
const colorInputStyle: React.CSSProperties = {
    width: "100%",
    height: "44px",
    padding: "4px",
    border: "1px solid #999999",
    borderRadius: "8px",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
};

// Row showing the preview chip.
const previewRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
};

// Preview label style.
const previewLabelStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "bold",
};

// Preview chip style.
const previewChipStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: "16px",
    border: "1px solid #999999",
    fontSize: "16px",
    whiteSpace: "nowrap",
};

// Cancel button shown while editing an existing tag.
const cancelEditButtonStyle: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: "12px",
    border: "2px solid #222222",
    backgroundColor: "#F2F2F2",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
};

// Saved tags section.
const savedSectionStyle: React.CSSProperties = {
    borderTop: "1px solid #DDDDDD",
    paddingTop: "18px",
};

// Saved tags heading.
const sectionTitleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 12px 0",
};

// Text shown when no tags exist.
const emptyTextStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#555555",
};

// Vertical list of saved tags.
const tagListStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
};

// One saved tag row.
const savedTagRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    border: "1px solid #D0D0D0",
    borderRadius: "12px",
    padding: "12px",
    backgroundColor: "#FAFAFA",
};

// Left side of a saved tag row.
const savedTagLeftStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
};

// Small color circle showing the saved tag color.
const colorDotStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "1px solid #777777",
    flexShrink: 0,
};

// Saved tag name shown as a colored chip.
const savedTagChipStyle: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: "16px",
    border: "1px solid #999999",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "180px",
};

// Edit/delete button group.
const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
    flexShrink: 0,
};

// Small action button style.
const smallButtonStyle: React.CSSProperties = {
    padding: "8px 10px",
    borderRadius: "10px",
    border: "1px solid #888888",
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    cursor: "pointer",
};

// Delete button style.
const deleteButtonStyle: React.CSSProperties = {
    ...smallButtonStyle,
    backgroundColor: "#F7F7F7",
};