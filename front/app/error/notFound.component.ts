import {Component} from '@angular/core';

@Component({
  selector: "notFound",
  template: `<h3 class="not-found-error">Что-то пошло не так...</h3>
             <button routerLink="/table">Вернуться</button>`
})
export class NotFoundComponent {

}
