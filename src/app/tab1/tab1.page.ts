import { Component } from '@angular/core';
import { ToDoItem } from "../model/ToDoItem";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  items: ToDoItem[] = [];

  constructor() {}

  async ionViewDidEnter()  {
    this.generateMockData();
  }

  private generateMockData() {
    this.items = [
      new ToDoItem("Dokončit mobilní aplikaci", false, new Date("2025-01-20")),
      new ToDoItem("Objednat se k doktorovi", false),
      new ToDoItem("Koupit nový počítač", true)
    ];
  }

}
