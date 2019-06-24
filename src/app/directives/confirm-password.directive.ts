import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmPasswordDirective,
    multi: true
  }]
})
export class ConfirmPasswordDirective implements Validator {

  @Input()
  appConfirmPassword: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const toCompare = control.parent.get(this.appConfirmPassword);

    if (toCompare && toCompare.value !== control.value) {
      return {notEqual: true};
    }
    return null;
  }
}
