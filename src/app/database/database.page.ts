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
  plantName = ''; //blanks for later
  plantSeason = '';
  plants = [{ plantName: 'strawberry', plantSeason: 'summer' }]; //temp string

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async addPlant() {
    const modal = await this.modalController.create({
      //creates modal
      component: IndividualPage,
      componentProps: {
        plantName: this.plantName,
        plantSeason: this.plantSeason,
      },
    });

    modal.onDidDismiss().then((retval) => {
      //sends data when modal closes
      if (retval.data) {
        const { plantName, plantSeason } = retval.data;
        this.plants.push({ plantName, plantSeason });
      }
    });

    return await modal.present(); //shows modal
  }

  async editPlant(index: number) {
    const modal = await this.modalController.create({
      //creates same modal, but for editing
      component: IndividualPage,
      componentProps: {
        plantName: this.plantName,
        plantSeason: this.plantSeason,
      },
    });

    modal.onDidDismiss().then((retval) => {
      const { plantName, plantSeason } = retval.data; //replaces original data with edited
      this.plants[index].plantName = plantName;
      this.plants[index].plantSeason = plantSeason;
    });

    return await modal.present();
  }

  deletePlant(index: number) {
    //deletes it
    if (index !== -1) {
      this.plants.splice(index, 1);
    }
  }
}
