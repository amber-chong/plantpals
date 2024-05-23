import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { IndividualPage } from '../individual/individual.page';
import { PlantDatabaseService } from '../plant-database.service';

//==========icons============
import { addIcons } from 'ionicons';
import { pin } from 'ionicons/icons';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class MapPage implements OnInit {
  plants: any[] = [];

  constructor(
    private modalController: ModalController,
    private plantDatabaseService: PlantDatabaseService    //custom service
  ) {
    addIcons({ pin });
  }

  async ngOnInit() {
    await this.plantDatabaseService.init();
    this.plants = this.plantDatabaseService.getPlants();
  }

    //=============

  async openPlant(index: number) {      //opens individual plant in database
    const modal = await this.modalController.create({
      component: IndividualPage,
      componentProps: {
        ...this.plants[index],
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

  pinPos(plant: any) {    //cant be null apparently
    return { left: plant.x + '%', top: plant.y + '%' };   //calculations for pins
  }
}
