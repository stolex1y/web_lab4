import {Inject, Injectable, OpaqueToken} from '@angular/core';
import {Headers, Http, Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Point} from '../model/point';
import 'rxjs/add/operator/map';
import {User} from '../model/user';
import {AuthResponse} from '../interfaces/authResponse';

export const REST_URL = new OpaqueToken("rest_url");
export const AUTH_URL = new OpaqueToken("auth_url");

@Injectable()
export class RestDataSource {
  private authToken: string;

  constructor(private http: Http,
              @Inject(REST_URL) private apiUrl: string,
              @Inject(AUTH_URL) private authUrl: string) {
  }

  public authenticate(user: User): Observable<boolean> {
    return this.http.post(this.authUrl + "/login", user)
    .map(response => {
      let r: AuthResponse = response.json();
      this.authToken = r.success ? r.token : null;
      localStorage.setItem("auth-token", this.authToken);
      return r.success;
    });
  }

  public register(user: User): Observable<any> {
    return this.http.post(this.authUrl + '/register', user);
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  public clearToken(): void {
    this.authToken = null;
    localStorage.clear();
  }

  public restoreToken(): void {
    let potentialToken: string = localStorage.getItem("auth-token");
    if (potentialToken != null)
      this.authToken = potentialToken;
  }

  public getPointList(listNumber: number, count: number = 10): Observable<Point[]> {
    return this.sendRequest(RequestMethod.Get,
      this.apiUrl + `/${listNumber}?count=${count}`);
  }

  public savePoint(point: Point): Observable<Point> {
    return this.sendRequest(RequestMethod.Post, this.apiUrl + "/", point);
  }

  public updatePoint(point: Point): Observable<Point> {
    return this.sendRequest(RequestMethod.Put,
      this.apiUrl + `/id/${point.getId()}`, point);
  }

  public deletePoint(id: number): Observable<void> {
    return this.sendRequest(RequestMethod.Delete,
      this.apiUrl + `/id/${id}`);
  }

  public getPoint(id: number): Observable<Point> {
    return this.sendRequest(RequestMethod.Get,
      this.apiUrl + `/id/${id}`);
  }

  private sendRequest(verb: RequestMethod, url: string, body?: Point,
                      auth: boolean = true): Observable<any> {
    let newBody: object = body;
    if (body) newBody = body.toJson();
    let req = new Request({
      method: verb,
      url: url,
      body: newBody,
      headers: new Headers({
        "Content-Type": "text/plain"
      }),
      withCredentials: true
    });
    if (auth && this.authToken != null) {
      req.headers.set("Authorization", `${this.authToken}`)
    }
    return this.http.request(req).map(response => {
      return response.json();
    });
  }
}
