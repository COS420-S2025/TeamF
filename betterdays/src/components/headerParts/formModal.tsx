import React, { useState } from 'react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const [group1Selected, setGroup1Selected] = useState<string | null>(null);
  const [group2Selected, setGroup2Selected] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [allDay, setAllDay] = useState(false);

  if (!isOpen) return null;

  const group1Options = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];
  const group2Options = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      startTime,
      endTime,
      date,
      allDay,
      group1Selected,
      group2Selected,
    });
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Row 1: Header + Exit + Submit */}
        <div style={rowStyle}>
          <button style={exitButtonStyle} onClick={onClose}>
            ×
          </button>
          <h2 style={{ flexGrow: 1, textAlign: 'center', margin: 0 }}>Add To Calendar</h2>
          <button type="submit" form="calendarForm" style={submitButtonStyle}>
            ✅
          </button>
        </div>

        <form id="calendarForm" onSubmit={handleSubmit} style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Row 2: Title */}
          <div style={rowStyle}>
            <label style={{ width: '100px' }}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ flexGrow: 1, padding: '8px' }}
            />
          </div>

          {/* Row 3: Radio Group 1 + Description */}
          <div style={rowStyle}>
            <div style={{ flexGrow: 1 }}>
              <label>Radio Group 1:</label>
              <div style={scrollRowStyle}>
                {group1Options.map((opt) => (
                  <div
                    key={opt}
                    style={{
                      ...chipStyle,
                      backgroundColor: group1Selected === opt ? '#4CAF50' : '#E0E0E0',
                      color: group1Selected === opt ? '#fff' : '#000',
                    }}
                    onClick={() => setGroup1Selected(opt)}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
            <input type="text" placeholder="Description (optional)" style={{ marginLeft: '12px', flexBasis: '200px', padding: '8px' }} />
          </div>

          {/* Row 4: Start / End time */}
          <div style={rowStyle}>
            <div>
              <label>Start:</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ marginLeft: '4px' }} />
            </div>
            <div style={{ marginLeft: '16px' }}>
              <label>End:</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{ marginLeft: '4px' }} />
            </div>
          </div>

          {/* Row 5: Radio Group 2 */}
          <div style={rowStyle}>
            <label>Radio Group 2:</label>
            <div style={scrollRowStyle}>
              {group2Options.map((opt) => (
                <div
                  key={opt}
                  style={{
                    ...chipStyle,
                    backgroundColor: group2Selected === opt ? '#4CAF50' : '#E0E0E0',
                    color: group2Selected === opt ? '#fff' : '#000',
                  }}
                  onClick={() => setGroup2Selected(opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {/* Row 6: Date + All Day */}
          <div style={rowStyle}>
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginLeft: '4px' }} />
            <div style={{ marginLeft: '16px', display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
              <span style={{ marginLeft: '4px' }}>All Day</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;

// ------------------------ Styles ------------------------
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100vw',
  height: '80vh',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: '100vw',
  height: '80vh',
  backgroundColor: '#fff',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  position: 'relative',
  padding: '16px',
  overflowY: 'auto',
};

const exitButtonStyle: React.CSSProperties = {
  fontSize: '24px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};

const submitButtonStyle: React.CSSProperties = {
  fontSize: '24px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
};

const scrollRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  overflowX: 'auto',
  paddingTop: '8px',
  paddingBottom: '8px',
};

const chipStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '16px',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  userSelect: 'none',
  flexShrink: 0,
};