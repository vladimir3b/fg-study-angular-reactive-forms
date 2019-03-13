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
import { jqxBarGaugeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbargauge';
import { jqxInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxinput';
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

// MY IMPORTS
import { BasicAngularFormComponent } from './components/basic-angular-form/basic-angular-form.component';
import { BasicJqwidgetsFormComponent } from './components/basic-jqwidgets-form/basic-jqwidgets-form.component';
import { BasicMaterialFormComponent } from './components/basic-material-form/basic-material-form.component';
import { ENVIRONMENT } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReadCountriesService } from 'src/app/data/services/read-countries.service';
import { RestrictInputDirective } from './directives/restrict-input/restrict-input.directive';
import { RootComponent } from './components/root/root.component';
import { RootRouting } from './root.routing';

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
const JQWIDGETS_MODULES = [
  jqxBarGaugeComponent,
  jqxInputComponent
];

@NgModule({
  declarations: [
    ...JQWIDGETS_MODULES,
    BasicAngularFormComponent,
    BasicJqwidgetsFormComponent,
    BasicMaterialFormComponent,
    HomeComponent,
    PageNotFoundComponent,
    RestrictInputDirective,
    RootComponent
  ],
  imports: [
    ...ANGULAR_FIRE_MODULES,
    ...ANGULAR_MATERIAL_MODULES,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
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
