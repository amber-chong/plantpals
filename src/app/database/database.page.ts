import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { IndividualPage } from '../individual/individual.page';
import { PlantDatabaseService } from '../plant-database.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.page.html',
  styleUrls: ['./database.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})


export class DatabasePage implements OnInit {
  plants = [
    {
      plantName: 'strawberry',
      plantSeason: 'summer',
      scientificName: 'Fragaria',
      plantType: 'Berry',
      plantNotes: 'ripens too fast',
      plantImage: 'assets/placeholderSquare.png'
    },
  ]; // Temp string

  constructor(
    private modalController: ModalController,
    private plantDatabaseService: PlantDatabaseService
  ) {}

  async ngOnInit() {
    await this.plantDatabaseService.init();
    this.plants = this.plantDatabaseService.getPlants();
  }

    //=============

  async addPlant() {
    const modal = await this.modalController.create({
      component: IndividualPage,
      componentProps: {
        plantName: '',
        plantSeason: '',
        scientificName: '',
        plantType: '',
        plantNotes: '',
        plantImage: '',
        isNew: true,
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        await this.plantDatabaseService.addPlant(retval.data);
        this.plants = this.plantDatabaseService.getPlants();
      }
    });

    return await modal.present();
  }

  async openPlantModal(index: number) {
    const plant = this.plants[index];
    const modal = await this.modalController.create({
      component: IndividualPage,
      componentProps: {
        ...plant,
        index,
        isNew: false,
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        if (retval.data.isDeleted) {
          await this.plantDatabaseService.deletePlant(index);
        } else {
          await this.plantDatabaseService.editPlant(index, retval.data);
        }
        this.plants = this.plantDatabaseService.getPlants();
      }
    });

    return await modal.present();
  }
}
