
import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService){}

  canActivate(){
    if(this.authService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
