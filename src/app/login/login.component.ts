import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {first} from "rxjs";
import {CommonModule} from "@angular/common";
import {PasswordModule} from "primeng/password";
import {Button} from "primeng/button";
import {MessageModule} from "primeng/message";
import {InputTextModule} from "primeng/inputtext";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordModule, Button, MessageModule, InputTextModule]
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  loginForm!: FormGroup;
  loading = signal(false);
  submitted = signal(false);
  error = signal<string>('');
  returnUrl: string = '/';
  constructor() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.loginForm.invalid) {
      return;
    }

    this.submitted.set(true);
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          console.log(error?.error?.message);
          this.error.set('Erreur d\'authentification');
          this.submitted.set(false);
        }
      });
  }
  get email():FormControl<string>{
    return this.loginForm.get('email') as FormControl<string>;
  }
  get password():FormControl<string>{
    return this.loginForm.get('password') as FormControl<string>;
  }
}
