import React, { useEffect, useState } from 'react';
import { Task } from '../../../utils/props/Objects';
import { isSameDay } from '../../../services/dateVerify';
import { useTasks } from '../../../services/databaseManager';

interface DayProps {
  date: Date;
  openModal : (task:Task)=>void;
}

export const DayDay: React.FC<DayProps> = ( {date, openModal} ) => {
  
  
  const {tasks, refreshTasks } = useTasks();
    
      useEffect(() => {
        refreshTasks()
      }, [refreshTasks]);

  const dayTasks = tasks.filter((t) => isSameDay(new Date(t.start), date));
  const numComplete = dayTasks.filter((t) => t.completed === 1).length;
  const totalTasks = dayTasks.length;

  const getCircleFill = () => {
    const ratio = totalTasks === 0 ? 0 : numComplete / totalTasks;
    const lightness = Math.round(255 - ratio * 244);
    return `rgb(${lightness}, ${lightness}, ${lightness})`;
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "24px 0" }}>

      {/* Task count banner */}
      <div
        style={{
          margin: "0 16px 32px",
          padding: "14px 0",
          border: "2px solid black",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
          color: "#222",
          backgroundColor: "#b8d0e8",
        }}
      >
        {numComplete} / {totalTasks} Task{totalTasks !== 1 ? "s" : ""} Completed
      </div>

      {/* Track row with large circle */}
      <div
        style={{
          position: "relative",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Horizontal track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "12px",
            backgroundColor: "#b8d0e8",
            transform: "translateY(-50%)",
            border: "2px solid black",
            zIndex: 0,
          }}
        />

        {/* Large circle */}
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            backgroundColor: getCircleFill(),
            border: "2px solid black",
            zIndex: 1,
            cursor: totalTasks > 0 ? "pointer" : "default",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Task list below */}
      <div style={{ padding: "24px 16px 0" }}>
        {dayTasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa", fontSize: "15px" }}>
            No tasks for this day
          </p>
        ) : (
          dayTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => openModal(task)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              {/* Completion dot */}
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  backgroundColor: task.completed === 1 ? "#111" : "#fff",
                  border: "2px solid black",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "15px",
                  color: "#333",
                  textDecoration: task.completed === 1 ? "line-through" : "none",
                  opacity: task.completed === 1 ? 0.5 : 1,
                }}
              >
                {task.title}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DayDay;