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
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { map, startWith, filter, tap, debounceTime, switchMap, first, finalize } from 'rxjs/operators';
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
  public cityInputIsLoading: boolean;
  public countryInputIsLoading: boolean;



/***
 *    ┌─┐┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┌─┐┬─┐
 *    │  │ ││││└─┐ │ ├┬┘│ ││   │ │ │├┬┘
 *    └─┘└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ └─┘┴└─
 */
  public constructor(private _readCountries: ReadCountriesService) { }

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
      'city-input': new FormControl({ value: null, disabled: true }, Validators.required)
    });

    this.filteredCountryNames = this.userDetailsForm.get('country-input').valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.countryInputIsLoading = true),
        switchMap((value: string) => this._readCountries.filter(value).pipe(
          finalize(() => this.countryInputIsLoading = false)
        )),
        map((countries: Array<ICountryModel>) => countries.map((country: ICountryModel) => country.name)),
      );

    this.cities = this.userDetailsForm.get('country-input').statusChanges
      .pipe(
        tap(() => this.cityInputIsLoading = true),
        switchMap((value: string) => {
          if (value === 'VALID') {
            this.userDetailsForm.get('city-input').enable();
            return this._readCountries.citiesFromCountry(this.userDetailsForm.get('country-input').value).pipe(
              finalize(() => this.cityInputIsLoading = false)
            );
          }  else {
            this.userDetailsForm.get('city-input').disable();
            return [];
          }
        })
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

  public test() {
    return this.countryInputIsLoading;
  }

}

