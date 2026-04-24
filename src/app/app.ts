import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class App {
  private updates = inject(SwUpdate);

  constructor() {
    // Auto-reload when a new build is deployed. Without this, the cached
    // service worker keeps serving the old version until the user manually
    // clears site data — painful during rapid iteration.
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          document.location.reload();
        }
      });
      // Prompt an initial check so the user doesn't wait 30s for the
      // registrationStrategy poll.
      this.updates.checkForUpdate().catch(() => { /* offline; ignore */ });
    }
  }
}
