export class Timer {
  private timer: number;
  public constructor() {
    this.timer = Date.now();
  }
  public start(): void {
    this.timer = Date.now();
  }
  public isTimeOut(limit: number): boolean {
    return (Date.now() - this.timer >= limit);
  }
}
