import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { scheduleDiaryReminder } from "@/utils/scheduleDiaryReminder";

export function useNotification() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }

      await scheduleDiaryReminder();
    };

    requestNotificationPermission();
  }, []);
}
