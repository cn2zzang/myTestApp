import * as Notifications from "expo-notifications";
import { addDays, setHours, setMinutes, setSeconds } from "date-fns";

export async function scheduleDiaryReminder() {
  const now = new Date();
  const reminderTime = setSeconds(setMinutes(setHours(now, 20), 0), 0);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📖 오늘의 일기 작성",
      body: "오늘 하루를 기록해 보세요.",
      sound: "default",
    },
    trigger: {
      date: reminderTime,
      type: Notifications.SchedulableTriggerInputTypes.DATE,
    },
  });

  console.log("✅ 푸시 알림이 설정되었습니다:", reminderTime);
  //   const scheduledNotifications =
  //     await Notifications.getAllScheduledNotificationsAsync();
  //   console.log("📅 예약된 알림 목록:", scheduledNotifications);
}
