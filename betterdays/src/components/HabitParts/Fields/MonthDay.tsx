import React, { useEffect, useState } from "react";
import { Task } from "../../../utils/props/Objects";
import { useTasks } from "../../../services/databaseManager";
import { isSameDay } from "../../../services/dateVerify";

// Based off of calendar's format used AI to help understand the css of this

interface MonthProps {
  date: Date;
  openModal : (task:Task)=>void;
}

export const MonthDay: React.FC<MonthProps> = ({date, openModal}) => {
  const {tasks, refreshTasks } = useTasks();

  useEffect(() => {
    refreshTasks()
  }, [refreshTasks]);

  function generateCalendarDays() {
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

  const days = generateCalendarDays();

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Circle fill: white → light gray → dark gray → black based on completed count
  const getCircleStyle = (numComplete: number, totalTasks: number) => {
  const ratio = totalTasks === 0 ? 0 : numComplete / totalTasks;

  // Interpolate between white (0%) and near-black (100%)
  const lightness = Math.round(255 - ratio * 244); // 255 (white) → 11 (near-black)
  const fill = `rgb(${lightness}, ${lightness}, ${lightness})`;
  return { fill };
};

  let lastRenderedMonth: number | null = null;

  return (
    <div style={{ backgroundColor: "#fff", padding: "12px 0" }}>
      {weeks.map((week, weekIndex) => {
        // Detect if any day in this week starts a new month
        const firstRealDay = week.find((d) => d !== null);
        const showMonthLabel =
          firstRealDay && firstRealDay.getMonth() !== lastRenderedMonth;

        if (firstRealDay) lastRenderedMonth = firstRealDay.getMonth();

        const monthName = firstRealDay
          ? firstRealDay.toLocaleString("default", { month: "long" })
          : null;

        return (
          <React.Fragment key={weekIndex}>
            {showMonthLabel && (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "18px",
                  color: "#333",
                  margin: "16px 0 4px",
                }}
              >
                {monthName}
              </div>
            )}

            {/* Week row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                height: "100px",
                marginBottom: "8px",
              }}
            >
              {/* Horizontal track line */}
              <div
                style={{
                  position: "absolute",
                  top: "58px",
                  left: 0,
                  right: 0,
                  height: "12px",
                  backgroundColor: "#b8d0e8",
                  transform: "translateY(-50%)",
                  zIndex: 0,
                  border: "2px solid black"
                }}
              />

              {week.map((day, dayIndex) => {
                const dayTasks = day
                  ? tasks.filter((t) => isSameDay(new Date(t.start), day))
                  : [];
                const numComplete = dayTasks.filter((t) => t.completed === 1).length;
                const circleStyle = getCircleStyle(numComplete, dayTasks.length);


                return (
                  <div
                    key={dayIndex}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      height: "100%",
                      zIndex: 1,
                    }}
                  >
                    {day && (
                      <>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#444",
                            fontWeight: "500",
                            lineHeight: 1,
                            marginBottom: "4px",   // tight gap between number and circle
                          }}
                        >
                          {day.getDate()}
                        </span>

                        <div
                          onClick={() => dayTasks.length > 0 && openModal(dayTasks[0])}
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            backgroundColor: circleStyle.fill,
                            border: "2px solid black",
                            cursor: dayTasks.length > 0 ? "pointer" : "default",
                            flexShrink: 0,
                          }}
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MonthDay;