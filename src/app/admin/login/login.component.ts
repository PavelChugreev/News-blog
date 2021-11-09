import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IFormError } from 'src/app/shared/interfaces/interfaces';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { FormService } from 'src/app/shared/services/Form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  formError: IFormError | null = null;
  submitting: boolean = false;
  alert: string = '';

  constructor(
    public authService: AuthService,
    public formService: FormService,
    private router: Router,
    public route: ActivatedRoute
  ) { }


  ngOnInit () {
    if(this.authService.isAuth) {
      this.router.navigate(["/admin/dashboard"]);
      return;
    }

    this.route.queryParams.subscribe(query => {
      if(query['auth']) {
        this.alert = 'Log in is required';
        return
      }
      if(query['session']) {
        this.alert = 'Session expired';
        return
      }
    })
  }

  get emailField () {
    return this.form.get('email');
  }

  get passwordField () {
    return this.form.get('password');
  }

  submit () {
    this.submitting = true;
    
    if (this.form.invalid) {
      return;
    }
     
    this.authService.login({
      email: this.emailField?.value,
      password: this.passwordField?.value
    })
    .pipe(finalize(() => this.submitting = false))
    .subscribe((res) => {
      this.authService.setToken(res);
  
      this.form.reset();
      this.router.navigate(['admin/dashboard']);

    }, ({error: {error}}) => {
      this.formError = {
        code: error.code,
        message: error.message.split('_').join(' ')
      }  
    })
  }
}
