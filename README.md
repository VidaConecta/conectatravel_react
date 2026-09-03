# ConectaLife - Frontend

<div align="center">
  <img
    src="https://ik.imagekit.io/5eywr3ioq/Imagens%20Projeto%20Integrador/Gemini_Generated_Image_jffdebjffdebjffd-removebg-preview.png"
    title="ConectaLife"
    alt="Logo ConectaLife"
    width="260"
  />
</div>

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

## 1. Descrição

O **ConectaLife** é uma aplicação web para gerenciamento de seguros de vida, voltada principalmente a estudantes e profissionais da área de tecnologia. O frontend oferece uma experiência visual responsiva para cadastro, consulta, edição e exclusão de clientes e apólices.

A interface centraliza as principais operações em uma navegação simples, permitindo que o usuário acompanhe clientes e suas respectivas apólices de forma organizada. O projeto utiliza uma identidade visual baseada em tons de azul e roxo, gradientes, transparências e componentes responsivos.

A aplicação também apresenta uma página de introdução com o fluxo básico de utilização da plataforma e uma página sobre o projeto, com informações da equipe obtidas por meio da API pública do GitHub.

---

## 2. Funcionalidades

### 2.1. Gestão de clientes

- Cadastro de novos clientes.
- Listagem de clientes cadastrados.
- Edição de dados de clientes.
- Exclusão de clientes.
- Validação de maioridade, exigindo idade mínima de 18 anos.
- Exibição de nome, CPF, e-mail e data de nascimento em cards responsivos.

### 2.2. Gestão de apólices

- Cadastro de apólices.
- Listagem de apólices cadastradas.
- Edição de apólices.
- Exclusão de apólices.
- Associação de uma apólice a um cliente já cadastrado.
- Controle dos status: `ATIVO`, `SUSPENSO`, `CANCELADO` e `FINALIZADO`.
- Exibição do número, cliente, valor de cobertura, vigência e status de cada apólice.

### 2.3. Navegação e apresentação

- Página inicial com acesso rápido às páginas Sobre e Introdução.
- Navbar fixa e responsiva.
- Menu mobile com abertura e fechamento por botão.
- Página de introdução com as etapas principais de uso do sistema.
- Página Sobre com apresentação da equipe.
- Carrossel responsivo de integrantes da equipe.
- Consulta de dados públicos de perfis pela API do GitHub.
- Footer com propósito do projeto e informações de contato.

---

## 3. Telas da aplicação

| Tela              | Descrição                                                    |
| ----------------- | ------------------------------------------------------------ |
| Home              | Tela inicial de apresentação do ConectaLife                  |
| Clientes          | Lista todos os clientes cadastrados                          |
| Cadastrar Cliente | Permite registrar um novo cliente                            |
| Editar Cliente    | Permite atualizar os dados de um cliente existente           |
| Excluir Cliente   | Solicita confirmação antes de excluir um cliente             |
| Apólices          | Lista todas as apólices cadastradas                          |
| Cadastrar Apólice | Permite criar uma nova apólice vinculada a um cliente        |
| Editar Apólice    | Permite atualizar os dados de uma apólice                    |
| Excluir Apólice   | Solicita confirmação antes de excluir uma apólice            |
| Introdução        | Apresenta o fluxo recomendado de uso da plataforma           |
| Sobre             | Apresenta a proposta do projeto e a equipe de desenvolvimento |

---

## 4. Rotas

| Rota                    | Componente       | Finalidade                               |
| ----------------------- | ---------------- | ---------------------------------------- |
| `/`                     | `Home`           | Página inicial                           |
| `/introducao`           | `Introducao`     | Guia de primeiros passos                 |
| `/clientes`             | `ListarClientes` | Listagem de clientes                     |
| `/cadastrarcliente`     | `FormCliente`    | Cadastro de cliente                      |
| `/clientes/cadastrar`   | `FormCliente`    | Cadastro de cliente por rota alternativa |
| `/clientes/editar/:id`  | `FormCliente`    | Edição de cliente                        |
| `/clientes/deletar/:id` | `DeletarCliente` | Exclusão de cliente                      |
| `/apolices`             | `ListarApolices` | Listagem de apólices                     |
| `/cadastrarapolice`     | `FormApolice`    | Cadastro de apólice                      |
| `/editarapolice/:id`    | `FormApolice`    | Edição de apólice                        |
| `/deletarapolice/:id`   | `DeletarApolice` | Exclusão de apólice                      |
| `/sobre`                | `Sobre`          | Informações sobre o projeto e a equipe   |

---

## 5. Tecnologias utilizadas

