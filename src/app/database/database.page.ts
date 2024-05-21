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
  scientificName = '';
  plantType = '';
  plantNotes = '';
  plants = [{ plantName: 'strawberry', plantSeason: 'summer', scientificName: 'Fragaria', plantType: 'Berry', plantNotes: 'can overripe easily' }]; //temp string

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
        scientificName: this.scientificName,
        plantType: this.plantName,
        plantNotes: this.plantNotes,
        isNew: true, // new plant (shows up blank)
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      //sends data when modal closes
      if (retval.data) {
        const { plantName, plantSeason, scientificName, plantType, plantNotes } = retval.data;
        this.plants.push({ plantName, plantSeason, scientificName, plantType, plantNotes });
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
        scientificName: plant.scientificName,
        plantType: plant.plantType,
        plantNotes: plant.plantNotes,
        index: index,
        isNew: false, // created plant (shows with filled fields)
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        const { plantName, plantSeason, scientificName, plantType, plantNotes, isDeleted } = retval.data;
        if (isDeleted) {
          this.plants.splice(index, 1);
        } else {
          this.plants[index].plantName = plantName;
          this.plants[index].plantSeason = plantSeason;
          this.plants[index].scientificName = scientificName;
          this.plants[index].plantType = plantType;
          this.plants[index].plantNotes = plantNotes;
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
  }*/
}
