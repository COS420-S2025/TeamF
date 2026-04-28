import React, { useEffect, useState } from "react";
import { Task } from "../../../utils/props/Objects";
import { useTasks } from "../../../services/databaseManager";
import { isSameDay } from "../../../services/dateVerify";
interface MonthProps {
  date: Date;
  openModal : (task:Task)=>void;
}

export const MonthDay: React.FC<MonthProps> = ({date, openModal}) => {
  const currentTime = new Date();
  const [active, setActive] = useState<Task| null>(null);
  const [popup, setPopup] = useState(false);
  const {tasks, refreshTasks } = useTasks();

  useEffect(() => {
    refreshTasks()
  }, [refreshTasks]);

  function generateCalendarDays() {
    //const today = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

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
  };
  
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

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
        const colors = ["#ffffff","#8082ff", "#4c2dff", "#2e2372"]
        const dayTasks = day
          ? tasks.filter((task) => isSameDay(new Date(task.start), day))
          : [];
        const numComplete = dayTasks.filter((task) => task.completed === 1).length;
        const colorIndex = Math.min(numComplete, colors.length - 1);

        return (
          <div
            key={index}
            style={{
              height: "16vh",
              border: "1px solid #ccc",
              position: "relative",
              backgroundColor: colors[colorIndex],
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
                        
                        marginBottom: "2px",
                        padding: "2px 4px",
                        borderRadius: "4px",
                      }}
                      onClick={() => {
                        openModal(task);
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
    {/*<Popup isOpen={popup} onClose={() => setPopup(false)} taskRaw={active} />*/}
    </>
  );
};

export default MonthDay;