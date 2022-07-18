# API Pet Finder Brasil

> ### Projeto criado em julho de 2022 na escola de programação Kenzie Academy Brasil.
----------
## Autenticação

Essa aplicação utiliza JSON Web Token (JWT) para lidar com a autenticação. O token é passado com cada solicitação usando o cabeçalho `Authorization` com esquema `Token`. O middleware de autenticação JWT trata da validação e autenticação do token. Verifique as seguintes fontes para saber mais sobre o [JWT](https://www.npmjs.com/package/jsonwebtoken).

----------
> ### Deploy https://api-capstone-petfinder.herokuapp.com/
----------

### Todas as rotas do usuário:
    POST /users/login
    POST /users
    GET /users
    GET /users/animals/:id
    PATCH /users/:id
    DELETE /users/:id
### Todas as rotas dos animais:
    POST /animals
    PATCH /animals/:id
    DELETE /animals/:id
    GET /animals
    GET /animals/lost
    GET /animals/found
### Todas as rotas dos comentarios:
    POST /comments
    GET /comments/animals/:id
## Exemplo de rotas:
```
POST /users

Enviado:
{
	"name": "exemplo",
	"email": "exemplo@gmail.com",
	"password": "exemplo123",
	"contact": "8199999999"
}

Recebido:
{
	"name": "exemplo",
	"email": "exemplo@gmail.com",
	"contact": "8199999999",
	"created_at": "2022-07-17T17:01:55.934Z",
	"updated_at": "2022-07-17T17:01:55.934Z",
	"id": "6c700f31-1c1c-4370-9b40-14ad3d9cd927"
}
```
```
POST /users/login

Enviado:
{
	"email": "exemplo@gmail.com",
	"password": "exemplo123"
}

Recebido: 
{
    "token": (token do usuario)
}
```
```
PATCH /users/:id
authentication: token do usuario
params: id do usuario

Enviado:
{
	"name": "Jorge"
}

Recebido: 
{
	"name": "Jorge",
	"email": "exemplo@gmail.com",
	"contact": "8199999999",
	"created_at": "2022-07-17T17:01:55.934Z",
	"updated_at": "2022-07-17T17:02:10.934Z",
	"id": "6c700f31-1c1c-4370-9b40-14ad3d9cd927"
}
```
```
DELETE /users/:id
authentication: token do usuario

Recebido: 
{
	"message": "User deleted"
}
```
```
POST /animals

Enviado:
{
	"name": "exemplo",
	"breed": "exemplo",
	"species": "exemplo",
	"description": "exemplo",
	"image": "https://exemplo.com",
	"lastLocation": "exemplo",
	"lastDate": "01/01/2001",
	"found": false,
	"userId": "(id do usuario)"
}

Recebido: 
{
	"name": "exemplo",
	"breed": "exemplo",
	"species": "exemplo",
	"description": "exemplo",
	"image": "https://exemplo.com",
	"lastLocation": "exemplo",
	"lastDate": "01/01/2001",
	"found": false,
	"created_at": "2022-07-18T16:30:44.726Z",
	"updated_at": "2022-07-18T16:30:44.726Z",
	"id": "ca97c129-82c8-44bb-af02-88b3b8bedad8"
	"userId": "(id usuario)",
}
```

    
