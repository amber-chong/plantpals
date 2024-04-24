import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'welcome',
        loadComponent: () =>
          import('../welcome/welcome.page').then((m) => m.WelcomePage),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../register/register.page').then((m) => m.RegisterPage),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'database',
        loadComponent: () =>
          import('../database/database.page').then((m) => m.DatabasePage),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('../map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'reminders',
        loadComponent: () =>
          import('../reminders/reminders.page').then((m) => m.RemindersPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];