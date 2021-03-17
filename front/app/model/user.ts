export class User {

  constructor(public login: string = "",
              public pass: string = "") {
    this.login = login;
    this.pass = pass;
  }

 /* public getLogin(): string {
    return this.login;
  }

  public setLogin(login: string): void {
    this.login = login;
  }

  public getPass(): string {
    return this.pass;
  }

  public setPass(pass: string): void {
    this.pass = pass;
  }*/

}
