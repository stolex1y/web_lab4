import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth';
import {RestDataSource} from './services/rest.datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataSource: RestDataSource) {

  }

  ngOnInit(): void {
    this.dataSource.restoreToken();
  }
}
