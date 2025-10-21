// src/lib/offlineTasks.ts

// Define a Task type
export interface OfflineTask {
  title: string;
  completed: boolean;
  user_id: string | undefined;
}

export const saveOfflineTask = (task: OfflineTask) => {
  const existing: OfflineTask[] = JSON.parse(localStorage.getItem("offlineTasks") || "[]");
  existing.push(task);
  localStorage.setItem("offlineTasks", JSON.stringify(existing));
};

export const getOfflineTasks = (): OfflineTask[] => {
  return JSON.parse(localStorage.getItem("offlineTasks") || "[]");
};

export const clearOfflineTasks = () => {
  localStorage.removeItem("offlineTasks");
};
