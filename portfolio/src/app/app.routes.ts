import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/cv/cv.component').then(m => m.CvComponent),
    title: 'Daniel Sancho | Senior Frontend Developer'
  },
  {
    path: 'projects',
    loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Projects | Daniel Sancho'
  },
  {
    path: '**',
    redirectTo: ''
  }
];