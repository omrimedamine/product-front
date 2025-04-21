import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";


export const AuthenticatedUserCanActivateGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedInOrElseRedirect();
};

