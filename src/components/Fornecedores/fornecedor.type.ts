export interface Contato {
  nome: string;
  telefone: string;
}

export interface Endereco {
  cep: string;
  estado: string;
  cidade: string;
  logradouro: string;
  numero: string;
  referencia?: string;
}

export interface Fornecedor {
  id: string;
  nome: string;
  descricao?: string;
  contatos: Contato[];
  endereco: Endereco;
}
