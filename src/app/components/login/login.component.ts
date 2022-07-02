import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];
  loginData = {
    username: '',
    password: '',
    remember: false
  }
  password: string;

  config: AppConfig;

  subscription: Subscription;

  loginForm: FormGroup;

  constructor(
    public configService: ConfigService,
    public fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ){ }

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
        this.config = config;
        });

        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            remember: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const data = this.loginForm.value;
            this.authService.login(data).subscribe(res => {
                localStorage.setItem('accessToken', res.data.access_token);
                this.router.navigate(['/admin']);
            },
            err => {
                this.alertService.error(err);
            })
        }
    }

    ngOnDestroy(): void {
        if(this.subscription){
        this.subscription.unsubscribe();
        }
    }
}
