import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { IndividualPage } from '../individual/individual.page';

@Component({
  selector: 'app-database',
  templateUrl: './database.page.html',
  styleUrls: ['./database.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class DatabasePage implements OnInit {
  plantName = '';
  plantSeason = '';
  plants = [{ plantName: 'strawberry', plantSeason: 'summer' }];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async addPlant() {
    const modal = await this.modalController.create({
      component: IndividualPage,
      componentProps: {
        plantName: this.plantName,
        plantSeason: this.plantSeason,
      },
    });

    modal.onDidDismiss().then((retval) => {
      if (retval.data) {
        const { plantName, plantSeason } = retval.data;
        this.plants.push({ plantName, plantSeason });
      }
    });

    return await modal.present();
  }

  async editPlant(index: number) {
    const modal = await this.modalController.create({
      component: IndividualPage,
      componentProps: { plantName: this.plantName, plantSeason: this.plantSeason }
    });
  
    modal.onDidDismiss().then((retval) => {
    });
  
    return await modal.present();
  }

  deletePlant(index: number) {
    if (index !== -1) {
      this.plants.splice(index, 1);
    }
  }
}
//https://forum.ionicframework.com/t/how-to-edit-the-content-of-the-page-using-a-modal-page/157788/2
/*

*/
