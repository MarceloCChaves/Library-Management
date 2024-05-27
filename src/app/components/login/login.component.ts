import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async handleLogin() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    try {
      const user = await firstValueFrom(this.authService.login(email, password));
      if (user) {
        this.toastr.success("Login realizado com sucesso!");
        localStorage.setItem("user", JSON. stringify(user));
        setTimeout(() => {
         this.router.navigate(['/dashboard']);
        }, 3000)
      } else {
        this.toastr.error("Email ou senha inválidos");
      }
    } catch (error) {
      this.toastr.error("Login falhou");
    }
  }

  enableButton() {
    return this.form.valid ? 'enabled-button' : 'disabled-button';
  }
}
