import {Component, OnInit, ViewChild} from '@angular/core';
import {UserViewModel} from '../login/login.component';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') form;

  model: UserViewModel = {
    username: '',
    password: '',
    email: ''
  };

  repeatPassword: string;

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {}

  public registerUser() {
    this.loginService.saveUser(this.model).subscribe(
      res => {
        if (res != null) {
          this.router.navigateByUrl('/login');
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'This username is already used!'});
          setTimeout(() => {
            this.messageService.clear();
          }, 5000);
        }
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server is not responding!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      }
    );
  }
}
