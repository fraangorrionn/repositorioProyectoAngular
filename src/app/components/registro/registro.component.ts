import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    fotoPerfil: ''
  };

  imagenPreview: string | ArrayBuffer | null = null;
  errorMensaje: string | null = null;
  registroExitoso: boolean = false;

  constructor(private router: Router) {}

  // Método para procesar la imagen
  procesarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result) { 
                this.imagenPreview = e.target.result;
                this.usuario.fotoPerfil = this.imagenPreview as string;
                console.log("✅ Imagen convertida a Base64:", this.usuario.fotoPerfil); // ✅ Debug
            }
        };
        reader.readAsDataURL(file);
    }
  }

  registrarse() {
    // Verificar si las contraseñas coinciden
    if (this.usuario.password !== this.usuario.confirmPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden.';
      setTimeout(() => this.errorMensaje = null, 3000);
      return;
    }

    // Guardar usuario en localStorage
    localStorage.setItem('usuarioRegistrado', JSON.stringify(this.usuario));

    console.log("📸 Foto de perfil guardada:", this.usuario.fotoPerfil); // ✅ Debug

    this.registroExitoso = true;

    // Redirigir al login después de unos segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}