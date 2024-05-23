import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { IndividualPage } from '../individual/individual.page';
import { Storage } from '@ionic/storage-angular';

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
    private storage: Storage,
  ) {
    addIcons({ pin });
  }

  async ngOnInit() {
    await this.storage.create();
    this.plants = (await this.storage.get('plants')) || [];   //gets plant data from storage
  }

//=====================
  async openPlant(index: number) {
    const modal = await this.modalController.create({
      component: IndividualPage,
      componentProps: {
        ...this.plants[index],    //condensed version of everything in plants on database/individual - amber is not typing all that again
        isNew: false,
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        const { isDeleted } = retval.data;
        if (isDeleted) {
          this.plants.splice(index, 1);                 //reused list delete code for modals
        } else {
          this.plants[index] = retval.data;
        }
        await this.storage.set('plants', this.plants);
      }
    });

    return await modal.present();
  }

//=====================
  pinPos(plant: any) {      //"cant be null" - why any is there
    return { left: plant.x + '%', top: plant.y + '%' };     //calculations for pins
  }
}