| Categoria          | Tecnologia          | Utilização no projeto                                        |
| ------------------ | ------------------- | ------------------------------------------------------------ |
| Linguagem          | TypeScript          | Tipagem estática de componentes, modelos e estados           |
| Biblioteca         | React               | Construção da interface baseada em componentes               |
| Build tool         | Vite                | Ambiente de desenvolvimento e geração de build               |
| Estilização        | Tailwind CSS        | Layout, responsividade, cores, estados e componentes visuais |
| Rotas              | React Router DOM    | Navegação entre as páginas da aplicação                      |
| Requisições HTTP   | Axios               | Consumo da API REST do backend                               |
| Datas              | Day.js              | Validação de idade no cadastro de clientes                   |
| Valores monetários | React Number Format | Formatação do valor de cobertura da apólice                  |
| Ícones             | Phosphor Icons      | Ícones da navbar, formulários, cards e componentes           |
| Loaders            | React Spinners      | Indicadores de carregamento durante requisições              |
| Versionamento      | Git e GitHub        | Controle de versões e colaboração                            |
| Hospedagem da API  | Render              | Disponibilização do backend em ambiente remoto               |

---

## 6. Arquitetura do projeto

A aplicação segue uma organização baseada em componentes, páginas, serviços e modelos.

```text
src/
├── assets/
├── components/
│   ├── apolices/
│   │   ├── cardapolices/
│   │   ├── deletarapolices/
│   │   ├── formapolice/
│   │   └── listapolices/
│   ├── clientes/
│   │   ├── cardclientes/
│   │   ├── deletarcliente/
│   │   ├── formcliente/
│   │   └── listaclientes/
│   ├── footer/
│   └── navbar/
├── models/
│   ├── Apolice.ts
│   └── Cliente.ts
├── pages/
│   ├── home/
│   ├── introducao/
│   └── sobre/
├── services/
│   ├── Apolice.ts
│   ├── ClienteService.ts
│   └── Service.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

### Organização por responsabilidade

| Diretório    | Responsabilidade                                        |
| ------------ | ------------------------------------------------------- |
| `components` | Componentes reutilizáveis e telas relacionadas ao CRUD  |
| `pages`      | Páginas principais da aplicação                         |
| `models`     | Interfaces TypeScript que representam Cliente e Apólice |
| `services`   | Comunicação HTTP com a API do backend                   |
| `assets`     | Imagens e outros arquivos estáticos                     |
| `App.tsx`    | Configuração das rotas e estrutura geral da aplicação   |
| `main.tsx`   | Ponto de entrada do React                               |

---

## 7. Modelos utilizados

### Cliente

```ts
export default interface Cliente {
  id?: number
  nome: string
  dataNascimento: string
  cpf: string
  email: string
}
```

| Campo            | Tipo     | Descrição                                |
| ---------------- | -------- | ---------------------------------------- |
| `id`             | `number` | Identificador do cliente                 |
| `nome`           | `string` | Nome completo do cliente                 |
| `dataNascimento` | `string` | Data de nascimento do cliente            |
| `cpf`            | `string` | CPF do cliente, informado com 11 números |
| `email`          | `string` | E-mail para contato                      |

### Apólice

```ts
export default interface Apolice {
  id: number
  numeroApolice: string
  status: 'ATIVO' | 'CANCELADO' | 'SUSPENSO' | 'FINALIZADO'
  valorCobertura: number
  dataVigencia: string
  cliente: Cliente
}
```

| Campo            | Tipo      | Descrição                       |
| ---------------- | --------- | ------------------------------- |
| `id`             | `number`  | Identificador da apólice        |
| `numeroApolice`  | `string`  | Número identificador da apólice |
| `status`         | `string`  | Situação atual da apólice       |
| `valorCobertura` | `number`  | Valor financeiro da cobertura   |
| `dataVigencia`   | `string`  | Data de vigência da apólice     |
| `cliente`        | `Cliente` | Cliente vinculado à apólice     |

---

## 8. Integração com API

O frontend consome a API REST do ConectaLife utilizando Axios. A configuração base fica centralizada no arquivo `src/services/Service.ts`.

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://conectalife.onrender.com/'
})
```

### Serviços de clientes

| Operação              | Método HTTP | Endpoint         |
| --------------------- | ----------- | ---------------- |
| Cadastrar cliente     | `POST`      | `/clientes`      |
| Listar clientes       | `GET`       | `/clientes`      |
| Buscar cliente por ID | `GET`       | `/clientes/{id}` |
| Atualizar cliente     | `PUT`       | `/clientes/{id}` |
| Excluir cliente       | `DELETE`    | `/clientes/{id}` |

### Serviços de apólices

| Operação              | Método HTTP | Endpoint                           |
| --------------------- | ----------- | ---------------------------------- |
| Cadastrar apólice     | `POST`      | `/apolices`                        |
| Listar apólices       | `GET`       | `/apolices`                        |
| Buscar apólice por ID | `GET`       | `/apolices/{id}`                   |
| Atualizar apólice     | `PUT`       | `/apolices/{id}`                   |
| Excluir apólice       | `DELETE`    | `/apolices/{id}`                   |
| Validar cobertura     | `POST`      | `/apolices/{id}/validar-cobertura` |

