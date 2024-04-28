import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ReminderPage implements OnInit {
  newReminder: { text: string; datetime: Date } = {
    text: '',
    datetime: new Date(),
  }; //needing a valid ISO 8601 datetime string?

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {}

  closeReminder() {
    this.modalController.dismiss(this.newReminder); //dismisses modal
  }
}
