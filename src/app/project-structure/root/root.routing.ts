/***
 *    ██████╗  ██████╗  ██████╗ ████████╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝
 *    ██████╔╝██║   ██║██║   ██║   ██║
 *    ██╔══██╗██║   ██║██║   ██║   ██║
 *    ██║  ██║╚██████╔╝╚██████╔╝   ██║
 *    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝
 *
 *    ██████╗  ██████╗ ██╗   ██╗████████╗██╗███╗   ██╗ ██████╗
 *    ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██║████╗  ██║██╔════╝
 *    ██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║██║  ███╗
 *    ██╔══██╗██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██║   ██║
 *    ██║  ██║╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║╚██████╔╝
 *    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝
 *
 */
import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

// MY IMPORTS
import { BasicAngularFormComponent } from './components/basic-angular-form/basic-angular-form.component';
import { BasicJqwidgetsFormComponent } from './components/basic-jqwidgets-form/basic-jqwidgets-form.component';
import { BasicMaterialFormComponent } from './components/basic-material-form/basic-material-form.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// DEFINE ROUTES
const ROUTES: Routes = [
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'basic-angular-form',
    component: BasicAngularFormComponent
  },
  {
    path: 'basic-material-form',
    component: BasicMaterialFormComponent
  },
  {
    path: 'basic-kendo-form',
    component: BasicJqwidgetsFormComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

// MODULE DECLARATION
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [ RouterModule ]
})
export class RootRouting { }
