import { Component } from '@angular/core';
import { ToDoItem } from "../model/ToDoItem";

import { AppStorageService } from '../app-storage.service';
import { ITEMS_STORAGE } from '../app.constants';
import { IonDatetime } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  items: ToDoItem[] = [];
  newItem: ToDoItem = new ToDoItem('', false);

  constructor(private appStorage: AppStorageService, private alertController: AlertController) {}

  async ionViewDidEnter()  {
    const loaded_items = await this.appStorage.get(ITEMS_STORAGE);

    if (loaded_items) {
      this.items = loaded_items;
    }
  }

  async addItem() {
    this.items.push(this.newItem);
    this.appStorage.set(ITEMS_STORAGE, this.items);

    const confirmation = await this.alertController.create({
      header: 'Add to Calendar?',
      message: 'Do you want to add this task to your device calendar?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => this.addToNativeCalendar()
        },
      ],
    });

    await confirmation.present();
    this.resetForm();
  }

  async addToNativeCalendar() {
    try {
      await CapacitorCalendar.requestFullCalendarAccess();

      await CapacitorCalendar.openCalendar({
        date: this.newItem.date?.getDate()
      });

    } catch (error) {
      console.error('Error adding event to calendar:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to add task to the calendar.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  resetForm() {
    this.newItem = new ToDoItem('', false);
  }

  resetDate(datePicker: IonDatetime) {
    this.newItem.date = undefined;
    datePicker.reset(undefined)
  }

}
