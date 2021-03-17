import {Component, OnInit} from '@angular/core';
import {PointRepository} from '../services/pointRepository';
import {Point} from '../model/point';
import {Checker} from './checker';
import {AbstractControl, NgForm, NgModel, Validators} from '@angular/forms';
import {Messenger} from '../core/messenger';
import {RadioAction} from './radioAction';
import {Validators as MyValidators} from './validators';
import {ParametrizedGraphic} from './graphic';
import {AuthService} from '../services/auth';

@Component({
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {
  public inputR: HTMLInputElement;
  private readonly xLimit: Array<number> = new Array<number>();
  private readonly rLimit: Array<number> = new Array<number>();
  public graphic: ParametrizedGraphic;

  constructor(public pr: PointRepository, private auth: AuthService) {
    for (let i = -5; i < 4; i++) {
      this.xLimit.push(i);
    }
    for (let i = 1; i < 4; i++) {
      this.rLimit.push(i);
    }
  }

  ngOnInit(): void {
    this.inputR = <HTMLInputElement>document.getElementById("input-R");
    this.graphic = new ParametrizedGraphic(this.pr,
      <HTMLCanvasElement>document.getElementById("graphic"), this.inputR);
    let y: HTMLInputElement = <HTMLInputElement>document.getElementById("input-Y");
    y.focus();

    let graphic = this.graphic;
    this.inputR.addEventListener("changeValue", function () {
      debugger;
      graphic.updateGraphic();
    })
  }

  public logout(): void {
    this.auth.logout();
  }

  public getXLimit(): Array<number> {
    return this.xLimit;
  }
  public getRLimit(): Array<number> {
    return this.rLimit;
  }


  public newPoint: Point = new Point();

  public getNewPoint(): Point {
    return this.newPoint;
  }

  public addPoint() {
    this.newPoint.checkField();
    Checker.checkResult(this.newPoint);
    this.pr.savePoint(this.newPoint);
    this.newPoint = new Point();
  }


  public formSubmitted: boolean = false;
  public submitForm(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.addPoint();
      this.graphic.updateGraphic();
      form.reset();
      this.formSubmitted = false;
    }
  }

  public getValidationMessages = Messenger.getValidationMessages;
  public onClickRadioButton = RadioAction.onClickRadioButton;
  public min = MyValidators.min;
  public max = MyValidators.max;
  public getYValidators() {
    return [this.min(-3), Validators.required, this.max(3),
      Validators.pattern("[+-]{0,1}[0-9]+[\.,]{0,1}[0-9]*")];
  }



}