---

## 9. Regras e validações

- O cadastro de cliente exige nome, data de nascimento, CPF e e-mail.
- O campo CPF aceita exatamente 11 números.
- A idade do cliente é calculada com `Day.js`.
- O sistema exige idade mínima de 18 anos para o cadastro de clientes.
- Uma apólice é vinculada a um cliente já cadastrado.
- O valor da cobertura é formatado no padrão brasileiro, com prefixo `R$`, milhar `.` e decimal `,`.
- Os status disponíveis para uma apólice são:
  - `ATIVO`
  - `SUSPENSO`
  - `CANCELADO`
  - `FINALIZADO`

---

## 10. Design e responsividade

A interface foi construída com Tailwind CSS e utiliza uma identidade visual inspirada em tecnologia, conexão e proteção.

### Elementos visuais principais

- Fundo em tons claros de azul.
- Gradientes azul, azul-escuro e roxo.
- Cards com transparência e efeito de `backdrop blur`.
- Bordas claras e sombras suaves.
- Feedback visual em estados de hover e foco.
- Navbar fixa e adaptada para desktop e dispositivos móveis.
- Cards de clientes e apólices com barra superior baseada no status.
- Layout responsivo para celular, tablet e desktop.
- Loader personalizado para operações assíncronas.

---

## 11. Pré-requisitos

Antes de executar o frontend, instale:

- [Node.js](https://nodejs.org/) versão 18 ou superior.
- npm, instalado junto com o Node.js.
- Git, para clonar o repositório.
- Backend do ConectaLife em execução ou disponível no ambiente remoto.

Verifique as versões instaladas:

```bash
node -v
npm -v
git --version
```

---

## 12. Configuração e execução

### 12.1. Clone o repositório

```bash
git clone https://github.com/VidaConecta/ConectaLife_React.git
```

### 12.2. Entre na pasta do projeto

```bash
cd ConectaLife_React
```

### 12.3. Instale as dependências

```bash
npm install
```

### 12.4. Execute em ambiente de desenvolvimento

```bash
npm run dev
```

Após iniciar o Vite, abra no navegador o endereço exibido no terminal, normalmente:

```text
http://localhost:5173
```

### 12.5. Gere a build de produção

```bash
npm run build
```

### 12.6. Visualize a build localmente

```bash
npm run preview
```

---

## 13. Scripts disponíveis

| Comando           | Finalidade                                                |
| ----------------- | --------------------------------------------------------- |
| `npm install`     | Instala as dependências do projeto                        |
| `npm run dev`     | Inicia o servidor de desenvolvimento do Vite              |
| `npm run build`   | Gera a versão otimizada para produção                     |
| `npm run preview` | Executa localmente a build de produção                    |
| `npm run lint`    | Executa a verificação de qualidade configurada no projeto |

---

## 14. Fluxo de uso

1. Acesse a página inicial.
2. Use o botão **Introdução** para visualizar as etapas de utilização.
3. Cadastre um cliente com nome, data de nascimento, CPF e e-mail.
4. Aguarde a confirmação do cadastro.
5. Acesse a página **Apólices**.
6. Cadastre uma apólice e selecione um cliente já registrado.
7. Informe número, status, valor de cobertura e vigência.
8. Consulte, edite ou exclua os registros pelas listagens de clientes e apólices.
9. Acesse a página **Sobre** para conhecer a proposta do projeto e a equipe.

---

## 15. Equipe

O ConectaLife foi desenvolvido em equipe durante o Projeto Integrador.

A página **Sobre** da aplicação consulta a API pública do GitHub para apresentar os perfis dos integrantes em um carrossel responsivo.

| Integrante          | GitHub                                                       |
| ------------------- | ------------------------------------------------------------ |
| Everly              | [Dev-Everly](https://github.com/Dev-Everly)                  |
| Victor Pedro Gaspar | [victorpgms](https://github.com/victorpgms)                  |
| Joel Ramalho Filho  | [JoelRamalhoF](https://github.com/JoelRamalhoF)              |
| Sara Carlenis       | [SaraCarlenis](https://github.com/SaraCarlenis)              |
| Kauê Dota           | [Kauedota](https://github.com/Kauedota)                      |
| Vitória Albuquerque | [vitoriaalbuquerqueee](https://github.com/vitoriaalbuquerqueee) |

---

## 16. Repositórios relacionados

- Backend: [VidaConecta/ConectaLife](https://github.com/VidaConecta/ConectaLife)
- Frontend: [VidaConecta/ConectaLife_React](https://github.com/VidaConecta/ConectaLife_React)

---

## 17. Status do projeto

🚧 **Projeto em desenvolvimento.**

O README pode ser atualizado conforme a evolução da aplicação, da API, das telas, das regras de negócio, da autenticação e da infraestrutura de deploy.

---

<div align="center">
  Desenvolvido com React, TypeScript, Tailwind CSS e Spring Boot.
</div>
```
