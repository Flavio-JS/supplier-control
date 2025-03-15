# Supplier Control

O Supplier Control é uma aplicação CRUD (Create, Read, Update, Delete) desenvolvida para gerenciar fornecedores. A aplicação permite cadastrar, visualizar, editar e excluir fornecedores, além de oferecer uma funcionalidade de busca por nome. Ao criar ou editar um fornecedor, o sistema utiliza o CEP para preencher automaticamente as informações de endereço, utilizando a API ViaCEP.

## Funcionalidades

- **Cadastro de Fornecedores:** Cadastre novos fornecedores com informações como nome, CEP, endereço, etc.
- **Listagem de Fornecedores:** Visualize todos os fornecedores cadastrados em uma tabela.
- **Edição de Fornecedores:** Edite as informações de um fornecedor existente.
- **Exclusão de Fornecedores:** Remova fornecedores da lista.
- **Busca por Nome:** Filtre a lista de fornecedores pelo nome.
- **Integração com ViaCEP:** Ao informar o CEP, o sistema preenche automaticamente os campos de endereço.
- **Mensagens de Feedback:** Exibe mensagens de sucesso ou falha ao realizar ações como cadastrar, editar ou excluir fornecedores.
- **Responsividade:** A aplicação é totalmente responsiva, funcionando tanto em dispositivos móveis quanto em desktops.
- **Temas Light e Dark:** A aplicação suporta temas claros e escuros, com cores personalizadas.

## Tecnologias Utilizadas

- **ReactJS com TypeScript:** Para a construção da interface e lógica da aplicação.
- **Vite:** Como ferramenta de build e desenvolvimento.
- **Styled Components:** Para estilização dos componentes.
- **Radix UI:** Para componentes de UI acessíveis e estilizados.
- **React Hook Form e Yup:** Para manipulação e validação de formulários.
- **Axios:** Para requisições HTTP.
- **JSON Server:** Para simular uma API RESTful local.
- **Lucide React:** Para ícones.
- **UUID:** Para geração de IDs únicos.

## Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

- Node.js instalado (versão 16 ou superior)
- npm ou yarn instalado

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/Flavio-JS/supplier-control.git
   cd supplier-control
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. Configure o ambiente:

   Crie o arquivo `.env` baseado no `.env.example` e configure as variáveis de ambiente, se necessário.

4. Inicie o JSON Server:

   O JSON Server simula uma API RESTful. Execute o seguinte comando em um terminal separado:

   ```bash
   npm run db
   ```

   ou

   ```bash
   yarn db
   ```

   Isso iniciará o servidor na porta 3001.

5. Inicie a aplicação:

   Em outro terminal, execute o seguinte comando para iniciar o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   ou

   ```bash
   yarn dev
   ```

   A aplicação estará disponível em http://localhost:3000.

6. Build e Preview (opcional):

   Para construir o projeto para produção e visualizá-lo localmente, execute:

   ```bash
   npm run build
   npm run preview
   ```

   ou

   ```bash
   yarn build
   yarn preview
   ```

   O preview estará disponível em http://localhost:4173.

## Scripts Disponíveis

- **dev:** Inicia o servidor de desenvolvimento.
- **build:** Compila o projeto para produção.
- **lint:** Executa o ESLint para verificar o código.
- **preview:** Visualiza a build de produção localmente.
- **db:** Inicia o JSON Server para simular a API.

## Estrutura do Projeto

src/
├── assets/
├── components/
│ ├── Component/
│ │ └── component.tsx
│ ├── ui/
│ │ └── BaseComponent/
│ │ └── base-component.tsx
├── context/
│ └── theme-context.tsx
├── hooks/
├── services/
├── styles/
├── utils/
└── App.tsx


- **src/assets/:** Contém arquivos estáticos, como imagens.
- **src/components/:** Componentes reutilizáveis da aplicação.
  - **ui/:** Componentes base da interface do usuário.
- **src/context/:** Contextos globais da aplicação (ex: tema).
- **src/hooks/:** Hooks personalizados.
- **src/services/:** Lógica de integração com a API.
- **src/styles/:** Estilos globais e temas.
- **src/utils/:** Funções utilitárias.
- **src/App.tsx:** Ponto de entrada da aplicação.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.