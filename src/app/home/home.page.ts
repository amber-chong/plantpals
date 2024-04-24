import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone'
import { WelcomePage } from '../welcome/welcome.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],})
export class HomePage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
    this.welcome();
  }

  async welcome() {
    const modal = await this.modalController.create({
      component: WelcomePage
    });
    return await modal.present();
  }
}
