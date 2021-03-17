import {Locale} from '../core/Locale'
import {Injectable} from '@angular/core';
import {PointRepository} from '../services/pointRepository';
import {Checker} from './checker';
import {Point} from '../model/point';

export class ParametrizedGraphic {
  public readonly c: CanvasRenderingContext2D;

  constructor(public readonly repository: PointRepository,
              public readonly canvas,
              public readonly param: HTMLInputElement) {
    this.c = canvas.getContext("2d");
    this.addGraphicActivity();
  }

  addGraphicActivity() {
    this.param.setAttribute("data-unit", "1");


    // Добавляет слушатель события нажатия на canvas, а именно: при нажатии
    // заполняется и отправляется форма
    this.canvas.onclick = (event) => ParametrizedGraphic.canvasOnCLick(this);

    // Отмена контекстного меню и двойного клика
    this.canvas.oncontextmenu = function(event) {
      return ParametrizedGraphic.stopDefAction(event);
    };
    this.canvas.ondblclick = function(event) {
      return ParametrizedGraphic.stopDefAction(event);
    }

    this.updateGraphic();
  }

  public updateGraphic() {
    this.drawPlate();
    this.drawOldPoints();
  }

  private static canvasOnCLick(graphic: ParametrizedGraphic) {
      let unit = Number(graphic.param.dataset["unit"]);
      let x = ParametrizedGraphic.getXinCanvas(event, graphic.canvas) - graphic.canvas.width / 2;
      let y = ParametrizedGraphic.getYinCanvas(event, graphic.canvas) - graphic.canvas.height / 2;
      let r: number = Number(graphic.param.value.replace(/,/g, "."));
      x = x / unit * r;
      y = -y / unit * r;
      let newPoint = new Point();

      newPoint.x = x;
      newPoint.y = y;
      newPoint.r = r;
      newPoint.checkField();
      Checker.checkResult(newPoint);
      graphic.repository.savePoint(newPoint);
      graphic.updateGraphic();

      ParametrizedGraphic.disableGraphicForN(graphic,
        () => ParametrizedGraphic.canvasOnCLick(graphic), 1);
  }

  private static disableGraphicForN(graphic: ParametrizedGraphic, oldFunction: (event) => void, nSeconds: number) {
    graphic.canvas.onclick = (event) => ParametrizedGraphic.stopDefAction(event);
    setTimeout(() => {
      graphic.canvas.onclick = oldFunction;
    }, nSeconds * 1000);
  }



// Отвечает за прорисовку графика
  private drawPlate() {
    this.c.restore();
    this.c.save();
    if (!this.param.value) return;

    // Белый фон
    this.c.fillStyle = "#fff";
    let width = this.canvas.width;
    let height = this.canvas.height;
    this.c.fillRect(0, 0, width, height);

    // Фигуры
    let offset = 10;
    this.c.translate(width / 2, height / 2);
    let xLen = width - 2 * offset - 4 * offset;
    let yLen = height - 2 * offset - 4 * offset;
    let unitR = ParametrizedGraphic.div(xLen, 4) * 2;
    this.param.dataset["unit"] = (unitR).toString();
    this.c.miterLimit = 0;
    let figureColor = "#39F";
    // Ось X направлена вправо, а Y вниз!
    ParametrizedGraphic.drawRect(this.c, -unitR, unitR, 0, 0, figureColor);
    ParametrizedGraphic.drawTriangle(this.c, -unitR, 0, 0, -unitR, figureColor);
    ParametrizedGraphic.drawCircle(this.c, 0, 0, unitR/2, 4, figureColor);

    // Координатная плоскость поверх всего, чтобы были видны оси и деления
    this.c.font = "14px monospaced";
    ParametrizedGraphic.drawCoordinates(this.c, width, height, offset);
    let axisWidth = 1;
    ParametrizedGraphic.drawDashes(this.c, this.param, xLen, ParametrizedGraphic.div(xLen, 4), -1, 2,
      yLen, ParametrizedGraphic.div(yLen, 4), -1, 2,
      2 + axisWidth);
  }
// Рисует все старые точки, данные берет из таблицы
  private drawOldPoints() {
    let unit = Number(this.param.dataset["unit"]);
    let r: number = Number(this.param.value.replace(/,/g, "."));
    this.repository.getPointList(false).forEach(p => {
      let color = p.getResult() ? "#0f0" : "red";
      ParametrizedGraphic.drawPoint(this.c, p.x / r * unit, -p.y / r * unit, color);
    });
  }

  private static drawPoint(c: CanvasRenderingContext2D, x, y, color?): void {
    c.save();
    c.beginPath();
    c.fillStyle = color || "red";
    c.moveTo(x, y);
    c.arc(x, y, 1.5, 0, 2 * Math.PI);
    c.fill();
    c.restore();
  }

// Получение координат X, Y при нажатии на canvas (относительно canvas),
// используя событие нажатия event
  private static getXinCanvas(event, canvas) {
    if (!event || !canvas) return NaN;
    let bcr = canvas.getBoundingClientRect();
    return (event.clientX - bcr.left) * (canvas.width / bcr.width);
  }
  private static getYinCanvas(event, canvas) {
    if (!event || !canvas) return NaN;
    let bcr = canvas.getBoundingClientRect();
    return (event.clientY - bcr.top) * (canvas.height / bcr.height);
  }

// Отмена действий по умолчанию для какого-то события event
  private static stopDefAction(event) {
    if (event.preventDefault) event.preventDefault();
    if (event.returnValue) event.returnValue = false;
    return false;
  }

