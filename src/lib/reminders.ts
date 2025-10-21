export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    alert("Your browser does not support notifications.");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Please allow notifications to receive reminders.");
  }
};

export const scheduleReminder = (taskTitle: string, delayMinutes: number) => {
  if (Notification.permission === "granted") {
    setTimeout(() => {
      new Notification("⏰ Task Reminder", {
        body: `Time to complete: ${taskTitle}`,
        icon: "/icons/icon-192x192.png",
      });
    }, delayMinutes * 60 * 1000);
  }
};
