import {Injectable} from '@angular/core';
import {PointRepository} from '../services/pointRepository';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Point} from './point';
import {Observable} from 'rxjs/Observable';
import {RestDataSource} from '../services/rest.datasource';
import {MessageService} from '../messages/message.service';
import {Message} from '../messages/message';

@Injectable()
export class ModelResolver implements Resolve<Point[]>{
  constructor(private pointRepository: PointRepository,
              private dataSource: RestDataSource,
              private messages: MessageService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Point[]> {
    if (this.pointRepository.getPointList().length == 0) {
      this.messages.reportMessage(new Message("Загрузка данных..."));
      return this.dataSource.getPointList(this.pointRepository.getCurrentList(),
        this.pointRepository.getCount());
    }
  }


}
