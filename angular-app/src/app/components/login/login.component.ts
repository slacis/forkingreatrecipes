import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    username: String,
    password: String
  }

  @ViewChild('f') loginForm: NgForm;
  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    this.authService.loginUser(this.user)
      .subscribe(
        data => {
          if(data.success){
            this.authService.storeUserData(data.token, data.user);
            this.flashMessage.show(
              'Logged in successfuly',
              { cssClass: 'alert-success',
                timeout: 5000 });
            this.router.navigate(['dashboard'])
          } else {
            this.flashMessage.show(
              data.msg,
              { cssClass: 'alert-danger',
                timeout: 5000 });
            this.router.navigate(['login'])
          }
        }
      );
  }
}
