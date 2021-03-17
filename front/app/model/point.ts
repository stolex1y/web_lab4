import {debug} from 'util';
import {PointId} from './pointId';

export class Point {
  private pointId: PointId;
  public localDate: string;
  /*// private login: string;
  private x: number;
  private y: number;
  private r: number;
  private result: boolean;
  private leadTime: number;
  private dateMs: number;
  */

  constructor(login?: string,
              public x?: number,
              public y?: number,
              public r?: number,
              private result?: boolean,
              public leadTime?: number,
              private dateMs?: number,
              id?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.r = r || 1;
    this.result = result;
    this.leadTime = leadTime;
    this.dateMs = dateMs;
    this.pointId = new PointId(id, login);
    this.localDate = Point.toLocaleDate(dateMs);
  }


  private static toLocaleDate(dateMs: number): string {
    let date = new Date(dateMs);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  public setDateMs(dateMs: number) {
    this.dateMs = dateMs;
    this.localDate = Point.toLocaleDate(dateMs);
  }

  public getId(): number {
    return this.pointId.id;
  }

  public setPointId(pointId: PointId) {
    this.pointId = pointId;
  }

  public getResultStr(): string {
    return this.result ? "Попадание" : "Промах";
  }

  public getResult(): boolean {
    return this.result;
  }

  public setResult(result: boolean) {
    this.result = result;
  }

  public getLogin(): string {
    return this.pointId.login;
  }

  public checkField() {
    this.x = Number(this.x.toString().replace(",", "."));
    this.y = Number(this.y.toString().replace(",", "."));
    this.r = Number(this.r.toString().replace(",", "."));

  }

  /*public setX(x: any) {
    this.x = x.toNumber();
  }

  public getX() {
    return this.x;
  }

  public setY(y: any) {
    this.y = y.toNumber();
  }
  public getY() {
    return this.y;
  }

  public setR(r: any) {
    this.r = r.toNumber();
  }
  public getR() {
    return this.r;
  }*/

  public toJson(): object {
    return {
      x: this.x,
      y: this.y,
      r: this.r,
      id: this.pointId.id,
      login: this.pointId.login,
      leadTime: this.leadTime,
      dateMs: this.dateMs,
      result: this.result,
    }
  }

}
