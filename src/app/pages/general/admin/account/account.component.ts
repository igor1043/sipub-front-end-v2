import { Component } from '@angular/core';
import { SimpleTableComponent } from '../../../../desing-system/ui-components/tables/simple-table/simple-table.component';
import { PageEvent } from '@angular/material/paginator';

interface Account {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [SimpleTableComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  accountData: Account[] = [
    { id: 1, name: 'João Silva', email: 'joao.silva@example.com', role: 'Admin' },
    { id: 2, name: 'Maria Souza', email: 'maria.souza@example.com', role: 'User' },
    { id: 3, name: 'Pedro Costa', email: 'pedro.costa@example.com', role: 'User' },
    { id: 4, name: 'Ana Oliveira', email: 'ana.oliveira@example.com', role: 'User' },
    { id: 5, name: 'Carlos Mendes', email: 'carlos.mendes@example.com', role: 'User' },
    { id: 6, name: 'Fernanda Lima', email: 'fernanda.lima@example.com', role: 'User' },
    { id: 7, name: 'Ricardo Alves', email: 'ricardo.alves@example.com', role: 'User' },
    { id: 8, name: 'Patrícia Rocha', email: 'patricia.rocha@example.com', role: 'User' },
    { id: 9, name: 'Lucas Santos', email: 'lucas.santos@example.com', role: 'User' },
    { id: 10, name: 'Juliana Pereira', email: 'juliana.pereira@example.com', role: 'User' },
    { id: 11, name: 'Marcos Fernandes', email: 'marcos.fernandes@example.com', role: 'User' },
    { id: 12, name: 'Aline Barbosa', email: 'aline.barbosa@example.com', role: 'User' },
    { id: 13, name: 'Gustavo Dias', email: 'gustavo.dias@example.com', role: 'User' },
    { id: 14, name: 'Camila Ribeiro', email: 'camila.ribeiro@example.com', role: 'User' },
    { id: 15, name: 'Roberto Martins', email: 'roberto.martins@example.com', role: 'User' },
    { id: 16, name: 'Tatiane Carvalho', email: 'tatiane.carvalho@example.com', role: 'User' },
    { id: 17, name: 'Diego Nunes', email: 'diego.nunes@example.com', role: 'User' },
    { id: 18, name: 'Vanessa Gonçalves', email: 'vanessa.goncalves@example.com', role: 'User' },
    { id: 19, name: 'Felipe Castro', email: 'felipe.castro@example.com', role: 'User' },
    { id: 20, name: 'Larissa Freitas', email: 'larissa.freitas@example.com', role: 'User' },
    { id: 21, name: 'Bruno Correia', email: 'bruno.correia@example.com', role: 'User' },
    { id: 22, name: 'Isabela Moreira', email: 'isabela.moreira@example.com', role: 'User' },
    { id: 23, name: 'Eduardo Lopes', email: 'eduardo.lopes@example.com', role: 'User' },
    { id: 24, name: 'Mariana Teixeira', email: 'mariana.teixeira@example.com', role: 'User' },
    { id: 25, name: 'Rafaela Cardoso', email: 'rafaela.cardoso@example.com', role: 'User' },
    { id: 26, name: 'Thiago Miranda', email: 'thiago.miranda@example.com', role: 'User' },
    { id: 27, name: 'Cristina Azevedo', email: 'cristina.azevedo@example.com', role: 'User' },
    { id: 28, name: 'André Sousa', email: 'andre.sousa@example.com', role: 'User' },
    { id: 29, name: 'Sandra Monteiro', email: 'sandra.monteiro@example.com', role: 'User' },
    { id: 30, name: 'Leonardo Pires', email: 'leonardo.pires@example.com', role: 'User' },
    { id: 31, name: 'Renata Vieira', email: 'renata.vieira@example.com', role: 'User' },
    { id: 32, name: 'Hugo Machado', email: 'hugo.machado@example.com', role: 'User' },
    { id: 33, name: 'Daniela Abreu', email: 'daniela.abreu@example.com', role: 'User' },
    { id: 34, name: 'Alexandre Fonseca', email: 'alexandre.fonseca@example.com', role: 'User' },
    { id: 35, name: 'Beatriz Andrade', email: 'beatriz.andrade@example.com', role: 'User' },
    { id: 36, name: 'Vitor Cunha', email: 'vitor.cunha@example.com', role: 'User' },
  ];

  tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nome' },
    { key: 'email', header: 'E-mail' },
    { key: 'role', header: 'Função' }
  ];

  selectedAccount: Account | null = null;

  handleAdd() {
    console.log('Adicionar nova conta');
  }

  handleEdit(account: Account) {
    console.log('Editar conta:', account);
  }

  handleDelete(account: Account) {
    console.log('Excluir conta:', account);
  }

  handleSelect(account: Account) {
    console.log('Conta selecionada:', account);
    this.selectedAccount = account;
  }

  handlePageChange(event: PageEvent) {
    console.log('Mudança de página:', event);
  }
}