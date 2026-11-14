import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  users: any[] = [];
  name: string = '';
  email: string = '';
  editingId: number | null = null;
  apiUrl = 'http://localhost:3001/api/users';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  // 1. Obtener usuarios (READ)
  fetchUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error cargando usuarios:', err)
    });
  }

  // 2. Crear / Actualizar usuario (CREATE / UPDATE)
  saveUser() {
    if (!this.name.trim() || !this.email.trim()) return alert('Completa todos los campos');

    if (this.editingId) {
      this.http.put(`${this.apiUrl}/${this.editingId}`, { name: this.name, email: this.email })
        .subscribe(() => {
          this.fetchUsers();
          this.resetForm();
        });
    } else {
      this.http.post(this.apiUrl, { name: this.name, email: this.email })
        .subscribe(() => {
          this.fetchUsers();
          this.resetForm();
        });
    }
  }

  // 3. Seleccionar usuario para edición
  editUser(user: any) {
    this.editingId = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  // 4. Eliminar usuario (DELETE)
  deleteUser(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  // Limpiar formulario
  resetForm() {
    this.name = '';
    this.email = '';
    this.editingId = null;
  }
}