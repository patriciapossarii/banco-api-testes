# 🏦 banco-api-tests
## 🎯 Objetivo

Este projeto realiza testes automatizados na API REST do [banco-api](https://github.com/juliodelimas/banco-api), validando suas funcionalidades e contribuindo a qualidade de suas operações.

## 🛠️ Stack utilizada

- **Linguagem:** JavaScript (Node.js)
- **Framework de testes:** [Mocha](https://mochajs.org/)
- **Biblioteca de requisições HTTP:** [Supertest](https://github.com/ladjs/supertest)
- **Biblioteca de asserções:** [Chai](https://www.chaijs.com/)
- **Relatórios de testes:** [Mochawesome](https://github.com/adamgruber/mochawesome)
- **Gerenciamento de variáveis de ambiente:** [dotenv](https://github.com/motdotla/dotenv)

## 📁 Estrutura de diretórios

```
banco-api-tests/
├── test/               # Testes organizados por funcionalidades
│   ├── login.test.js
│   └── transferencias.test.js
├── mochawesome-report/ # Diretório gerado automaticamente com o relatório HTML dos testes
├── .env                # Arquivo para configuração da variável BASE_URL
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Formato do arquivo `.env`

Antes de rodar os testes, crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo:

```
BASE_URL=http://localhost:3000
```

Substitua `http://localhost:3000` pela URL onde a API `banco-api` está rodando.

## 🚀 Comandos para execução

Instale as dependências:

```bash
npm install
```

Execute todos os testes:

```bash
npm test
```

Geração automática do relatório HTML:

- Após executar `npm test`, o relatório será gerado dentro da pasta `mochawesome-report/`.

💡Sugestão: para executar os testes e abrir o relatório HTML automaticamente, adicione um script no `package.json`:

```json
"scripts": {
  "test:report": "npm test && open mochawesome-report/mochawesome.html"
}
```

(Em Windows, substitua `open` por `start`.)

## 📚 Dependências utilizadas e suas documentações

- [Mocha](https://mochajs.org/) - Framework de execução de testes
- [Supertest](https://github.com/ladjs/supertest) - Biblioteca para chamadas HTTP
- [Chai](https://www.chaijs.com/) - Biblioteca de asserções
- [Mochawesome](https://github.com/adamgruber/mochawesome) - Geração de relatórios em HTML
- [dotenv](https://github.com/motdotla/dotenv) - Gerenciamento de variáveis de ambiente
