import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminders: { text: string; datetime: Date }[] = [];

  constructor() {}

  addReminder(reminder: { text: string; datetime: Date }) {
    this.reminders.push(reminder);
  }

  getRemindersForDate(date: Date): { text: string; datetime: Date }[] {
    return this.reminders.filter(reminder =>
      new Date(reminder.datetime).toDateString() === date.toDateString()
    );
  }
}
