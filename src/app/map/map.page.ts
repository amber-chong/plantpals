import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import Chart from 'chart.js/auto'

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
  //chart code
  @ViewChild('plantGraph', { static: true }) canvas: any;
  plantRate = [];
  labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  config0: any = {
    type: 'line',
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Plant Growth',
        data: this.plantRate,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
  };

  plants: any[] = [];
  //chart: any;

  constructor(
    private modalController: ModalController,
    private plantDatabaseService: PlantDatabaseService    //custom service
  ) {
    addIcons({ pin });
  }

  async ngOnInit() {
    await this.plantDatabaseService.init();
    this.plants = this.plantDatabaseService.getPlants();
    this.canvas = new Chart(this.canvas.nativeElement, this.config0);
  }

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

  async updateChartData(index: number) {
    const data = await this.plantDatabaseService.getPlantData(index);
    this.canvas.data.datasets[0].data = data;
    this.canvas.update();
  }
}
