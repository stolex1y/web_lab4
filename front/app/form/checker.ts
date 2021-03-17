import {Point} from '../model/point';

export class Checker {
  public static checkResult(point: Point): void {
    // let startTime: number = (new Date()).getTime();
    let startTime: number = window.performance.now();
    point.setDateMs(Date.now());
    point.setResult(Checker.check(point.x, point.y, point.r));
    // let endTime: number = (new Date()).getTime();
    let endTime: number = window.performance.now();
    point.leadTime = Number((endTime - startTime).toFixed(3)) * 1000;
  }

  private static check(x: number, y: number, r: number): boolean {
    if (x > 0) {
      if (y > 0) {
        return false;
      } else {
        let v = ((r/2) * (r/2)) - x * x;
        // Проверка ОДЗ
        if (v < 0)
          return false;
        else
          return (y >= -Math.sqrt(v));
      }
    } else {
      if (y <= 0) {
        return ((y >= -r) && (x >= -r));
      } else {
        return (y <= (x + r));
      }
    }
  }
}
