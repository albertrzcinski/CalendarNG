import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) {
  }

  model: UserViewModel = {
    username: '',
    password: '',
    email: ''
  };

  ngOnInit() { }

  public loginUser() {
    this.loginService.getAuthorization(this.model).subscribe(
      res => {
        sessionStorage.setItem('username', this.model.username);
        sessionStorage.setItem('token', res.headers.get('Authorization'));
        this.router.navigateByUrl('/home');
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Bad credentials or server is not responding!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      }
    );
  }
}

export interface UserViewModel {
  username: string;
  password: string;
  email: string;
}
