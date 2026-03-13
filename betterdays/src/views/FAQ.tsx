import React, { useState } from "react";

const ExampleView = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>FAQ</h1>

      {/* Action Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => console.log("Save clicked")}>
          Save
        </button>

        <button onClick={() => console.log("Refresh clicked")}>
          Refresh
        </button>

        <button onClick={() => console.log("Delete clicked")}>
          Delete
        </button>
      </div>

      {/* Accordion 1 */}
      <div>
        <button onClick={() => toggleSection("section1")}>
          General Info
        </button>

        {openSection === "section1" && (
          <div>
            <p>Project Name: Example Project</p>
            <p>Status: Active</p>
          </div>
        )}
      </div>

      {/* Accordion 2 */}
      <div>
        <button onClick={() => toggleSection("section2")}>
          Details
        </button>

        {openSection === "section2" && (
          <div>
            <p>Description: Example details go here.</p>
          </div>
        )}
      </div>

      {/* Accordion 3 */}
      <div>
        <button onClick={() => toggleSection("section3")}>
          Metadata
        </button>

        {openSection === "section3" && (
          <div>
            <p>Created By: System</p>
            <p>Last Updated: Today</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ExampleView;

