import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})

export class PlantDatabaseService {
  private plants: any = [];

  constructor(private storage: Storage) {}

  async init() {
    await this.storage.create();    //stores plant data
    this.plants = (await this.storage.get('plants')) || [];
    for (let i = 0; i < this.plants.length; i++) {
      const storedImage = await this.storage.get(`plantImage_${i}`);
      if (storedImage) {
        this.plants[i].plantImage = storedImage;
      }
    }
  }

  getPlants() {
    return this.plants;
  }

  //adds plant
  async addPlant(plant: any) {
    const newIndex = this.plants.length;
    this.plants.push(plant);
    await this.storage.set(`plantImage_${newIndex}`, plant.plantImage);    //allows for unique images to be added
    await this.storage.set('plants', this.plants);
  }

  //allows user to edit plant
  async editPlant(index: number, plant: any) {
    this.plants[index] = plant;
    await this.storage.set(`plantImage_${index}`, plant.plantImage);
    await this.storage.set('plants', this.plants);
  }

  //deletes plant from database
  async deletePlant(index: number) {
    this.plants.splice(index, 1);     //similar to how deleting things from lists works, nothing fancy
    await this.storage.remove(`plantImage_${index}`);
    await this.storage.set('plants', this.plants);
  }

  // chart
  generateRandomData(length = 12) {     //amount of months
    return Array.from({ length }, () => Math.floor(Math.random() * 100));   //random point assigning
  }

  async getPlantData(index: number): Promise<number[]> {    //promise returns a number
    const data = await this.storage.get(`plantData_${index}`);
    if (data) {
      return data;
    } else {
      const randomData = this.generateRandomData();
      await this.storage.set(`plantData_${index}`, randomData);
      return randomData;
    }
  }
}
