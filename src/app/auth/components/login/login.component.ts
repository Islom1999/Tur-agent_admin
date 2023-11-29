import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup!: FormGroup;
  isDisabled!: boolean;
  constructor(
    private authService: AuthService,
    private message:NzMessageService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login() {
    this.isDisabled = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      this.message.error('Invalid form');
      return;
    }

    // if loginForm is valid, login
    this.authService.login(this.formGroup.value).subscribe((tokens) => {
      
      this.message.success('Login successful');
      this.router.navigate(['/']);

      // save token in local storage
      this.authService.setAuthToken(tokens);
    });
  }
}
