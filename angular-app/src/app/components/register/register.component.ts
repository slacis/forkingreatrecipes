import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  user = {
    name: String,
    username: String,
    email: String,
    password: String,
  };

  constructor(private flashMessagesService: FlashMessagesService,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.user = {
      name: this.signupForm.value.name,
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    }

    this.signupForm.reset();
    // REGISTER USER
    this.authService.registerUser(this.user)
      .subscribe(
        data => {
          if(data.success) {
            this.flashMessagesService.show(
              'You have registered successfully!',
              {cssClass: 'alert-success', timeout: 3000}
            );
            this.router.navigate(['/login']);
          } else {
            this.flashMessagesService.show(
              'Something went wrong',
              {cssClass: 'alert-danger', timeout: 3000}
            );
            this.router.navigate(['register']);
          }

        }
      )
  }

}


