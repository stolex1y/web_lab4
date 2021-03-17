import {Injectable} from '@angular/core';

export class Locale {
  public static _(str, locale) {
    locale = locale || Locale.defaultLocale;
    if (Locale.data.hasOwnProperty(locale) && typeof Locale.data[locale] == 'object') {
      if (Locale.data[locale].hasOwnProperty(str)) {
        return Locale.data[locale][str];
      }
    }
    return str;
  }

  public static readonly defaultLocale = 'ru';
  private static readonly data = {
    ru: {
      'pattern_detail': 'Некорректный ввод. Пример: -1,2',
      'required': ' Поле обязательно для заполнения',
      'not_in_range': ' Число не находится в пределах от -3 до 3',
      'hit_true': 'Попадание',
      'hit_false': 'Промах',
      'results': 'Результат'
    }
  };

  public registerLocale(locale, data) {
    if (!Locale.data.hasOwnProperty(locale)) {
      Locale.data[locale] = {};
    }
    for (let str in data) {
      if (data.hasOwnProperty(str)) {
        Locale.data[locale][str] = data[str];
      }
    }
  }
}

