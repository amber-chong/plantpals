import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { IndividualPage } from '../individual/individual.page';
import { Storage } from '@ionic/storage-angular'

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

  constructor(private modalController: ModalController, private storage: Storage) {
  }

  async ngOnInit() {
    await this.storage.create();
    this.plants = (await this.storage.get('plants')) || this.plants;
  }

  async addPlant() {
    const modal = await this.modalController.create({
      //creates modal
      component: IndividualPage,
      componentProps: {
        plantName: this.plantName,
        plantSeason: this.plantSeason,
        isNew: true, // new plant (shows up blank)
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      //sends data when modal closes
      if (retval.data) {
        const { plantName, plantSeason } = retval.data;
        this.plants.push({ plantName, plantSeason });
        await this.storage['set']('plants', this.plants);
      }
    });

    return await modal.present(); //shows modal
  }

  async openPlantModal(index: number) {
    const plant = this.plants[index]; // clicked plant details
    const modal = await this.modalController.create({
      //creates modal
      component: IndividualPage,
      componentProps: {
        plantName: plant.plantName,
        plantSeason: plant.plantSeason,
        index: index,
        isNew: false, // created plant (shows with filled fields)
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        const { plantName, plantSeason, isDeleted } = retval.data;
        if (isDeleted) {
          this.plants.splice(index, 1);
        } else {
          this.plants[index].plantName = plantName;
          this.plants[index].plantSeason = plantSeason;
        }
        await this.storage['set']('plants', this.plants);
      }
    });

    return await modal.present();
  }

  /*
  async editPlant(index: number) {
    const plant = this.plants[index]; // Get the current plant details
    const modal = await this.modalController.create({
      //creates same modal, but for editing
      component: IndividualPage,
      componentProps: {
        plantName: plant.plantName,
        plantSeason: plant.plantSeason,
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        const { plantName, plantSeason } = retval.data; //replaces original data with edited
        this.plants[index].plantName = plantName;
        this.plants[index].plantSeason = plantSeason;
        await this.storage['set']('plants', this.plants); // Use bracket notation
      }
    });

    return await modal.present();
  }

  async deletePlant(index: number) {
    //deletes it
    if (index !== -1) {
      this.plants.splice(index, 1);
      await this.storage.set('plants', this.plants);
    }
  }*/
}
