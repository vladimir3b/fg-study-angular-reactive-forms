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
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// MY IMPORTS
import { BasicAngularFormComponent } from './components/basic-angular-form/basic-angular-form.component';
import { BasicKendoFormComponent } from './components/basic-kendo-form/basic-kendo-form.component';
import { BasicMaterialFormComponent } from './components/basic-material-form/basic-material-form.component';
import { ENVIRONMENT } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReadCountriesService } from 'src/app/data/services/read-countries.service';
import { RootComponent } from './components/root/root.component';
import { RootRouting } from './root.routing';

const ANGULAR_FIRE_MODULES = [
  AngularFireDatabaseModule,
  AngularFireModule.initializeApp(ENVIRONMENT.firebase),
];
const ANGULAR_MATERIAL = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
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
    ...ANGULAR_FIRE_MODULES,
    ...ANGULAR_MATERIAL,
    ...KENDO_UI,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RootRouting
  ],
  providers: [
    AngularFirestore,
    {
      provide: FirestoreSettingsToken,
      useValue: {}
    },
    ReadCountriesService
  ],
  bootstrap: [ RootComponent ]
})
export class RootModule { }
