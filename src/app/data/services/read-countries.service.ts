/***
 *    ██████╗ ███████╗ █████╗ ██████╗
 *    ██╔══██╗██╔════╝██╔══██╗██╔══██╗
 *    ██████╔╝█████╗  ███████║██║  ██║
 *    ██╔══██╗██╔══╝  ██╔══██║██║  ██║
 *    ██║  ██║███████╗██║  ██║██████╔╝
 *    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝
 *
 *     ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗██████╗ ██╗███████╗███████╗
 *    ██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝██╔══██╗██║██╔════╝██╔════╝
 *    ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║█████╗  ███████╗
 *    ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║██╔══╝  ╚════██║
 *    ╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║███████╗███████║
 *     ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
 *
 *    ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗
 *    ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝
 *    ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗
 *    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝
 *    ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗
 *    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝
 *
 *
 *     QUESTIONS:
 *     =========
 *
 *  1. In this example the database is tiny but what would I do in case of a huge database? In that case
 *     I could not load all the records in the memory. How can I create autocomplete in that case?
 *  2. Should I save countries data from the database into a variable and use it to load, filter, validate country
 *     names, load cities for a given country or is ok to read from the database all the time? In case
 *     I want to save countries data into a variable, how can I accomplish this task?
 *
 */
import { AngularFirestore, DocumentChangeAction, CollectionReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { Observable,  } from 'rxjs';
// MY IMPORTS
import { ICountryModel } from './../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class ReadCountriesService {

/***
 *    ┌─┐┬─┐┌─┐┌─┐┌─┐┬─┐┌┬┐┬┌─┐┌─┐
 *    ├─┘├┬┘│ │├─┘├┤ ├┬┘ │ │├┤ └─┐
 *    ┴  ┴└─└─┘┴  └─┘┴└─ ┴ ┴└─┘└─┘
 */


 /***
 *    ┌─┐┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┌─┐┬─┐
 *    │  │ ││││└─┐ │ ├┬┘│ ││   │ │ │├┬┘
 *    └─┘└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ └─┘┴└─
 */
  public constructor(private _database: AngularFirestore) { }

/***
 *    ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
 *    │││├┤  │ ├─┤│ │ ││└─┐
 *    ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘
 */
  public countries(): Observable<Array<ICountryModel>> {
    return this._database
      .collection('countries', (elements: CollectionReference) => elements.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map((documents: Array<DocumentChangeAction<ICountryModel>>) => {
          return documents.map((document: DocumentChangeAction<ICountryModel>): ICountryModel => {
            return {
              name: document.payload.doc.data().name,
              dialCode: document.payload.doc.data().dialCode,
              code: document.payload.doc.data().code,
              cities: document.payload.doc.data().cities
            };
          });
        },
        first()
      ));
  }

  public filter(countryName: string): Observable<Array<ICountryModel>> {
    return this.countries().pipe(
      map((countries: Array<ICountryModel>) => {
        return countries.filter((country: ICountryModel) => country.name.toLocaleLowerCase().includes(countryName.toLocaleLowerCase()));
      }),
      first()
    );
  }

  public validCountryName(countryName: string): Observable<boolean> {
    return this.countries().pipe(
      map((countries: Array<ICountryModel>) => {
        return countries.some((country: ICountryModel) => country.name.toLocaleLowerCase() === countryName.toLocaleLowerCase());
      }),
      first()
      /**
       *  CAUTION!!!
       *
       *  This can be VERY tricky:
       *
       *  Without 'first' operator the Observable never completes and the FormControl stays for ever in pending status:
       *
       *  https://stackoverflow.com/questions/48655324/angular-4-reactive-form-control-is-stuck-in-pending-state-with-a-custom-async-v
       *  https://netbasal.com/angular-2-forms-create-async-validator-directive-dd3fd026cb45
       *
       */
    );
  }

  public citiesFromCountry(countryName: string): Observable<Array<string>> {
    return this.filter(countryName).pipe(
      map((countries: Array<ICountryModel>) => {
        return countries[0].cities;
      })
    );
  }


}
