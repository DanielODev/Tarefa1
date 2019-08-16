# Tarefa1 => Api RestFul
Nome do projeto: Tarefa1

Descrição: Api Restful para criação de conta bancaria e movimentações.

Installation:Para instalação do projeto é necessário rodar os comandos:
- npm install

Usage: Para rodar o projeto usa-se o seguinte comando:
  - node src/index.js
Incluir os endpoints do postmam

* POST que cria uma conta bancária:
http://localhost:3000/account/new
- Body
{
	"name": "Daniel",
	"cpf": "00281274088",
	"password": "12345"
}

* post login


* POST que cria depositos na conta bancária registrada pelo token.
- Body
{
    "type": "deposit",
    "amount": 5000
}
- Headers
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTVlZGMxMzFjNjAyMjA0MDZmMTQ1MyIsImlhdCI6MTU2NTkxMjUxMywiZXhwIjoxNTY2MDg0NTEzfQ.NBCEAL0frMaDhZLl4YHEfYm0j1NFcgqsM7JsMBadaUU






Account
https://www.getpostman.com/collections/8fc64049ca23182740ce

Transaction
https://www.getpostman.com/collections/314d76fcecf516a3cd6e


License: MIT.

Autor: Daniel Orlandi.
