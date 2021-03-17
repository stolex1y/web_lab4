import {splitDepsDsl} from '@angular/core/src/view/util';

export class Messenger {
  public static getValidationMessages(state: any, thingName?: string): string[] {
    let thing: string = thingName || state.path;
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "required":
            messages.push(`Поле ${thing} является обязательным`);
            break;
          case "minlength":
            messages.push(`Поле ${thing} должно содержать как мининмум
                                ${state.errors['minlength'].requiredLength}
                                символов`);
            break;
          case "maxlength":
            messages.push(`Поле ${thing} может содержать не более
                                ${state.errors['maxlength'].requiredLength}
                                символов`);
            break;
          case "pattern":
            messages.push(`Поле ${thing} содержит недопустимые символы`);
            break;

          case "min":
            messages.push(`Значение в поле ${thing} должно быть больше
                          ${state.errors['min'].min}`);
            break;

          case "max":
            messages.push(`Значение в поле ${thing} должно быть меньше
                          ${state.errors['max'].max}`);
            break;
        }
      }
    }
    return messages;
  }
}
