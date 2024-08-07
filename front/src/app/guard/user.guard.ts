import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const routeUser = route.params['user'];

  if (routeUser === 'user' || routeUser === 'service') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
