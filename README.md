# auth-jwt

A módulo de autenticação via JWT

## Install

    npm install auth-jwt

## Usage

### Example


```js
const auth = require('auth-jwt');

var auth = (req, res, next) => {
    auth.verify(req, 'secretKey')
        .then((user)=>{
            req.user = user;
            next()
        })
        .catch((e)=>{
            res.sendStatus(401);
        })
}

app.get('/user', auth, (req, res) =>{
    ...
})
```

### Include the JWT in requests

Inclua o token criado pelo JWT no header das requisições

    authorization: JWT JSON_WEB_TOKEN_STRING.....

## Tests

    npm install
    npm test

## License

The [MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Wallace Silva