import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {FormControl} from '@angular/forms';

export class Validators {
  public static min(min: number) {
    return (control: FormControl): {[key: string]: any} => {
      let val = Number(control.value);
      if (!isNaN(val) && val < min) {
        return {"min": {"min": min, "actualValue": val}};
      } else {
        return null;
      }
    }
  }

  public static max(max: number) {
    return (control: FormControl): {[key: string]: any} => {
      let val = Number(control.value);
      if (!isNaN(val) && val > max) {
        return {"max": {"max": max, "actualValue": val}};
      } else {
        return null;
      }
    }
  }

}
