import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RemindersPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }  
  }

