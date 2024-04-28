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
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CalendarPage implements OnInit {
  reminders: { text: string, datetime: Date }[] = [];     //creates a string
  newReminder: { text: string, datetime: Date } = { text: '', datetime: new Date() };     //initialises date

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async addReminder() {
    newReminder: { text: ''; datetime: new Date() };
  
    const modal = await this.modalController.create({   //makes the modal
      component: ReminderPage,
      componentProps: {
        newReminder: this.newReminder
      }
    });
  
    modal.onDidDismiss().then((data) => {   //pushes data when modal is dismissed
      if (data.data) {
        this.reminders.push(data.data);
      }
    });
  
    return await modal.present();
  }
}
