import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contacto = {
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    mensaje: ''
  };

  mensajeEnviado = false;

  constructor() {}

  enviarFormulario() {
    const serviceID = 'service_4x4nkb8'; // Reemplaza con tu Service ID de EmailJS
    const templateID = 'template_fb7ugy9'; // Reemplaza con tu Template ID
    const publicKey = 'kRA8v7Azd9-oAXrnz'; // Reemplaza con tu Public Key de EmailJS

    const templateParams = {
      from_name: `${this.contacto.nombre} ${this.contacto.apellidos}`,
      from_email: this.contacto.email,
      phone: this.contacto.telefono,
      message: this.contacto.mensaje
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(response => {
        console.log('Correo enviado:', response);
        this.mensajeEnviado = true;

        // Limpiar formulario después de enviar
        this.contacto = { nombre: '', apellidos: '', telefono: '', email: '', mensaje: '' };

        // Ocultar mensaje después de unos segundos
        setTimeout(() => {
          this.mensajeEnviado = false;
        }, 3000);
      })
      .catch(error => {
        console.error('Error al enviar el correo:', error);
      });
  }
}
