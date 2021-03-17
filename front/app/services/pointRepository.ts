import {Point} from '../model/point';
import {Injectable} from '@angular/core';
import {RestDataSource} from './rest.datasource';
import {Timer} from '../core/timer';
import {PointId} from '../model/pointId';

@Injectable()
export class PointRepository {
  private timer: Timer = new Timer();
  private points: Point[] = [];
  private currentList: number;
  private count: number;

  constructor(private dataSource: RestDataSource) {
    this.currentList = 1;
    this.count = 10;
    if (this.dataSource.getAuthToken() != null)
      this.loadPoints();
  }

  public clearPointsList(): void {
    this.currentList = 1;
    this.count = 10;
    this.points = [];
  }

  public getCurrentList(): number {
    return this.currentList;
  }

  public getCount(): number {
    return this.count;
  }

  public getPointList(refresh? : boolean, list: number = this.currentList): Point[] {
    if (refresh !== false && (refresh || this.currentList !== list || this.timer.isTimeOut(30000))) {
      this.currentList = list;
      this.loadPoints();
      this.timer.start();
    }
    return this.points;
  }

  public getPoint(id: number): Point {
    this.getPointList();
    return this.points.find(p => p.getId() === id);
  }

  public savePoint(point: Point): void {
    if (point.getId() === 0 || point.getId() === undefined || point.getId() === null) {
      this.addPoint(point);
      this.dataSource.savePoint(point).subscribe((addedPoint) => {
        let lastPoint: Point = this.points[this.points.length - 1];
        lastPoint.setPointId(new PointId(addedPoint['pointId']['id'], addedPoint['pointId']['login']));
      });
    } else {
      this.dataSource.updatePoint(point).subscribe((updatedPoint) => {
        let index = this.points.findIndex((currentPoint, index, arr) => {
          return currentPoint.getId() === updatedPoint.getId();
        });
        this.points[index] = updatedPoint;
      });
    }
  }

  private addPoint(p: Point): void {
    this.points[this.points.length] = p;
  }

  public deletePoint(id: number) {
    this.dataSource.deletePoint(id).subscribe();
    this.loadPoints();
  }

  private loadPoints() {
    this.points.length = 0;
    this.dataSource.getPointList(this.currentList, this.count).subscribe(data => {
      data['points'].forEach(point => {
        let p = new Point(point['pointId']['login'], point.x, point.y,
          point.r, point["result"], point.leadTime, point["dateMs"], point['pointId']['id']);
        this.addPoint(p);
      })
    });
  }




}
