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
 idade: number | null = null;

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
    if (this.nome && this.email && this.idade !== null) {
      const novoUsuario = {
        name: this.nome,
        email: this.email,
        idade: this.idade
      };
      this.usuariosService.criarUsuario(novoUsuario).subscribe((usuarioCriado) => {
        this.usuarios.push(usuarioCriado);
        this.nome = '';
        this.email = '';
        this.idade = null; // se usar number | nul

      });
    } else {
      alert('Preencha o nome, o email e a idade.');
    }
  }

  deletarUsuario(id: number) {
    this.usuariosService.deletarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }
}
