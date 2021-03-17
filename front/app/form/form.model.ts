import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Point} from '../model/point';

// Не используется
export class PointFormGroup extends FormGroup {
  constructor() {
    super({
      x: new PointFormControl("Координата X", "x", "", Validators.required),
      y: new PointFormControl("Координата Y", "y", "",
        Validators.compose([
          Validators.required,
          Validators.min(-3),
          Validators.max(3),
          Validators.pattern("^[+-]*[0-9\.,]+$")
        ])),
      r: new PointFormControl("Координата R", "r", "", Validators.required),
    });

  }

  public getPointControls(): PointFormControl[] {
    return Object.keys(this.controls).map(k => this.controls[k] as PointFormControl);
  }

  // для вывода всех сообщений сверху
  public getFormValidationMessages(form: any) {
    //todo?
  }

}

export class PointFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  protected getValidationMessages() {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case "required":
            messages.push(`Поле ${this.label} является обязательным`);
            break;
          case "minlength":
            messages.push(`Поле ${this.label} должно содержать как мининмум
                                ${this.errors['minlength'].requiredLength}
                                символов`);
            break;
          case "maxlength":
            messages.push(`Поле ${this.label} может содержать не более
                                ${this.errors['maxlength'].requiredLength}
                                символов`);
            break;
          case "pattern":
            messages.push(`Поле ${this.label} содержит недопустимые символы`);
            break;

          case "min":
            messages.push(`Значение в поле ${this.label} должно быть больше
                          ${this.errors['min'].fieldset}`);
            break;

          case "max":
            //todo
            console.log("Need to do switch in form")
            break;
        }
      }
    }
    return messages;
  }
}

