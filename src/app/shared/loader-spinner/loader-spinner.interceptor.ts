import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderSpinnerService } from './loader-spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderSpinnerInterceptor implements HttpInterceptor {
  totalRequests = 0;
  requestsCompleted = 0;

  constructor(private loaderService: LoaderSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.requestsCompleted++;

        if (this.requestsCompleted === this.totalRequests) {
          this.loaderService.hide();
          this.totalRequests = 0;
          this.requestsCompleted = 0;
        }
      })
    );
  }
}
