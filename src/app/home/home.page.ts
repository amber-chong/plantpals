import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { WelcomePage } from '../welcome/welcome.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})

export class HomePage implements OnInit {
  constructor(private modalController: ModalController, private router: Router) {}

  ngOnInit() {
    this.welcome();   //shows welcome modal
  }

  async welcome() {
    const modal = await this.modalController.create({
      component: WelcomePage,
    });
    return await modal.present();
  }

  databaseClick() {
    let database = '/database'
    this.router.navigateByUrl(database)
  }
}
