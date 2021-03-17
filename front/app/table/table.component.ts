import {Component} from '@angular/core';
import {PointRepository} from '../services/pointRepository';
import {Point} from '../model/point';
import {AuthService} from '../services/auth';

@Component({
  // tslint:disable-next-line:component-selector
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css', '../form/form.component.css']
})
export class TableComponent {
  public currentList: number;
  private oldList: number;
  constructor(public repository: PointRepository,
              private auth: AuthService) {
    this.setCurrentList("1");
    this.getPoints(true);
  }

  public getPoints(refresh?: boolean): Point[] {
    let list: number = this.currentList ? this.currentList : this.oldList;
    if (list)
      return this.repository.getPointList(refresh, list);
    else return null;

  }

  public setCurrentList(newValue: string) {
    let numberValue: number = Number(newValue);
    this.oldList = this.currentList;
    this.currentList = numberValue;
  }

  public logout(): void {
    this.auth.logout();
  }
}
