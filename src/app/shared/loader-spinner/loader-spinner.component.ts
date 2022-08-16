import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderSpinnerService } from './loader-spinner.service';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.css'],
})
export class LoaderSpinnerComponent {
  loading$ = this.loader.loading$;

  constructor(public loader: LoaderSpinnerService) {}
}
