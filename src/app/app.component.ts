import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})

export class AppComponent implements OnInit{
  constructor(private modalController:ModalController) {}

  ngOnInit() {
  }

}
