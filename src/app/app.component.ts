import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebAPI';
  dateTime!: Date;

  ngOnInit(): void {
    setInterval(() => {
      this.dateTime = new Date();
    }, 1000);
  }
}
