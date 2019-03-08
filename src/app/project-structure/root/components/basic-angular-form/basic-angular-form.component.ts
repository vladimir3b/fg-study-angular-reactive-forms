/***
 *    ██████╗  █████╗ ███████╗██╗ ██████╗
 *    ██╔══██╗██╔══██╗██╔════╝██║██╔════╝
 *    ██████╔╝███████║███████╗██║██║
 *    ██╔══██╗██╔══██║╚════██║██║██║
 *    ██████╔╝██║  ██║███████║██║╚██████╗
 *    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝
 *
 *     █████╗ ███╗   ██╗ ██████╗ ██╗   ██╗██╗      █████╗ ██████╗
 *    ██╔══██╗████╗  ██║██╔════╝ ██║   ██║██║     ██╔══██╗██╔══██╗
 *    ███████║██╔██╗ ██║██║  ███╗██║   ██║██║     ███████║██████╔╝
 *    ██╔══██║██║╚██╗██║██║   ██║██║   ██║██║     ██╔══██║██╔══██╗
 *    ██║  ██║██║ ╚████║╚██████╔╝╚██████╔╝███████╗██║  ██║██║  ██║
 *    ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
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
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fg-basic-angular-form',
  templateUrl: './basic-angular-form.component.html',
  styleUrls: ['./basic-angular-form.component.scss']
})
export class BasicAngularFormComponent implements OnInit, OnDestroy {

/***
 *    ┌─┐┬─┐┌─┐┌─┐┌─┐┬─┐┌┬┐┬┌─┐┌─┐
 *    ├─┘├┬┘│ │├─┘├┤ ├┬┘ │ │├┤ └─┐
 *    ┴  ┴└─└─┘┴  └─┘┴└─ ┴ ┴└─┘└─┘
 */
  public subscriptions: Array<Subscription>;
  public submittedMessage: boolean;
  public userDetailsForm: FormGroup;

/***
 *    ┌─┐┌─┐┌┐┌┌─┐┌┬┐┬─┐┬ ┬┌─┐┌┬┐┌─┐┬─┐
 *    │  │ ││││└─┐ │ ├┬┘│ ││   │ │ │├┬┘
 *    └─┘└─┘┘└┘└─┘ ┴ ┴└─└─┘└─┘ ┴ └─┘┴└─
 */
  public constructor() {
    this.subscriptions = [];
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
    this.userDetailsForm = new FormGroup({
      fullName: new FormGroup ({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
      }),
      'username': new FormControl(null, [
        Validators.required,
        this.validateUsername.bind(this)
        // here .bind(this) is not necessary but it is a good practice
        // to put it all the time, just in case we want to refer a
        // property/method of this class
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'birthDate': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'confirmHobbies': new FormControl(false),
      'hobbies': new FormArray([])
    });
    this.subscriptions.push(
      this.userDetailsForm.get('confirmHobbies').valueChanges.subscribe((value: boolean) => {
        const hobbyInputs: FormArray = this.userDetailsForm.get('hobbies') as FormArray;
        if (value) {
          hobbyInputs.push(new FormControl(null, Validators.required));
        } else {
          hobbyInputs.controls = [];
          hobbyInputs.reset();
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }


/***
 *    ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
 *    │││├┤  │ ├─┤│ │ ││└─┐
 *    ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘
 */
  public onSubmit(): void {
    if (this.userDetailsForm.valid) {
      setTimeout(() => {
        this.submittedMessage = false;
      }, 4000);
      this.submittedMessage = true;
      this.userDetailsForm.reset();
      console.log(this.userDetailsForm.value);
    }
  }

  public onAddHobbyInput(): void {
    (this.userDetailsForm.get('hobbies') as FormArray).push(new FormControl(null, Validators.required));
  }

  public onDeleteHobbyInput(index: number): void {
    (this.userDetailsForm.get('hobbies') as FormArray).removeAt(index);
  }

  public validateUsername(control: FormControl): { [key: string]: boolean } {
    if ((control.value) && !(/^[A-Za-z]+$/.test(control.value[0]))) {
      return { 'usernameForbiddenCharacter': true };
    }
    if (/[\W]+/g.test(control.value)) {
      return { 'usernameForbiddenCharacter': true };
    }
    return null;
  }

}
