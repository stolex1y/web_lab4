import {Component, OnDestroy, OnInit} from '@angular/core';
import {updateTimeElement} from './time';
import {AuthService} from '../services/auth';
import {User} from '../model/user';
import {NgForm} from '@angular/forms';
import {Messenger} from '../core/messenger';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PointRepository} from '../services/pointRepository';
import {MessageService} from '../messages/message.service';
import {Message} from '../messages/message';


@Component({
  // tslint:disable-next-line:component-selector
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css', '../form/form.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public getValidationMessages = Messenger.getValidationMessages;
  public errorMessage: string;
  private accessDenied: boolean = false;

  private aSub: Subscription;

  user: User = new User();

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private pointRepository: PointRepository) {
    window.addEventListener("load",
        e => updateTimeElement(document.getElementById("time")));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        this.accessDenied = true;
        this.errorMessage = 'Пожалуйста, выполните вход';
      }
    })
  }

  ngOnDestroy(): void {
    if (this.aSub)
      this.aSub.unsubscribe();
  }

  public onLogin(form: NgForm) {
    form.control.disable();
    this.aSub = this.auth.login(this.user).subscribe(
      () => {
        this.pointRepository.getPointList(true);
        this.router.navigate(['/table'])
      },
      error => {
        this.errorMessage = 'Неверное имя пользователя или пароль'
        form.control.enable();
        if (this.accessDenied)
          this.router.navigate(['/auth'])
      }
    );
  }

  public onRegister(form: NgForm) {
    form.control.disable();
    this.aSub = this.auth.register(this.user).subscribe(
      () => {
        this.onLogin(form);
      },
      error => {
        this.errorMessage = 'Пользователь с данным именем пользователя уже зарегистрирован'
        form.control.enable();
        if (this.accessDenied)
          this.router.navigate(['/auth'])
      }
    );
  }
}
