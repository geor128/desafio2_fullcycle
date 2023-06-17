const mysql = require('mysql');
const express = require('express');

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'db', // Nome do serviço do contêiner MySQL definido no Docker Compose
  user: 'root',
  password: 'root',
  database: 'dbnode'
});

// Conectar ao banco de dados
connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

function criarTabelaPeople() {
  const query = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL
    )
  `;

  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log('Tabela "people" criada ou já existente');
  });
}

criarTabelaPeople();

function cadastrarNome(nome) {
  const query = `INSERT INTO people (nome) VALUES ('${nome}')`;

  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log('Nome cadastrado com sucesso!');
  });
}



app.get('/', function (req, res) {
  const nome = 'George'; // Nome que você deseja cadastrar na tabela
  cadastrarNome(nome);
  // Consultar a tabela 'people' e retornar a lista de nomes
  connection.query('SELECT nome FROM people', function (error, results, fields) {
    if (error) throw error;

    const names = results.map(result => result.nome);

    // Retornar a resposta com a lista de nomes
    res.send(`<h1>Full Cycle Rocks!</h1>\n\n<ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
