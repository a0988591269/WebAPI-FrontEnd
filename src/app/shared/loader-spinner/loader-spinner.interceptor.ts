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
  constructor(private loaderService: LoaderSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    return next.handle(request).pipe(finalize(() => this.loaderService.hide()));
  }
}
