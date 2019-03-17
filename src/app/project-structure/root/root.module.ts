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
import { HttpClientModule } from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';

// MY IMPORTS
import { BasicAngularFormComponent } from './components/basic-angular-form/basic-angular-form.component';
import { BasicKendoFormComponent } from './components/basic-kendo-form/basic-kendo-form.component';
import { BasicMaterialFormComponent } from './components/basic-material-form/basic-material-form.component';
import { ENVIRONMENT } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { ManageEventsService } from './../../data/services/events-services/manage-events.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReadCountriesService } from 'src/app/data/services/read-countries.service';
import { ReadEventsService } from '../../data/services/events-services/read-events.service';
import { RestrictInputDirective } from './directives/restrict-input/restrict-input.directive';
import { RootComponent } from './components/root/root.component';
import { RootRouting } from './root.routing';
import { WriteEventsService } from './../../data/services/events-services/write-events.service';

const KENDO_UI = [
  SchedulerModule
]
const ANGULAR_FIRE_MODULES = [
  AngularFireDatabaseModule,
  AngularFireModule.initializeApp(ENVIRONMENT.firebase),
];
const ANGULAR_MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
];


@NgModule({
  declarations: [
    BasicAngularFormComponent,
    BasicKendoFormComponent,
    BasicMaterialFormComponent,
    HomeComponent,
    PageNotFoundComponent,
    RestrictInputDirective,
    RootComponent
  ],
  imports: [
    ...ANGULAR_FIRE_MODULES,
    ...ANGULAR_MATERIAL_MODULES,
    ...KENDO_UI,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    RootRouting
  ],
  providers: [
    AngularFirestore,
    {
      provide: FirestoreSettingsToken,
      useValue: {}
    },
    ManageEventsService,
    ReadCountriesService,
    ReadEventsService,
    WriteEventsService
  ],
  bootstrap: [ RootComponent ]
})
export class RootModule { }
