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
 */
import { AngularFirestore, DocumentChangeAction, CollectionReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// MY IMPORTS
import { ICountryModel } from '../models/country.model';

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
      .pipe(map((documents: Array<DocumentChangeAction<ICountryModel>>) => {
        return documents.map((document: DocumentChangeAction<ICountryModel>): ICountryModel => {
          return {
            name: document.payload.doc.data().name,
            dialCode: document.payload.doc.data().dialCode,
            code: document.payload.doc.data().code,
            cities: document.payload.doc.data().cities
          };
        });
      }));
  }

}
