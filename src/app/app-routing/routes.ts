
import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutusComponent } from './../aboutus/aboutus.component';


export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',  component: MenuComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dishdetail/:id', component: DishdetailComponent },
  { path: 'contactus',      component: ContactComponent },
  { path: 'aboutus', component: AboutusComponent}
];
