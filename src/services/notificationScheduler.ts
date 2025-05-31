import { NotificationSettings } from '../lib/supabase';

export class NotificationScheduler {
  private timers: Map<string, NodeJS.Timeout> = new Map();
  private settings: NotificationSettings;

  constructor(settings: NotificationSettings) {
    this.settings = settings;
  }

  updateSettings(newSettings: NotificationSettings) {
    this.settings = newSettings;
    this.rescheduleAll();
  }

  start() {
    this.scheduleDaily();
    this.scheduleWeekly();
  }

  stop() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }

  private scheduleDaily() {
    // Schedule daily check-in reminders
    if (this.settings.checkin_reminders) {
      this.scheduleDailyReminder('checkin', 9, 0, 'Daily Check-in', 
        'How are you feeling today? Take a moment to track your mood.');
      
      this.scheduleDailyReminder('checkin-evening', 19, 0, 'Evening Reflection', 
        'How was your day? Time for your evening mood check-in.');
    }

    // Schedule meditation reminders
    if (this.settings.meditation_reminders) {
      this.scheduleDailyReminder('meditation-morning', 8, 0, 'Morning Meditation', 
        'Start your day with a peaceful meditation session.');
      
      this.scheduleDailyReminder('meditation-lunch', 12, 30, 'Midday Mindfulness', 
        'Take a break and center yourself with a short meditation.');
      
      this.scheduleDailyReminder('meditation-evening', 20, 0, 'Evening Meditation', 
        'Wind down your day with a calming meditation session.');
    }
  }

  private scheduleWeekly() {
    // Schedule weekly progress reminders
    this.scheduleWeeklyReminder('progress', 1, 10, 0, 'Weekly Progress', 
      'Check out your wellness journey progress from this week!');
  }

  private scheduleDailyReminder(
    id: string, 
    hour: number, 
    minute: number, 
    title: string, 
    body: string
  ) {
    const scheduleNext = () => {
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hour, minute, 0, 0);

      // If the time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      const delay = scheduledTime.getTime() - now.getTime();

      const timer = setTimeout(() => {
        this.sendNotification(title, body, id);
        scheduleNext(); // Reschedule for next day
      }, delay);

      this.timers.set(id, timer);
    };

    scheduleNext();
  }

  private scheduleWeeklyReminder(
    id: string,
    dayOfWeek: number, // 0 = Sunday, 1 = Monday, etc.
    hour: number,
    minute: number,
    title: string,
    body: string
  ) {
    const scheduleNext = () => {
      const now = new Date();
      const scheduledTime = new Date();
      
      // Calculate days until next occurrence
      const daysUntilTarget = (dayOfWeek + 7 - now.getDay()) % 7;
      scheduledTime.setDate(now.getDate() + (daysUntilTarget === 0 ? 7 : daysUntilTarget));
      scheduledTime.setHours(hour, minute, 0, 0);

      const delay = scheduledTime.getTime() - now.getTime();

      const timer = setTimeout(() => {
        this.sendNotification(title, body, id);
        scheduleNext(); // Reschedule for next week
      }, delay);

      this.timers.set(id, timer);
    };

    scheduleNext();
  }

  private sendNotification(title: string, body: string, tag: string) {
    // Check if we're in quiet hours
    if (this.isInQuietHours()) {
      console.log(`Skipping notification "${title}" - in quiet hours`);
      return;
    }

    // Check if browser notifications are enabled and permission is granted
    if (this.settings.browser_notifications_enabled && 
        'Notification' in window && 
        Notification.permission === 'granted') {
      
      new Notification(title, {
        body,
        tag,
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        requireInteraction: false,
        silent: false,
      });
    }

    // Log for debugging
    console.log(`Notification sent: ${title} - ${body}`);
  }

  private isInQuietHours(): boolean {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMin] = this.settings.quiet_hours_start.split(':').map(Number);
    const [endHour, endMin] = this.settings.quiet_hours_end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    // Handle overnight quiet hours (e.g., 22:00 to 08:00)
    if (startTime > endTime) {
      return currentTime >= startTime || currentTime <= endTime;
    } else {
      return currentTime >= startTime && currentTime <= endTime;
    }
  }

  private rescheduleAll() {
    this.stop();
    this.start();
  }
}

// Global scheduler instance
let globalScheduler: NotificationScheduler | null = null;

export const initializeNotificationScheduler = (settings: NotificationSettings) => {
  if (globalScheduler) {
    globalScheduler.stop();
  }
  
  globalScheduler = new NotificationScheduler(settings);
  globalScheduler.start();
  
  return globalScheduler;
};

export const updateNotificationScheduler = (settings: NotificationSettings) => {
  if (globalScheduler) {
    globalScheduler.updateSettings(settings);
  } else {
    initializeNotificationScheduler(settings);
  }
};

export const stopNotificationScheduler = () => {
  if (globalScheduler) {
    globalScheduler.stop();
    globalScheduler = null;
  }
}; 