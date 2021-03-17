import {Point} from '../model/point';

export class RadioAction {
  public static onClickRadioButton(event: Event,
                                   point: Point, field: string, hidden?: HTMLInputElement) {
    let eventValue = event.currentTarget['value'];

    debugger;
    if (point[field] !== null) point[field] = Number(eventValue);
    if (hidden) {
      hidden.value = eventValue;
      hidden.dispatchEvent(new Event("changeValue"));
    }
    /*let input = document.getElementById(inputId);
    input['value'] = eventValue;*/
  }
}
