import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ReminderPage } from '../reminder/reminder.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CalendarPage implements OnInit {
  reminders: { text: string; datetime: Date }[] = []; //creates a string
  newReminder: { text: string; datetime: Date } = {
    text: '',
    datetime: new Date(),
  }; //initialises date

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async addReminder() {
    newReminder: {
      text: '';
      datetime: new Date();
    }
    //makes the modal
    const modal = await this.modalController.create({
      component: ReminderPage,
      componentProps: {
        newReminder: this.newReminder,
      },
    });

    //pushes data when modal is dismissed
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.reminders.push(data.data);
      }
    });

    return await modal.present();
  }
}
