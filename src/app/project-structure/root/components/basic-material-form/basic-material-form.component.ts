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
  debounceTime,
  finalize,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

// MY IMPORTS
import { ICountryModel } from './../../../../data/models/country.model';
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
  public descriptionMaximumNumberOfCharacters: number;
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
  public constructor(
    private _formBuilder: FormBuilder,
    private _readCountries: ReadCountriesService,
    private _snackBar: MatSnackBar
  ) {
    this.descriptionMaximumNumberOfCharacters = 256;
  }

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
    // this.userDetailsForm = new FormGroup({
    //   'country-input': new FormControl(null, Validators.required, this.validateCountryName.bind(this)),
    //   'city-input': new FormControl({ value: null, disabled: true }, Validators.required)
    // });

    this.userDetailsForm = this._formBuilder.group({
      'full-name': this._formBuilder.group({
        'first-name': [
          null,
          [ Validators.required ]
        ],
        'last-name': [
          null,
          [ Validators.required ]
        ],
      }),
      'country-input': [
        null,
        [ Validators.required ],
        [ this.validateCountryName.bind(this) ]
      ],
      'city-input': [{
          value: null,
          disabled: true
        },
        [ Validators.required ]
      ],
      'phone-input': [
        null,
        [ Validators.required ]
      ],
      'description': [
        null,
        [
          Validators.required,
          Validators.maxLength(this.descriptionMaximumNumberOfCharacters)
        ]
      ]
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

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}

