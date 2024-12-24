import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
//https://ionic.io/ionicons
import { triangle, ellipse, square, camera, image, save, search, download, listCircle } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private deferredPrompt?: any;

  constructor() {
    addIcons({ triangle, ellipse, square, camera, image, save, search, download, listCircle });
    //need to combe back and fix this implementation
    this.initializeBeforeInstallPromptListener();

  }

  private initializeBeforeInstallPromptListener(): void {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the default prompt from appearing immediately
      event.preventDefault();
      this.deferredPrompt = event;

      const installButton = document.getElementById('install-btn');
      if (installButton) {
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
          this.showInstallPrompt();
        });
      }
    });
  }

  private showInstallPrompt(): void {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        } else {
          console.log('User dismissed the PWA install prompt');
        }
        this.deferredPrompt = null;
      });
    }
  }
}
