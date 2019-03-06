/***
 *    ██████╗  ██████╗  ██████╗ ████████╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝
 *    ██████╔╝██║   ██║██║   ██║   ██║
 *    ██╔══██╗██║   ██║██║   ██║   ██║
 *    ██║  ██║╚██████╔╝╚██████╔╝   ██║
 *    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝
 *
 *    ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗██╗     ███████╗
 *    ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║     ██╔════╝
 *    ██╔████╔██║██║   ██║██║  ██║██║   ██║██║     █████╗
 *    ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║██║     ██╔══╝
 *    ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████╗███████╗
 *    ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
 *
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';
import { NgModule } from '@angular/core';

// MY IMPORTS
import { BasicAngularFormComponent } from './components/basic-angular-form/basic-angular-form.component';
import { BasicKendoFormComponent } from './components/basic-kendo-form/basic-kendo-form.component';
import { BasicMaterialFormComponent } from './components/basic-material-form/basic-material-form.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RootComponent } from './components/root/root.component';
import { RootRouting } from './root.routing';

const ANGULAR_MATERIAL = [
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule
];
const KENDO_UI = [];

@NgModule({
  declarations: [
    BasicAngularFormComponent,
    BasicKendoFormComponent,
    BasicMaterialFormComponent,
    HomeComponent,
    PageNotFoundComponent,
    RootComponent
  ],
  imports: [
    ...ANGULAR_MATERIAL,
    ...KENDO_UI,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    RootRouting
  ],
  providers: [],
  bootstrap: [ RootComponent ]
})
export class RootModule { }
