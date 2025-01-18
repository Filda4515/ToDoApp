import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ToDoItem } from "../model/ToDoItem";

import { AppStorageService } from '../app-storage.service';
import { ITEMS_STORAGE } from '../app.constants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  items: ToDoItem[] = [];
  toDoItems: ToDoItem[] = [];
  doneItems: ToDoItem[] = [];

  constructor(private appStorage: AppStorageService, private alertController: AlertController) {}

  async ionViewDidEnter()  {
    const loaded_items = await this.appStorage.get(ITEMS_STORAGE);

    if (loaded_items) {
      this.items = loaded_items;
    } else {
      this.generateMockData();
    }
    this.updateLists();
  }

  private generateMockData() {
    this.items = [
      new ToDoItem("Dokončit mobilní aplikaci", false, new Date("2025-01-20")),
      new ToDoItem("Objednat se k doktorovi", false),
      new ToDoItem("Koupit nový počítač", true)
    ];
  }

  toggleDone(item: ToDoItem) {
    item.isDone = !item.isDone;
    this.updateLists();
  }

  updateLists() {
    this.toDoItems = this.items.filter(item => !item.isDone);
    this.doneItems = this.items.filter(item => item.isDone);
    this.appStorage.set(ITEMS_STORAGE, this.items);
  }

  async deleteItem(item: ToDoItem) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete this task?`,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            const index = this.items.findIndex(i => i === item);
            if (index > -1) {
              this.items.splice(index, 1);
              this.appStorage.set(ITEMS_STORAGE, this.items);
              this.updateLists();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
