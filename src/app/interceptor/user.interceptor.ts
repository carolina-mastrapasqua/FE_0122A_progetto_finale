import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MDYxMzE3MywiZXhwIjoxNjUyNzYwNjU3fQ.c4acV5QLQzuKK0IVjsRpM2JIo6BMBSEEQdGtqaLk3mICK_Mdo5qDzpuWJQIZCbrnmUMHnmtLQ6hlnSylLzJWLg'
    const newReq = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token).set("X-TENANT-ID", "fe_0122a")
    });
    return next.handle(newReq);
  }

}
