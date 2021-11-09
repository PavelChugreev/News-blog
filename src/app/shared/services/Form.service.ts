import { Injectable } from '@angular/core';
import { validationMessages } from '../enums/validation-codes';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getErrorMessage (formControl: any) {
    const error = Object.keys(formControl.errors)[0];
    return error.length && validationMessages[error];
  }
}
