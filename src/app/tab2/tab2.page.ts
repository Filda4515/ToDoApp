import { Component } from '@angular/core';
import { ToDoItem } from "../model/ToDoItem";

import { AppStorageService } from '../app-storage.service';
import { ITEMS_STORAGE } from '../app.constants';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  items: ToDoItem[] = [];
  newItem: ToDoItem = new ToDoItem('', false);

  constructor(private appStorage: AppStorageService) {}

  async ionViewDidEnter()  {
    const loaded_items = await this.appStorage.get(ITEMS_STORAGE);

    if (loaded_items) {
      this.items = loaded_items;
    }
  }

  async addItem() {
    this.items.push(this.newItem);
    this.appStorage.set(ITEMS_STORAGE, this.items);
    this.resetForm();
  }

  resetForm() {
    this.newItem = new ToDoItem('', false);
  }

  resetDate(datePicker: IonDatetime) {
    this.newItem.date = undefined;
    datePicker.reset(undefined)
  }

}
