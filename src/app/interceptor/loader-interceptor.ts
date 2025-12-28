import { HttpInterceptorFn } from '@angular/common/http';
import { Loading } from '../Services/loading/loading';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(Loading);

  if (req.headers.has('skip-loader')) {
    return next(req);
  }

  loader.show();

  return next(req).pipe(
    finalize(() => loader.hide())
  );
};
