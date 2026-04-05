import React from "react";
import { Task } from "./props/Objects";

export function exportJSON(data: any) {
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  a.click();

  URL.revokeObjectURL(url);
}

export function importJSON(
  event: React.ChangeEvent<HTMLInputElement>,
  onLoad: (data: Task[]) => void
) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const rawData = JSON.parse(e.target?.result as string);

      const fixedData = rawData.map((item: any) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      }));

      onLoad(fixedData);
    } catch {
      alert("Invalid JSON file");
    }
  };

  reader.readAsText(file);
}