import { Component } from '@angular/core';

import { AppStorageService } from '../app-storage.service';
import { THEME_STORAGE } from '../app.constants';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  paletteToggle = false;

  constructor(private appStorage: AppStorageService) {}

  async ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const darkMode = await this.appStorage.get(THEME_STORAGE);
    if (darkMode !== null) {
      this.initializeDarkPalette(darkMode);
    } else {
      this.initializeDarkPalette(prefersDark.matches);
    }
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    this.appStorage.set(THEME_STORAGE, shouldAdd);
  }
}
