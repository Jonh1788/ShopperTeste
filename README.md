# Teste Técnico - Atualização de Preços em Massa

Este projeto é uma ferramenta para atualização massiva de preços em uma loja de e-commerce, que permite que os usuários carreguem um arquivo CSV com os novos preços e apliquem validações e regras de negócio antes de realizar a atualização. O sistema consiste em um backend Node.js e um frontend React.js, com um banco de dados MySQL.

## Configuração

### Requisitos Prévios

Antes de começar, você deve ter o Node.js, o npm (Node Package Manager) e o MySQL instalados em sua máquina. Se você ainda não os possui, siga os seguintes passos:

#### Node.js e npm

- Faça o download e instale o Node.js no [site oficial](https://nodejs.org/).
- O npm é instalado automaticamente com o Node.js.

#### MySQL

- Faça o download e instale o MySQL na [página de downloads](https://dev.mysql.com/downloads/installer/).

### Setup do Banco de Dados

1. Execute o arquivo `database.sql` que acompanha este projeto para criar e preencher as tabelas do banco de dados. Você pode usar o comando:

   ```shell
   mysql -u SEU_USUARIO -p nome_do_seu_banco < database.sql
   ```
   
2. Substitua `SEU_USUARIO` pelo nome de usuário do MySQL.
3. Substitua `nome_do_seu_banco` pelo nome do banco de dados criado no MySQL.
4. Caso ainda não possua um banco de dados, pode fazer o seguinte:

   ```shell
   mysql -u SEU_USUARIO -p
   ```
5. Insira sua senha criada ao instalar o MySQL, e em seguida execute:

   ```shell
  CREATE DATABASE nome_do_banco;
   ```

7. Substitua nome_do_banco pelo que deseja, e em seguida volte ao passo 1.

### Configuração do Backend

1. Navegue até a pasta do backend:
 cd backend
2. Instale as dependências do backend:
   npm install
3. Configure as variáveis de ambiente criando um arquivo `.env` na pasta `backend` e defina as variáveis necessárias:
   DB_HOST=seu_host_do_mysql
   DB_USER=seu_usuario_do_mysql
   DB_PASSWORD=sua_senha_do_mysql
   DB_NAME=nome_do_banco_de_dados
4. Inicie o servidor do backend:
   npm start
   O servidor estará em execução na porta 3001 por padrão.


## Uso

1. Acesse o frontend em `http://localhost:3001` no seu navegador.

2. Carregue um arquivo CSV contendo os códigos de produto e os novos preços.

3. Clique no botão "VALIDAR" para verificar as regras de validação definidas.

4. Os resultados da validação serão exibidos na interface do usuário, indicando se as regras foram cumpridas ou quebradas.

5. Se todos os produtos estiverem validados e sem regras quebradas, o botão "ATUALIZAR" estará habilitado.

6. Clique no botão "ATUALIZAR" para salvar os novos preços no banco de dados.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.
