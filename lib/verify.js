const parse = require("./parser_header");
const jwt = require("jwt-simple");

const AUTH_HEADER = "authorization";

var verify = (req, secret) => {

    return new Promise((ok, fail) => {

        var token = null;

        try{

            if( req.headers[AUTH_HEADER]) {
                var auth_params = parse.parse(req.headers[AUTH_HEADER]);
                if (auth_params) {
                    token = auth_params.value;
                }
            }

            if (auth_params.scheme != 'JWT' || ! token ){
                fail(new Error("Invalid authorization header"));
            }

            ok(jwt.decode(token, secret));

        } catch (e) {
            fail(e);
        }

    });

}

module.exports = verify;