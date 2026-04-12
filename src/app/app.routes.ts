import { Routes } from '@angular/router';
import { ArViewComponent } from './components/ar-view/ar-view.component';

export const routes: Routes = [
  { path: '', component: ArViewComponent },
  { path: '**', redirectTo: '' }
];
