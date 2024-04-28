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
        path: 'reminder',
        loadComponent: () =>
          import('../reminder/reminder.page').then((m) => m.ReminderPage),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('../calendar/calendar.page').then((m) => m.CalendarPage),
      },
      {
        path: 'individual',
        loadComponent: () =>
          import('../individual/individual.page').then((m) => m.IndividualPage),
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