import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, FormsModule, DividerModule, InputTextModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin'){
      this.router.navigate(['/home']);
    } else {
      alert("Credenciais inválidas")
    }
  }
}
