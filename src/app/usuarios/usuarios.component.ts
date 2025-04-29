import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'] // 👈 Vamos usar o CSS aqui
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  nome: string = '';
  email: string = '';

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuariosService.getUsuarios().subscribe((dados) => {
      this.usuarios = dados;
    });
  }

  adicionarUsuario() {
    if (this.nome && this.email) {
      const novoUsuario = {
        name: this.nome,
        email: this.email
      };
      this.usuariosService.criarUsuario(novoUsuario).subscribe((usuarioCriado) => {
        this.usuarios.push(usuarioCriado);
        this.nome = '';
        this.email = '';
      });
    } else {
      alert('Preencha o nome e o email.');
    }
  }

  deletarUsuario(id: number) {
    this.usuariosService.deletarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }
}
