import { ICountryModel } from './../../../../data/models/country.model';
/***
 *    ██████╗  █████╗ ███████╗██╗ ██████╗
 *    ██╔══██╗██╔══██╗██╔════╝██║██╔════╝
 *    ██████╔╝███████║███████╗██║██║
 *    ██╔══██╗██╔══██║╚════██║██║██║
 *    ██████╔╝██║  ██║███████║██║╚██████╗
 *    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝
 *
 *    ███╗   ███╗ █████╗ ████████╗███████╗██████╗ ██╗ █████╗ ██╗
 *    ████╗ ████║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██║██╔══██╗██║
 *    ██╔████╔██║███████║   ██║   █████╗  ██████╔╝██║███████║██║
 *    ██║╚██╔╝██║██╔══██║   ██║   ██╔══╝  ██╔══██╗██║██╔══██║██║
 *    ██║ ╚═╝ ██║██║  ██║   ██║   ███████╗██║  ██║██║██║  ██║███████╗
 *    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝
 *
 *    ███████╗ ██████╗ ██████╗ ███╗   ███╗
 *    ██╔════╝██╔═══██╗██╔══██╗████╗ ████║
 *    █████╗  ██║   ██║██████╔╝██╔████╔██║
 *    ██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║
 *    ██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║
 *    ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
 *
 *     ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
 *    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
 *    ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║
 *    ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║
 *    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║
 *     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝
 *
 *    ███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
 *    ██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
 *    ███████╗██║     ██████╔╝██║██████╔╝   ██║
 *    ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║
 *    ███████║╚██████╗██║  ██║██║██║        ██║
 *    ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝
 *
 */
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { map, startWith, filter, tap, debounceTime, switchMap, first } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

// MY IMPORTS
import { ReadCountriesService } from './../../../../data/services/read-countries.service';

@Component({
  selector: 'fg-basic-material-form',
  templateUrl: './basic-material-form.component.html',
  styleUrls: ['./basic-material-form.component.scss']
})
export class BasicMaterialFormComponent implements OnInit {

/***
 *    ┌─┐┬─┐┌─┐┌─┐┌─┐┬─┐┌┬┐┬┌─┐┌─┐
 *    ├─┘├┬┘│ │├─┘├┤ ├┬┘ │ │├┤ └─┐
 *    ┴  ┴└─└─┘┴  └─┘┴└─ ┴ ┴└─┘└─┘
 */
  public filteredCountryNames: Observable<Array<string>>;
  public userDetailsForm: FormGroup;
  public cities: Observable<Array<any>>;
  // public get cities(): Observable<Array<any>> {
  //   if (this.userDetailsForm.valid) {
  //     return this._readCountries.citiesFromCountry('Romania');
  //   } else {
  //     return null;
  //   }
  // }

/***
 *    ┌─┐┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┌─┐┬─┐
 *    │  │ ││││└─┐ │ ├┬┘│ ││   │ │ │├┬┘
 *    └─┘└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ └─┘┴└─
 */
  public constructor(public _readCountries: ReadCountriesService) { }

 /***
 *    ┬  ┬┌─┐┌─┐
 *    │  │├┤ ├┤
 *    ┴─┘┴└  └─┘
 *    ┌─┐┬ ┬┌─┐┬  ┌─┐
 *    │  └┬┘│  │  ├┤
 *    └─┘ ┴ └─┘┴─┘└─┘
 *    ┬ ┬┌─┐┌─┐┬┌─┌─┐
 *    ├─┤│ ││ │├┴┐└─┐
 *    ┴ ┴└─┘└─┘┴ ┴└─┘
 */
  public ngOnInit(): void {
    this.userDetailsForm = new FormGroup({
      'country-input': new FormControl(null, Validators.required, this.validateCountryName.bind(this)),
      'city-input': new FormControl(null, Validators.required)
    });

    this.cities = this.userDetailsForm.get('country-input').statusChanges
      .pipe(
        // tslint:disable-next-line:max-line-length
        switchMap((value: string) => value === 'VALID' ? this._readCountries.citiesFromCountry(this.userDetailsForm.get('country-input').value) : [])
      );

    this.filteredCountryNames = this.userDetailsForm.get('country-input').valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value: string) => this._readCountries.filter(value)),
        map((countries: Array<ICountryModel>) => countries.map((country: ICountryModel) => country.name))
      );
  }

/***
 *    ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
 *    │││├┤  │ ├─┤│ │ ││└─┐
 *    ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘
 */
  public displayCountryName(country: string) {
    if (country) {
      return country;
    }
  }

  public validateCountryName(control: FormControl): Observable<{ [key: string]: boolean }> {
    return this._readCountries.validCountryName(control.value).pipe(
      map((value: boolean) => {
        if (value) {
          return null;
        } else {
          return { 'invalidCountryName': true };
        }
      })
    );
  }

}