  private static drawAxis(c: CanvasRenderingContext2D, length, sign, rotated, lineWidth?, color?, tipLen?, tipAngle?) {
    lineWidth = lineWidth || 1;
    color = color || "#000";
    if (sign !== "" && !sign) {
      sign = "";
    }
    c.save();
    c.lineWidth = lineWidth;
    c.strokeStyle = color;
    c.beginPath();
    let x = 0;
    let y = 0;
    c.moveTo(x, y);
    x = length;
    y = 0;
    c.lineTo(x, y);
    tipLen = tipLen || 7;
    tipAngle = tipAngle || Math.PI / 6;
    x -= tipLen;
    y += Math.tan(tipAngle) * tipLen;
    c.lineTo(x, y);
    x += tipLen;
    y -= Math.tan(tipAngle) * tipLen;
    c.moveTo(x, y);
    x -= tipLen;
    y -= Math.tan(tipAngle) * tipLen;
    c.lineTo(x, y);
    c.stroke();

    c.translate(x, y);
    x = tipLen;
    y = 0;
    c.fillStyle = color || "#000";
    c.rotate(-rotated);
    c.fillText(sign, x, y);
    c.restore();
  }

  private static drawDashes(c: CanvasRenderingContext2D, param: HTMLInputElement,
                            xLen, xUnit, xMin, dx, yLen, yUnit, yMin, dy,
                            dashLen?, lineWidth?, color?) {
    c.save();
    dashLen = dashLen || 4;

    function drawDash(c: CanvasRenderingContext2D, length) {
      c.moveTo(0, -length);
      c.lineTo(0, length);
      c.stroke();
    }

    lineWidth = lineWidth || 1;
    color = color || "#000";
    c.lineWidth = lineWidth;
    c.strokeStyle = color;
    c.fillStyle = color;

    c.save();
    c.beginPath();
    let left = xLen / 2;
    let dashCount = 0;
    while (left - xUnit > 0) {
      c.translate(-xUnit, 0);
      left -= xUnit;
      dashCount++;
    }
    dashCount = dashCount * 2 + 1; // одна дополнительная черта на оси координат
    let text;
    xMin *= dx;

    function getText(p) {
      let text;
      if (p === 0) {
        text = "";
      } else {
        text = ParametrizedGraphic.round(p, 2);
      }
      /*} else if (p % dp === 0) {
          if (p / dp === 1) {
              text = "R";
          } else if (p / dp === -1) {
              text = "-R";
          } else
              text = (p / dp) + "R";
      } else {
          text = p + "/" + dp + "R";
      }*/
      return text;
    }

    let p = -Number(param.value.replace(/,/g, "."));
    let dp = ParametrizedGraphic.round(Math.abs(p/2), 2);
    for (let i = 0; i <= dashCount; i++) {
      drawDash(c, dashLen);
      text = getText(p);
      c.fillText(text, -xUnit / 4, -xUnit / 4);
      p += dp;
      c.translate(xUnit, 0);
    }
    c.restore();

    left = yLen / 2;
    dashCount = 0;
    while (left - yUnit > 0) {
      c.translate(0, -yUnit);
      left -= xUnit;
      dashCount++;
    }
    c.rotate(Math.PI / 2);
    c.stroke();
    dashCount = dashCount * 2 + 1;
    p = Number(param.value.replace(/,/g, "."));
    for (let i = 0; i <= dashCount; i++) {
      drawDash(c, dashLen);
      text = getText(p);
      c.rotate(-Math.PI / 2);
      c.fillText(text, yUnit / 4, yUnit / 8);
      c.rotate(Math.PI / 2);
      p -= dp;
      c.translate(yUnit, 0);
    }
    c.restore();
  }

  private static drawCoordinates(c: CanvasRenderingContext2D, width, height, offset, axisWidth?) {
    // Координатная плоскость
    c.save();
    c.setTransform(1, 0, 0, 1, 0, 0);
    offset = offset || 10;
    c.translate(offset, height / 2);
    axisWidth = axisWidth || 1;
    ParametrizedGraphic.drawAxis(c, width - 2 * offset, "X", 0, axisWidth);
    c.translate(width / 2 - offset, height / 2 - offset);
    c.rotate(-Math.PI / 2);
    ParametrizedGraphic.drawAxis(c, height - 2 * offset, "Y", -Math.PI / 2, axisWidth);
    c.restore();
  }

  private static drawTriangle(c: CanvasRenderingContext2D, x1, y1, x2, y2, color?) {
    c.save();
    c.fillStyle = color || "#000";
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(x1, y1);
    c.lineTo(x2, y2);
    c.closePath();
    c.fill();
    c.restore();
  }

  private static drawRect(c: CanvasRenderingContext2D, x1, y1, x2, y2, color?) {
    c.save();

    c.moveTo(x1, y1);
    c.beginPath();
    c.fillStyle = color || "#000";
    c.fillRect(x1, y1, x2 - x1, y2 - y1);

    c.restore();
  }

  private static drawCircle(c: CanvasRenderingContext2D, x, y, r, qr, color?) {
    c.save();

    c.beginPath();
    c.moveTo(x, y);
    c.fillStyle = color || "#000";
    let startAngle = -Math.PI / 2 * (qr - 1);
    let endAngle = startAngle - Math.PI / 2;
    c.arc(x, y, r, startAngle, endAngle, true);
    c.fill();

    c.restore();
  }

// Просто целочисленное деление..
  private static div(val, by) {
    return (val - val % by) / by;
  }

  private static round(num, n) {
    let e = 1;
    for (let i = 0; i < n; i++) {
      e *= 10;
    }
    return Math.round(num * e) / e;
  }
}
/*
window.addEventListener("load", function() {

}, false);
*/

