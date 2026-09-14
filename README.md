#  

<div align="center">
   <img src="https://ik.imagekit.io/5eywr3ioq/Imagens%20Projeto%20Integrador/ConectaTravel.png" title="ConectaLife" />
</div>

# ConectaTravel - Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://conectatravel-react-ten.vercel.app/)

</div>

## Descrição

O **ConectaTravel** é uma aplicação web de gerenciamento de seguros de viagem, criada para centralizar o cadastro e a administração de clientes e apólices de forma organizada, responsiva e intuitiva.

A plataforma permite que usuários autenticados cadastrem clientes, criem apólices de viagem, acompanhem informações de cobertura, consultem valores de prêmio e realizem operações de edição ou exclusão dos registros. O projeto utiliza uma identidade visual inspirada em viagens, tecnologia e segurança, com tons de azul e roxo, gradientes, transparências e animações.

A aplicação também conta com autenticação de usuários, gerenciamento de perfil, uma tela de introdução, uma página Sobre com carrossel da equipe integrado à API pública do GitHub, uma mala de viagem interativa no cadastro de usuários, um assistente virtual com respostas rápidas e um conjunto completo de recursos de acessibilidade, incluindo tradução em Libras.

**Deploy:** [conectatravel-react-ten.vercel.app](https://conectatravel-react-ten.vercel.app/)

---

## Funcionalidades

### Autenticação e usuários

- Login de usuários cadastrados.
- Cadastro de novos usuários.
- Logout da aplicação.
- Rotas protegidas para usuários autenticados.
- Armazenamento e controle do estado de autenticação com Context API.
- Página de perfil do usuário.
- Atualização de dados do perfil.
- Redirecionamento automático para a tela de login quando não há token de autenticação.

### Gestão de clientes

- Cadastro de novos clientes.
- Listagem de clientes cadastrados.
- Busca de cliente por identificador.
- Edição de dados de clientes.
- Exclusão de clientes com tela de confirmação.
- Exibição de clientes em cards responsivos.

### Gestão de apólices

- Cadastro de apólices de viagem.
- Listagem de apólices cadastradas.
- Busca de apólice por identificador.
- Edição de apólices.
- Exclusão de apólices com tela de confirmação.
- Associação de uma apólice a um cliente cadastrado.
- Associação de uma apólice a um usuário responsável.
- Seleção de múltiplas coberturas.
- Cálculo automático do valor do prêmio.
- Exibição do período, destino, cliente, responsável, status e valor da apólice.

### Acessibilidade

- Aumento e diminuição do tamanho da fonte em toda a aplicação.
- Restauração do tamanho padrão da fonte.
- Alternância de modo de alto contraste.
- Barra de acessibilidade compacta em telas menores, com painel expansível.
- Tradução em Libras por meio do plugin oficial VLibras (governo federal).
- Componentes com `aria-label`, `aria-pressed` e `role="toolbar"` para leitores de tela.

### Assistente virtual

- Central de ajuda flutuante disponível em todas as páginas.
- Respostas rápidas por tópicos pré-definidos (seguro viagem, cadastro de apólice, cadastro de cliente, edição de perfil, lentidão no carregamento).
- Redirecionamento direto para páginas internas a partir das respostas do assistente.
- Encaminhamento para atendimento humano via WhatsApp.
- Histórico da conversa com opção de reiniciar o atendimento.

### Experiência e apresentação

- Navbar fixa e responsiva.
- Menu adaptado para dispositivos móveis.
- Página inicial de apresentação.
- Página de introdução ao sistema.
- Carregadores animados com ícone de avião.
- Feedback visual para carregamento, erros e ações da aplicação.
- Design responsivo para celular, tablet e desktop.
- Página Sobre com carrossel da equipe.
- Consulta de perfis públicos dos integrantes pela API gratuita do GitHub.
- Mala de viagem interativa (SVG animado) na tela de cadastro.

---

## Telas da aplicação

| Tela              | Descrição                                                  |
| ----------------- | ---------------------------------------------------------- |
| Login             | Permite a autenticação de usuários cadastrados             |
| Cadastro          | Permite registrar novos usuários na plataforma             |
| Home              | Página inicial de apresentação do ConectaTravel            |
| Clientes          | Lista todos os clientes cadastrados                        |
| Cadastrar Cliente | Permite registrar um novo cliente                          |
| Editar Cliente    | Permite atualizar os dados de um cliente                   |
| Excluir Cliente   | Solicita confirmação antes de excluir um cliente           |
| Apólices          | Lista todas as apólices cadastradas                        |
| Cadastrar Apólice | Permite criar uma nova apólice de viagem                   |
| Editar Apólice    | Permite atualizar os dados de uma apólice                  |
| Excluir Apólice   | Solicita confirmação antes de excluir uma apólice          |
| Introdução        | Apresenta o fluxo recomendado de uso da plataforma         |
| Perfil            | Exibe os dados do usuário autenticado                      |
| Editar Perfil     | Permite atualizar os dados do usuário                      |
| Sobre             | Apresenta a proposta do projeto e os integrantes da equipe |

> Além das telas principais, a aplicação conta com uma central de ajuda (assistente virtual) e uma barra de acessibilidade, ambos disponíveis como componentes flutuantes em qualquer página.

---

## Rotas

| Rota                    | Componente        | Finalidade                      |
| ----------------------- | ----------------- | -------------------------------- |
| `/`                     | `Login`           | Tela de autenticação             |
| `/cadastro`             | `Cadastro`        | Cadastro de novos usuários       |
| `/home`                 | `Home`            | Página inicial                   |
| `/sair`                 | `Sair`            | Realiza o logout do usuário      |
| `/introducao`           | `Introducao`      | Guia de primeiros passos         |
| `/sobre`                | `Sobre`           | Informações do projeto e equipe  |
| `/perfil`               | `Perfil`          | Perfil do usuário autenticado    |
| `/perfil/editar`        | `AtualizarPerfil` | Atualização dos dados do perfil  |
| `/clientes`             | `ListarClientes`  | Listagem de clientes             |
| `/clientes/cadastrar`   | `FormCliente`     | Cadastro de cliente              |
| `/clientes/editar/:id`  | `FormCliente`     | Edição de cliente                |
| `/clientes/deletar/:id` | `DeletarCliente`  | Exclusão de cliente              |
| `/apolices`             | `ListarApolices`  | Listagem de apólices             |
| `/cadastrarapolice`     | `FormApolice`     | Cadastro de apólice              |
| `/editarapolice/:id`    | `FormApolice`     | Edição de apólice                |
| `/deletarapolice/:id`   | `DeletarApolice`  | Exclusão de apólice              |

> As rotas internas da aplicação são protegidas e exigem autenticação. Caso o usuário não possua token válido, é redirecionado para a página de login.

---

## Tecnologias utilizadas

| Categoria        | Tecnologia       | Utilização no projeto                                    |
| ---------------- | ---------------- | ---------------------------------------------------------- |
| Linguagem        | TypeScript       | Tipagem estática de componentes, estados e modelos        |
| Biblioteca       | React            | Construção da interface baseada em componentes            |
| Build tool       | Vite             | Ambiente de desenvolvimento e build de produção            |
| Estilização      | Tailwind CSS     | Layout, responsividade, gradientes e componentes visuais   |
| Rotas            | React Router DOM | Navegação e proteção de rotas                              |
| Requisições HTTP | Axios            | Consumo da API REST do backend                             |
| Estado global    | Context API      | Autenticação do usuário e preferências de acessibilidade   |
| Notificações     | React Toastify   | Feedback visual para ações e mensagens                     |
| Loaders          | React Spinners   | Indicadores de carregamento                                |
| Ícones           | Phosphor Icons   | Ícones utilizados na interface                             |
| API externa      | GitHub API       | Consulta de perfis públicos da equipe                      |
| Acessibilidade   | VLibras          | Tradução da interface para Libras (plugin oficial do governo) |
| Versionamento    | Git e GitHub     | Controle de versões e colaboração                          |
| Hospedagem       | Vercel           | Deploy do frontend                                         |

---

## Arquitetura

A aplicação é organizada por responsabilidade, separando páginas, componentes, serviços, modelos, contextos e funções utilitárias.

```text
src/
├── assets/
├── components/
│   ├── acessibilidade/
│   │   └── Acessibilidade.tsx
│   ├── apolices/
│   │   ├── cardapolices/
│   │   ├── deletarapolices/
│   │   ├── formapolice/
│   │   └── listapolices/
│   ├── chatbot/
│   │   ├── ChatbotWidget.tsx
│   │   └── topicos.ts
│   ├── clientes/
│   │   ├── cardclientes/
│   │   ├── deletarcliente/
│   │   ├── formcliente/
│   │   └── listaclientes/
│   ├── footer/
│   ├── malaViajante/
│   │   └── MalaViajante.tsx
│   ├── navbar/
│   └── vlibras/
│       └── VLibrasWidget.tsx
├── contexts/
│   ├── acessibilidade/
│   │   └── AcessibilidadeContext.tsx
│   └── AuthContext.tsx
├── models/
│   ├── Apolice.ts
│   ├── Cliente.ts
│   ├── Usuario.ts
│   └── UsuarioLogin.ts
├── pages/
│   ├── cadastro/
│   ├── home/
│   ├── introducao/
│   ├── login/
│   ├── perfil/
│   └── sobre/
├── services/
│   ├── Apolice.ts
│   ├── ClienteService.ts
│   ├── Service.ts
│   └── UsuarioService.ts
├── utils/
│   └── Premio.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

### Organização por responsabilidade

| Diretório    | Responsabilidade                                                       |
| ------------ | ------------------------------------------------------------------------ |
| `components` | Componentes reutilizáveis: clientes, apólices, navegação, rodapé, acessibilidade, chatbot e widget de Libras |
| `contexts`   | Estado global: autenticação do usuário e preferências de acessibilidade  |
| `models`     | Interfaces TypeScript que representam as entidades da aplicação          |
| `pages`      | Páginas principais, como login, cadastro, perfil e sobre                 |
| `services`   | Comunicação com a API REST                                               |
| `utils`      | Funções de apoio, incluindo cálculo de prêmio                            |
| `assets`     | Arquivos estáticos e imagens                                             |
| `App.tsx`    | Configuração de rotas, layout e proteção de acesso                       |
| `main.tsx`   | Ponto de entrada da aplicação React                                      |

---

## Modelos utilizados

### Cliente

```ts
export default interface Cliente {
  id?: number
  nome: string
  dataNascimento: string
  cpfCnpj: string
  email: string
  empresaTech: string
}
```

| Campo            | Tipo     | Descrição                                                |
| ---------------- | -------- | ---------------------------------------------------------- |
| `id`             | `number` | Identificador do cliente                                    |
| `nome`           | `string` | Nome completo do cliente                                    |
| `dataNascimento` | `string` | Data de nascimento                                           |
| `cpfCnpj`        | `string` | CPF ou CNPJ do cliente                                       |
| `email`          | `string` | E-mail de contato                                             |
| `empresaTech`    | `string` | Empresa de tecnologia ou instituição de ensino vinculada     |

### Apólice

```ts
export default interface Apolice {
  id?: number
  numeroApolice: string
  destino: string
  dataInicio: string
  dataFim: string
  valorPremio: number
  status: 'ATIVA' | 'CANCELADA' | 'SINISTRADA' | 'FINALIZADA'
  coberturas: string[]
  usuario: Usuario
  cliente: Cliente
}
```

| Campo           | Tipo       | Descrição                             |
| --------------- | ---------- | -------------------------------------- |
| `id`            | `number`   | Identificador da apólice               |
| `numeroApolice` | `string`   | Número identificador da apólice        |
| `destino`       | `string`   | Destino da viagem                      |
| `dataInicio`    | `string`   | Data inicial da vigência               |
| `dataFim`       | `string`   | Data final da vigência                 |
| `valorPremio`   | `number`   | Valor calculado do prêmio do seguro    |
| `status`        | `string`   | Situação atual da apólice              |
| `coberturas`    | `string[]` | Lista de coberturas selecionadas       |
| `usuario`       | `Usuario`  | Usuário responsável pela apólice       |
| `cliente`       | `Cliente`  | Cliente vinculado à apólice            |

### Usuário

```ts
export default interface Usuario {
  id?: number
  nome: string
  usuario: string
  senha: string
  cargo: string
}
```

### Login de usuário

```ts
export default interface UsuarioLogin {
  id?: number
  nome: string
  usuario: string
  senha: string
  token: string
}
```

---

## Coberturas disponíveis

Durante o cadastro de uma apólice, o usuário pode selecionar uma ou mais coberturas:

- Despesas médicas.
- Extravio de bagagem.
- Extravio de equipamentos tecnológicos.
- Telemedicina 24 horas.
- Assistência jurídica.
- Sala VIP.
- Internet aérea.

---

## Regras de negócio

### Cálculo do prêmio

O valor do prêmio é calculado automaticamente com base na quantidade de dias da viagem e no destino informado.

- Viagens nacionais: R$ 50,00 por dia.
- Viagens internacionais: R$ 60,00 por dia.
- O valor é recalculado ao alterar destino, data inicial ou data final.
- A data final deve ser igual ou posterior à data inicial.

### Status de apólice

| Status       | Descrição                            |
| ------------ | -------------------------------------- |
| `ATIVA`      | Apólice vigente e em funcionamento     |
| `CANCELADA`  | Apólice cancelada                      |
| `SINISTRADA` | Apólice associada a um sinistro        |
| `FINALIZADA` | Apólice encerrada                      |

---

## Acessibilidade

O ConectaTravel foi construído com preocupação de inclusão em múltiplas camadas, combinando ajustes visuais próprios da aplicação com um plugin oficial de tradução em Libras.

### Controles de fonte e contraste

- **Aumentar fonte**: incrementa o tamanho da letra em toda a aplicação.
- **Diminuir fonte**: reduz o tamanho da letra em toda a aplicação.
- **Restaurar padrão**: retorna o tamanho da fonte ao valor original.
- **Alto contraste**: alterna um modo de cores com maior contraste, útil para usuários com baixa visão.

O estado desses controles é gerenciado por um `AcessibilidadeContext`, disponível para toda a árvore de componentes via Context API. Em telas menores, os controles de fonte ficam agrupados em um botão único que abre um painel flutuante; o botão de alto contraste permanece sempre visível e acessível com um único clique.

### Tradução em Libras (VLibras)

A aplicação integra o **VLibras**, plugin oficial do governo federal brasileiro (`vlibras.gov.br`), que injeta um avatar 3D capaz de traduzir o conteúdo da página para Língua Brasileira de Sinais. O widget é carregado dinamicamente via script externo, sem impacto no tempo de carregamento inicial da aplicação.

### Boas práticas de leitura de tela

- Uso de `role="toolbar"` para agrupar controles relacionados.
- `aria-label` descritivo em botões sem texto visível.
- `aria-pressed` no botão de alto contraste, indicando seu estado atual como um toggle.
- `aria-expanded` e `aria-haspopup` nos botões que abrem painéis flutuantes.

---

## Assistente virtual

A aplicação conta com uma central de ajuda flutuante, disponível em qualquer página, representada por um piloto que atua como assistente virtual do ConectaTravel.

- O usuário pode escolher entre tópicos pré-definidos, como dúvidas sobre seguro viagem, cadastro de apólice, cadastro de cliente, edição de perfil e lentidão no carregamento da página.
- Cada resposta pode conter um link de redirecionamento direto para a página relacionada dentro da aplicação (por exemplo, a resposta sobre cadastro de apólice leva direto para a tela de cadastro).
- Um dos tópicos encaminha o usuário para atendimento humano via WhatsApp.
- O histórico da conversa é mantido durante a sessão e pode ser reiniciado a qualquer momento.
- Um convite de ajuda aparece automaticamente após alguns segundos de navegação, podendo ser fechado pelo usuário.

---

## Mala do Viajante

A tela de cadastro de usuários apresenta o componente `MalaViajante`, uma ilustração SVG interativa de uma mala de viagem com expressões visuais.

O componente reforça a identidade do ConectaTravel e inclui comportamentos interativos:

- As pupilas acompanham a posição do cursor na tela.
- A mala pode exibir olhos abertos ou fechados.
- A mala pode apresentar uma expressão triste, conforme o estado recebido pelo componente.
- A ilustração é utilizada como elemento visual lúdico durante a criação de uma nova conta.

---

## Página Sobre

A página **Sobre** apresenta a proposta do ConectaTravel e exibe os membros da equipe em um carrossel responsivo.

Os perfis são obtidos pela API pública e gratuita do GitHub, permitindo mostrar informações dos integrantes, como:

- Avatar do perfil.
- Nome.
- Nome de usuário no GitHub.
- Link direto para o perfil de cada membro.

---

## Integração com backend

O frontend consome uma API REST desenvolvida em Java com Spring Boot. A comunicação HTTP é centralizada na camada de serviços, utilizando Axios.

O backend possui recursos relacionados a:

- Usuários e autenticação.
- Clientes.
- Apólices.
- Segurança da aplicação.

**Repositório do backend:** [VidaConecta/ConectaTravel](https://github.com/VidaConecta/ConectaTravel)

---

## Pré-requisitos

Antes de executar o projeto localmente, instale:

- [Node.js](https://nodejs.org/) versão 18 ou superior.
- npm, instalado junto com o Node.js.
- Git.
- Backend do ConectaTravel disponível localmente ou em ambiente remoto.

Verifique as versões instaladas:

```bash
node -v
npm -v
git --version
```

---

## Configuração e execução

### Clone o repositório

```bash
git clone https://github.com/VidaConecta/conectatravel_react.git
```

### Entre na pasta do projeto

```bash
cd conectatravel_react
```

### Instale as dependências

```bash
npm install
```

### Execute em desenvolvimento

```bash
npm run dev
```

Após iniciar o Vite, acesse o endereço indicado no terminal, normalmente:

```text
http://localhost:5173
```

### Gere a build de produção

```bash
npm run build
```

### Visualize a build localmente

```bash
npm run preview
```

---

## Scripts disponíveis

| Comando           | Finalidade                                 |
| ----------------- | -------------------------------------------- |
| `npm install`     | Instala as dependências do projeto           |
| `npm run dev`     | Inicia o servidor de desenvolvimento          |
| `npm run build`   | Gera a build otimizada para produção          |
| `npm run preview` | Executa a build de produção localmente        |
| `npm run lint`    | Executa a análise de qualidade do código      |

---

## Repositórios e deploy

- **Frontend:** [VidaConecta/conectatravel_react](https://github.com/VidaConecta/conectatravel_react)
- **Backend:** [VidaConecta/ConectaTravel](https://github.com/VidaConecta/ConectaTravel)
- **Deploy:** [conectatravel-react-ten.vercel.app](https://conectatravel-react-ten.vercel.app/)

---

## Status do projeto

🚧 **Projeto em desenvolvimento.**

O README poderá ser atualizado conforme a evolução das funcionalidades, regras de negócio, autenticação, infraestrutura, testes e deploy.

---

<div align="center">
  Desenvolvido com React, TypeScript, Tailwind CSS e Spring Boot.
</div>
