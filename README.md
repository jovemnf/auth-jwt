# auth-jwt

> An authentication module using JWT

## Install

```bash
npm install auth-jwt
```

Requires Node.js 8 or newer.

## Usage

### Verify a request token

```js
const authJwt = require("auth-jwt");

const requireAuth = async (req, res, next) => {
    try {
        req.user = await authJwt.verify(req, "secretKey");
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};

app.get("/user", requireAuth, (req, res) => {
    res.json(req.user);
});
```

### Include the token in requests

Send the token in the `Authorization` header using one of the supported schemes:

```http
Authorization: JWT JSON_WEB_TOKEN_STRING
```

or

```http
Authorization: Bearer JSON_WEB_TOKEN_STRING
```

### Get the token without decoding it

```js
const authJwt = require("auth-jwt");

const handler = async (req, res) => {
    try {
        const token = await authJwt.getToken(req);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
```

### Decode an existing token

```js
const authJwt = require("auth-jwt");

const handler = async (req, res) => {
    try {
        const payload = await authJwt.checkToken(req.token, "secretKey");
        res.json(payload);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
```

## API

### `verify(req, secret)`

- Extracts the token from `req.headers.authorization` or `req.headers.Authorization`
- Accepts only `JWT <token>` or `Bearer <token>`
- Stores the extracted token in `req.token`
- Resolves with the decoded payload

### `getToken(req)`

- Returns only the token string extracted from the authorization header

### `checkToken(token, secret)`

- Decodes a token that you already have available

## Errors

The package rejects the promise with an `Error` in the following cases:

- `Request headers are required`
- `Undefined authorization header`
- `Invalid authorization header`

## Tests

```bash
npm install
npm test
```

## License

The [MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Wallace Silva