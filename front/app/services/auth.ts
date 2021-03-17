import {User} from '../model/user';
import {Observable} from 'rxjs/Observable';
import {RestDataSource} from './rest.datasource';
import {Injectable} from '@angular/core';
import {PointRepository} from './pointRepository';

@Injectable()
export class AuthService {

  constructor(private dataSource: RestDataSource,
              private pointRepository: PointRepository) {
  }

  register(user: User): Observable<any> {
    return this.dataSource.register(user);
  }

  login(user: User): Observable<boolean> {
    return this.dataSource.authenticate(user);
  }


  isAuthenticated(): boolean {
    return this.dataSource.getAuthToken() != null;
  }

  logout() {
    this.dataSource.clearToken();
    this.pointRepository.clearPointsList();
  }
}
