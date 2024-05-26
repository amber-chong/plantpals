import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

import { WelcomePage } from '../welcome/welcome.page';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';
import { PlantDatabaseService } from '../plant-database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class HomePage implements OnInit {
  username = '';
  welcomeExecuted = false;
  plants: any[] = [];

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private router: Router,
    private plantDatabaseService: PlantDatabaseService
  ) {}

  async ngOnInit() {
    //stops it from running every time
    if (!this.welcomeExecuted) {
      this.welcome();
      this.welcomeExecuted = true;
    }

    await this.plantDatabaseService.init();
    this.plants = this.plantDatabaseService.getPlants();
  }

  //creates modal
  async welcome() {
    const modal = await this.modalController.create({
      component: WelcomePage,
    });

    //WHERE DOES THIS GO
    modal.onWillDismiss().then((retval) => {
      this.username = retval.data;
      console.log(this.username);
    });

    return await modal.present();
  }
}
