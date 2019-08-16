# Tarefa1: Api RestFul

## Nome do projeto:
Tarefa1
## Descrição: 
Api Restful para criação de conta bancaria e movimentações.
## Installation:
Para instalação do projeto é necessário rodar o comando:
- npm install.
## Usage:
Para rodar o projeto usa-se o seguinte comando:
- node src/index.js
## Endpoints do postmam:
Collection Account.
https://www.getpostman.com/collections/8fc64049ca23182740ce

* POST que cria uma conta bancária:
http://localhost:3000/account/new
```
Body:

{
	"name": "Daniel",
	"cpf": "00281274088",
	"password": "12345"
}
```
* POST para login na conta.
http://localhost:3000/account/authenticate
```
Body:

{
	"cpf": "00281274088",
	"password": "12345"
}
```
Collection Transactions
https://www.getpostman.com/collections/314d76fcecf516a3cd6e

* POST para depósitos na conta bancária, necessita autenticação pelo token.
http://localhost:3000/transaction/new
```
Body:

{
    "type": "deposit",
    "amount": 5000
}

Headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTVlZGMxMzFjNjAyMjA0MDZmMTQ1MyIsImlhdCI6MTU2NTkxMjUxMywiZXhwIjoxNTY2MDg0NTEzfQ.NBCEAL0frMaDhZLl4YHEfYm0j1NFcgqsM7JsMBadaUU
```
* POST para saques na conta bancaria, necessita autenticação pelo token. 
http://localhost:3000/transaction/new
```
Body:

{
    "type": "withdraw",
    "amount": 3000
}

Headers

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTVlZGMxMzFjNjAyMjA0MDZmMTQ1MyIsImlhdCI6MTU2NTkxMjUxMywiZXhwIjoxNTY2MDg0NTEzfQ.NBCEAL0frMaDhZLl4YHEfYm0j1NFcgqsM7JsMBadaUU
```
* GET lista as transactions da conta.
http://localhost:3000/transaction/list
```
Headers

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTVlZGMxMzFjNjAyMjA0MDZmMTQ1MyIsImlhdCI6MTU2NTkxMjUxMywiZXhwIjoxNTY2MDg0NTEzfQ.NBCEAL0frMaDhZLl4YHEfYm0j1NFcgqsM7JsMBadaUU
```
## License:
MIT.
## Autor:
Daniel Orlandi.
