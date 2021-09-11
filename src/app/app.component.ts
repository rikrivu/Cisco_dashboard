import { Component, OnInit } from '@angular/core';
import * as allData from './components/dummyData/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  ngOnInit() {
  }
}
