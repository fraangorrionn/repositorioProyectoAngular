import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = {
    email: '',
    password: ''
  };

  errorMensaje: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {

    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/home']);
    }
  }

  iniciarSesion() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado') || '{}');

    if (this.usuario.email === usuarioGuardado.email && this.usuario.password === usuarioGuardado.password) {
        console.log("Login exitoso. Foto de perfil:", usuarioGuardado.fotoPerfil);

  
        localStorage.setItem('usuario', JSON.stringify(usuarioGuardado));

        this.router.navigate(['/home']);
    } else {
        this.errorMensaje = 'Correo o contraseña incorrectos.';
        setTimeout(() => this.errorMensaje = null, 3000);
    }
  }

}
