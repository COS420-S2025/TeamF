import React, { useEffect, useState } from "react";
import { Task } from "../../../utils/props/Objects";
import { fetchTasks } from "../../../services/taskService";
import { isSameDay } from "../../../services/dateVerify";
import Popup from '../Popup';

export const MonthDay: React.FC = () => {
  const [list, setList] = useState<Task[]>([]);
  const [active, setActive] = useState<Task| null>(null);

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    fetchTasks().then(setList);
  }, []);
  function generateCalendarDays() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    while (days.length < 35) {
      days.push(null);
    }

    return days;
  }

  const days = generateCalendarDays();

  return (
    <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 0,
        height: "80vh",
        width: "100%",
        position: "relative",
      }}
    >
      {days.map((day, index) => {
        const dayTasks = day
          ? list.filter((task) => isSameDay(new Date(task.start), day))
          : [];

        return (
          <div
            key={index}
            style={{
              height: "16vh",
              border: "1px solid #ccc",
              position: "relative",
              backgroundColor: day ? "#fff" : "#f9f9f9",
              overflow: "hidden",
              
            }}
          >
            {day && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    left: "4px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                    
                  }}
                >
                  {day.getDate()}
                </div>

                <div style={{ marginTop: "24px", padding: "4px" }}>
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      style={{
                        fontSize: "12px",
                        background: "#e3f2fd",
                        marginBottom: "2px",
                        padding: "2px 4px",
                        borderRadius: "4px",
                      }}
                      onClick={() => {
                        setActive(task)
                        setPopup(true)
                      }}

                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
    <Popup isOpen={popup} onClose={() => setPopup(false)} taskRaw={active} />
    </>
  );
};

export default MonthDay;