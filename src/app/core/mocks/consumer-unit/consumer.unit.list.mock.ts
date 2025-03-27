import { Injectable } from '@angular/core';
import { ConsumerUnit } from 'app/core/interfaces/modules/consumer-unit/list-consumer-unit.interface';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConsumerUnitsListMockService {
  private readonly imageUrl = 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_2788792_0.jpg';
  
  private mockConsumerUnits: ConsumerUnit[] = [
    // Conta 1 (10 unidades)
    { id: 1, account: 1, name: 'Unidade 1', class: 'Comercial', cnpjCpf: '11.222.333/0001-44', address: 'Av. Paulista, 1000', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 2, account: 1, name: 'Unidade 2', class: 'Residencial', cnpjCpf: '222.333.444-55', address: 'Rua Oscar Freire, 200', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 3, account: 1, name: 'Unidade 3', class: 'Industrial', cnpjCpf: '33.444.555/0001-66', address: 'Alameda Santos, 300', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 4, account: 1, name: 'Unidade 4', class: 'Rural', cnpjCpf: '444.555.666-77', address: 'Estrada do Capuava, 400', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 5, account: 1, name: 'Unidade 5', class: 'Comercial', cnpjCpf: '55.666.777/0001-88', address: 'Rua Augusta, 500', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 6, account: 1, name: 'Unidade 6', class: 'Residencial', cnpjCpf: '666.777.888-99', address: 'Av. Brigadeiro Faria Lima, 600', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 7, account: 1, name: 'Unidade 7', class: 'Industrial', cnpjCpf: '77.888.999/0001-00', address: 'Rua Haddock Lobo, 700', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 8, account: 1, name: 'Unidade 8', class: 'Rural', cnpjCpf: '888.999.000-11', address: 'Rodovia Raposo Tavares, 800', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 9, account: 1, name: 'Unidade 9', class: 'Comercial', cnpjCpf: '99.000.111/0001-22', address: 'Av. Rebouças, 900', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 10, account: 1, name: 'Unidade 10', class: 'Residencial', cnpjCpf: '000.111.222-33', address: 'Rua da Consolação, 1000', status: 'Ativo', imageUrl: this.imageUrl },

    // Conta 2 (10 unidades)
    { id: 11, account: 2, name: 'Unidade 11', class: 'Industrial', cnpjCpf: '22.333.444/0001-55', address: 'Av. Angélica, 1100', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 12, account: 2, name: 'Unidade 12', class: 'Rural', cnpjCpf: '333.444.555-66', address: 'Rua Pamplona, 1200', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 13, account: 2, name: 'Unidade 13', class: 'Comercial', cnpjCpf: '44.555.666/0001-77', address: 'Alameda Jaú, 1300', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 14, account: 2, name: 'Unidade 14', class: 'Residencial', cnpjCpf: '555.666.777-88', address: 'Av. Nove de Julho, 1400', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 15, account: 2, name: 'Unidade 15', class: 'Industrial', cnpjCpf: '66.777.888/0001-99', address: 'Rua Bela Cintra, 1500', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 16, account: 2, name: 'Unidade 16', class: 'Rural', cnpjCpf: '777.888.999-00', address: 'Estrada do M Boi Mirim, 1600', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 17, account: 2, name: 'Unidade 17', class: 'Comercial', cnpjCpf: '88.999.000/0001-11', address: 'Av. Ibirapuera, 1700', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 18, account: 2, name: 'Unidade 18', class: 'Residencial', cnpjCpf: '999.000.111-22', address: 'Rua Teodoro Sampaio, 1800', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 19, account: 2, name: 'Unidade 19', class: 'Industrial', cnpjCpf: '00.111.222/0001-33', address: 'Av. São João, 1900', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 20, account: 2, name: 'Unidade 20', class: 'Rural', cnpjCpf: '111.222.333-44', address: 'Av. Pacaembú, 2000', status: 'Ativo', imageUrl: this.imageUrl },

    // Conta 3 (10 unidades)
    { id: 21, account: 3, name: 'Unidade 21', class: 'Comercial', cnpjCpf: '33.444.555/0001-66', address: 'Av. Francisco Matarazzo, 2100', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 22, account: 3, name: 'Unidade 22', class: 'Residencial', cnpjCpf: '444.555.666-77', address: 'Rua Girassol, 2200', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 23, account: 3, name: 'Unidade 23', class: 'Industrial', cnpjCpf: '55.666.777/0001-88', address: 'Alameda Lorena, 2300', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 24, account: 3, name: 'Unidade 24', class: 'Rural', cnpjCpf: '666.777.888-99', address: 'Estrada do Campo Limpo, 2400', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 25, account: 3, name: 'Unidade 25', class: 'Comercial', cnpjCpf: '77.888.999/0001-00', address: 'Av. Diógenes Ribeiro de Lima, 2500', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 26, account: 3, name: 'Unidade 26', class: 'Residencial', cnpjCpf: '888.999.000-11', address: 'Rua dos Pinheiros, 2600', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 27, account: 3, name: 'Unidade 27', class: 'Industrial', cnpjCpf: '99.000.111/0001-22', address: 'Av. Pedroso de Morais, 2700', status: 'Ativo', imageUrl: this.imageUrl },
    { id: 28, account: 3, name: 'Unidade 28', class: 'Rural', cnpjCpf: '000.111.222-33', address: 'Estrada de Itapecerica, 2800', status: 'Inativo', imageUrl: this.imageUrl },
    { id: 29, account: 3, name: 'Unidade 29', class: 'Comercial', cnpjCpf: '11.222.333/0001-44', address: 'Av. Pompéia, 2900', status: 'Em andamento', imageUrl: this.imageUrl },
    { id: 30, account: 3, name: 'Unidade 30', class: 'Residencial', cnpjCpf: '222.333.444-55', address: 'Rua dos Macunis, 3000', status: 'Ativo', imageUrl: this.imageUrl }
  ];

  getConsumerUnitsByAccount(accountId: number) {
    const filtered = this.mockConsumerUnits.filter(unit => unit.account === accountId);
    return of(filtered).pipe(delay(1500));
  }
}